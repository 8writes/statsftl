"use client";
import StatsPage from "@/components/stats/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <StatsPage/>
    </main>
  );
}
