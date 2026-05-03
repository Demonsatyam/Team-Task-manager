"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";

// Mock data for Active Task Inventory
const mockTasks = [
  { id: "TSK-001", title: "Update Login Page UI", assignee: "alice@company.com", status: "In Progress", dueDate: "2026-05-10", avatar: "A" },
  { id: "TSK-002", title: "Database Migration", assignee: "bob@company.com", status: "To Do", dueDate: "2026-05-15", avatar: "B" },
  { id: "TSK-003", title: "Fix Authentication Bug", assignee: "charlie@company.com", status: "Done", dueDate: "2026-05-01", avatar: "C" },
  { id: "TSK-004", title: "Design System Implementation", assignee: "alice@company.com", status: "In Progress", dueDate: "2026-05-12", avatar: "A" },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = mockTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case "Done": return <span className="badge badge-done">Done</span>;
      case "In Progress": return <span className="badge badge-progress">In Progress</span>;
      default: return <span className="badge badge-todo">To Do</span>;
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Task Control Center</h1>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Left: New Task Creation Form */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Create New Task</h2>
          <form>
            <div className={styles.formGroup}>
              <label className="label" htmlFor="title">Task Title</label>
              <input type="text" id="title" className="input-field" placeholder="E.g., Implement payment gateway" required />
            </div>
            
            <div className={styles.formGroup}>
              <label className="label" htmlFor="description">Description</label>
              <textarea id="description" className="input-field" rows="3" placeholder="Provide details about the task..." required></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className="label" htmlFor="status">Initial Status</label>
              <select id="status" className="input-field">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className="label" htmlFor="dueDate">Due Date</label>
              <input type="date" id="dueDate" className="input-field" required />
            </div>

            <div className={styles.formGroup}>
              <label className="label" htmlFor="assignee">Assignee (Email)</label>
              <input type="email" id="assignee" className="input-field" placeholder="member@company.com" required />
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>Create Task</button>
          </form>
        </div>

        {/* Right: Active Task Inventory */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.cardTitle} style={{ border: 'none', margin: 0, padding: 0 }}>Active Task Inventory</h2>
            <div className={styles.searchBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Search tasks, assignees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task Title</th>
                  <th>Assignee</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ fontWeight: 500, color: 'var(--color-blue-700)' }}>{task.id}</td>
                    <td>{task.title}</td>
                    <td>
                      <div className={styles.assigneeCell}>
                        <div className={styles.assigneeAvatar}>{task.avatar}</div>
                        <span>{task.assignee}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(task.status)}</td>
                    <td>{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
