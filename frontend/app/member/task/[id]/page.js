"use client";

import { use, useState } from "react";
import styles from "./task.module.css";
import Link from "next/link";

export default function TaskDetail({ params }) {
  // In Next 15 App router, params is a promise
  const resolvedParams = use(params);
  const taskId = resolvedParams.id;

  const [status, setStatus] = useState("In Progress");

  // Mock Task Data
  const task = {
    id: taskId || "TSK-004",
    title: "Design System Tokens",
    description: "We need to extract all the hardcoded hex values from the legacy CSS files and map them to our new Slate and Action Blue design system variables.\n\nPlease make sure to update both the components and the global styles to use the new CSS custom properties.",
    dueDate: "2026-05-12",
    priority: "High",
    estTime: "4 Hours",
    assignee: "Member User",
  };

  const activityTimeline = [
    { id: 1, user: "Admin User", action: "changed status from To Do to In Progress", time: "2 hours ago", type: "status" },
    { id: 2, user: "Admin User", action: "commented: 'Please prioritize the button components first.'", time: "3 hours ago", type: "comment" },
    { id: 3, user: "Admin User", action: "assigned this task to you", time: "1 day ago", type: "assignment" },
  ];

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/member/workspace" style={{ color: 'var(--color-blue-600)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
          &larr; Back to Workspace
        </Link>
      </div>

      <div className={styles.taskHeader}>
        <div className={styles.titleArea}>
          <span className={styles.taskId}>{task.id}</span>
          <h1 className={styles.taskTitle}>{task.title}</h1>
        </div>
        <div>
          <select 
            className={styles.statusDropdown}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ 
              backgroundColor: status === 'Done' ? '#ecfdf5' : status === 'In Progress' ? 'var(--color-blue-50)' : 'white',
              color: status === 'Done' ? 'var(--color-success)' : status === 'In Progress' ? 'var(--color-blue-700)' : 'var(--text-primary)',
              borderColor: status === 'Done' ? 'var(--color-success)' : status === 'In Progress' ? 'var(--color-blue-300)' : 'var(--border-color)'
            }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Main Content Area */}
        <div>
          <div className={styles.descriptionCard}>
            <h2 className={styles.cardTitle}>Task Description</h2>
            <div className={styles.descriptionText}>
              {task.description}
            </div>
          </div>

          <div className={styles.timeline}>
            <h2 className={styles.cardTitle}>Activity Timeline</h2>
            <div className={styles.timelineList}>
              {activityTimeline.map(item => (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ 
                    backgroundColor: item.type === 'comment' ? 'var(--color-warning)' : item.type === 'status' ? 'var(--color-blue-500)' : 'var(--color-success)' 
                  }}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineUser}>{item.user}</span>
                      <span className={styles.timelineTime}>{item.time}</span>
                    </div>
                    <div className={styles.timelineText}>{item.action}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <input type="text" className="input-field" placeholder="Add a comment..." />
              <button className="btn-primary">Post</button>
            </div>
          </div>
        </div>

        {/* Sidebar: Meta Details */}
        <div className={styles.metaSidebar}>
          <div className={styles.metaCard}>
            <h2 className={styles.cardTitle}>Meta Details</h2>
            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Due Date</span>
                <span className={styles.metaValue}>{task.dueDate}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Priority</span>
                <span className={styles.metaValue}>
                  <span className={`badge badge-progress`} style={{ backgroundColor: '#fee2e2', color: 'var(--color-danger)' }}>{task.priority}</span>
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Est. Time</span>
                <span className={styles.metaValue}>{task.estTime}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Assignee</span>
                <span className={styles.metaValue} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 600 }}>M</div>
                  {task.assignee}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
