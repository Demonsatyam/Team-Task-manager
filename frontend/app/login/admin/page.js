"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.authCard} ${styles.adminTheme}`}>
        <div className={styles.toggleContainer}>
          <Link
            href="/login"
            className={styles.toggleBtn}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Member Login
          </Link>
          <button
            className={`${styles.toggleBtn} ${styles.active}`}
          >
            Admin Portal
          </button>
        </div>

        <div className={styles.header}>
          <div className={styles.secureBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Secure Management Console
          </div>
          <h1 className={styles.title}>Administrator Login</h1>
          <p className={styles.subtitle}>Access the system management portal</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className="label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              placeholder="admin@company.com" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className="label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="input-field" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Sign In as Admin
          </button>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <button type="button" className="btn-secondary">
            Single Sign-On (SSO)
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an admin account? <Link href="/register/admin" className={styles.link}>Register here</Link>
        </div>
      </div>
    </div>
  );
}
