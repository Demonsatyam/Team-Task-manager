"use client";

import styles from "./team.module.css";

// Mock Data
const currentMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "Active", avatar: "A" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Member", status: "Active", avatar: "B" },
  { id: 3, name: "Charlie Davis", email: "charlie@company.com", role: "Member", status: "Offline", avatar: "C" },
];

export default function TeamManagement() {
  const capacity = { used: 14, total: 20 };
  const percentage = (capacity.used / capacity.total) * 100;

  return (
    <div className={styles.teamLayout}>
      <div className={styles.topSection}>
        {/* Top/Left: Add Team Member Form */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Add Team Member</h2>
          <form className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className="label" htmlFor="email">Email Address</label>
              <input type="email" id="email" className="input-field" placeholder="new.member@company.com" required />
            </div>
            <div className={styles.formGroup}>
              <label className="label" htmlFor="role">Role</label>
              <select id="role" className="input-field">
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className="btn-primary" style={{ padding: '0.625rem 1.25rem', height: '42px' }}>
                Add Member
              </button>
            </div>
          </form>
        </div>

        {/* Top/Right: Team Overview Summary */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryTitle}>Team Capacity Overview</div>
          <div className={styles.summaryStats}>
            <span className={styles.statNumber}>{capacity.used}</span>
            <span className={styles.statTotal}>/ {capacity.total} Seats Used</span>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main: Current Members Table */}
      <div className={styles.tableCard}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className={styles.cardTitle} style={{ border: 'none', margin: 0, padding: 0 }}>Current Members</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className={styles.memberCell}>
                      <div className={styles.memberAvatar}>{member.avatar}</div>
                      <div className={styles.memberInfo}>
                        <span className={styles.memberName}>{member.name}</span>
                        <span className={styles.memberEmail}>{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.roleBadge} ${member.role === 'Admin' ? styles.roleAdmin : styles.roleMember}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.375rem',
                      color: member.status === 'Active' ? 'var(--color-success)' : 'var(--text-muted)'
                    }}>
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: member.status === 'Active' ? 'var(--color-success)' : 'var(--text-muted)'
                      }}></span>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
