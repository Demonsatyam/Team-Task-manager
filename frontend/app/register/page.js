"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./register.module.css";

export default function MemberRegisterPage() {
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Here we would typically call the backend API:
    // Member: POST /api/auth/register/
    
    // For now, redirect to login page after successful registration
    alert(`Successfully registered as Member!`);
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.toggleContainer}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${styles.active}`}
          >
            Member Registration
          </button>
          <Link
            href="/register/admin"
            className={styles.toggleBtn}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Admin Registration
          </Link>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>Sign up to start tracking your tasks</p>
        </div>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.nameGroup}>
            <div className={styles.formGroup}>
              <label className="label" htmlFor="first_name">First Name</label>
              <input 
                type="text" 
                id="first_name" 
                className="input-field" 
                placeholder="John" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label" htmlFor="last_name">Last Name</label>
              <input 
                type="text" 
                id="last_name" 
                className="input-field" 
                placeholder="Doe" 
                required 
              />
            </div>
          </div>

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
              minLength={8}
            />
          </div>

          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Register as Member
          </button>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <button type="button" className="btn-secondary">
            Single Sign-On (SSO)
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.link}>Login here</Link>
        </div>
      </div>
    </div>
  );
}
