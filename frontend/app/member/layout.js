"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function MemberLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <Link href="/member/workspace" className={styles.brand}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            Task Manager
          </Link>
          <nav className={styles.nav}>
            <Link 
              href="/member/workspace" 
              className={`${styles.navItem} ${pathname === "/member/workspace" ? styles.active : ""}`}
            >
              My Workspace
            </Link>
          </nav>
        </div>
        
        <div className={styles.userProfile}>
          <Link href="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>Member User</span>
            <div className={styles.avatar}>M</div>
          </Link>
        </div>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
