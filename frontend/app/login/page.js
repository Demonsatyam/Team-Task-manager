"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function MemberLoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/member/workspace");
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleBtn} ${styles.active}`}
          >
            Member Login
          </button>
          <Link
            href="/login/admin"
            className={styles.toggleBtn}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Admin Portal
          </Link>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to access your tasks and projects</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className="label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              placeholder="name@company.com" 
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
            Sign In as Member
          </button>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <button type="button" className="btn-secondary">
            Single Sign-On (SSO)
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an account? <Link href="/register" className={styles.link}>Register here</Link>
        </div>
      </div>
    </div>
  );
}
