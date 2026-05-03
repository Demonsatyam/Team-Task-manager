"use client";

import Link from "next/link";
import styles from "./workspace.module.css";

// Mock Data
const activeProjects = [
  { id: "PRJ-01", name: "Website Redesign", tasks: 12, completed: 8 },
  { id: "PRJ-02", name: "Mobile App V2", tasks: 5, completed: 1 },
  { id: "PRJ-03", name: "Marketing Campaign", tasks: 8, completed: 6 },
];

const assignedTasks = [
  { id: "TSK-001", title: "Update Homepage Hero", project: "Website Redesign", status: "To Do", dueDate: "Today" },
  { id: "TSK-004", title: "Design System Tokens", project: "Website Redesign", status: "In Progress", dueDate: "Tomorrow" },
  { id: "TSK-009", title: "App Store Screenshots", project: "Mobile App V2", status: "To Do", dueDate: "Next Week" },
];

export default function MemberWorkspace() {
  const handleStatusChange = (e, taskId) => {
    e.preventDefault();
    // In a real app, update task status
  };

  return (
    <div>
      <div className={styles.hero}>
        <h1 className={styles.welcomeText}>Welcome back, Member!</h1>
        <p className={styles.dateText}>Here's what's happening with your tasks today.</p>
      </div>

      <div className={styles.workspaceGrid}>
        {/* Left Column: Projects & Tasks */}
        <div>
          <section>
            <h2 className={styles.sectionTitle}>Active Projects</h2>
            <div className={styles.projectsGrid}>
              {activeProjects.map(project => (
                <Link href="#" key={project.id} className={styles.projectCard}>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <span className="badge badge-progress" style={{ fontSize: '0.7rem' }}>
                      {Math.round((project.completed / project.tasks) * 100)}%
                    </span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <div className={styles.projectMeta}>
                    {project.completed} / {project.tasks} Tasks Completed
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Assigned to Me</h2>
            <div className={styles.taskList}>
              {assignedTasks.map(task => (
                <Link href={`/member/task/${task.id}`} key={task.id} className={styles.taskItem}>
                  <div className={styles.taskInfo}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <div className={styles.taskProject}>{task.project} • Due {task.dueDate}</div>
                  </div>
                  <div className={styles.taskActions}>
                    <select 
                      className={styles.statusSelect}
                      defaultValue={task.status}
                      onClick={(e) => e.preventDefault()}
                      onChange={(e) => handleStatusChange(e, task.id)}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Summary Widget */}
        <div>
          <div className={styles.summaryWidget}>
            <h2 className={styles.widgetTitle}>Weekly Summary</h2>
            
            <div className={styles.progressCircle}>
              <div style={{ textAlign: 'center' }}>
                <div className={styles.circleValue}>65%</div>
                <div className={styles.circleLabel}>Tasks Completed</div>
              </div>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>Total Assigned</span>
              <span className={styles.statValue}>24</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Completed</span>
              <span className={styles.statValue}>15</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>In Progress</span>
              <span className={styles.statValue}>4</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>To Do</span>
              <span className={styles.statValue}>5</span>
            </div>
            
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', backgroundColor: 'var(--color-blue-600)' }}>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
