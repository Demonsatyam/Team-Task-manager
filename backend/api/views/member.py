from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from api.models.project import Project
from api.models.task import Task
from api.models.membership import Membership
from api.serializers import ProjectSerializer, TaskSerializer
from api.permissions import IsProjectMember

# --- MEMBER VIEWS ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_my_projects(request):
    """List all projects the user is a member of"""
    memberships = Membership.objects.filter(user=request.user)
    projects = [m.project for m in memberships]
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsProjectMember])
def list_project_tasks(request, project_id):
    """List all tasks in a project (must be member)"""
    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    self_check = IsProjectMember()
    if not self_check.has_object_permission(request, None, project):
        return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

    tasks = Task.objects.filter(project=project)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task_status(request, task_id):
    """Update task status - only assigned user or project admin can do this"""
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check permission
    is_assigned = (task.assigned_to == request.user)
    is_admin = Membership.objects.filter(user=request.user, project=task.project, role='Admin').exists()
    is_global_admin = request.user.is_staff or request.user.is_superuser

    if not (is_assigned or is_admin or is_global_admin):
        return Response({'error': 'Not authorized to update this task'}, status=status.HTTP_403_FORBIDDEN)

    new_status = request.data.get('status')
    if new_status not in ['To Do', 'In Progress', 'Done']:
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

    task.status = new_status
    task.save()
    return Response(TaskSerializer(task).data)

# --- DASHBOARD VIEWS ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    """Get dashboard stats for the logged-in user"""
    my_tasks = Task.objects.filter(assigned_to=request.user)
    
    total_assigned = my_tasks.count()
    status_counts = {
        'To Do': my_tasks.filter(status='To Do').count(),
        'In Progress': my_tasks.filter(status='In Progress').count(),
        'Done': my_tasks.filter(status='Done').count()
    }
    
    # Overdue tasks (due date is in the past and not Done)
    now = timezone.now()
    overdue_tasks = my_tasks.filter(due_date__lt=now).exclude(status='Done').count()

    # My projects count
    my_projects = Membership.objects.filter(user=request.user).count()

    return Response({
        'projects_count': my_projects,
        'tasks': {
            'total_assigned': total_assigned,
            'overdue': overdue_tasks,
            'status_breakdown': status_counts
        }
    })
