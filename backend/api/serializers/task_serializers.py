from rest_framework import serializers
from api.models.task import Task
from .user_serializers import UserSerializer

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_email = serializers.ReadOnlyField(source='assigned_to.email')

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'project', 'assigned_to', 'assigned_to_email', 'due_date', 'created_at')
        read_only_fields = ('project', 'assigned_to')
