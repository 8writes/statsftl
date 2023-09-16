import Link from "next/link";
import styles from "./page.module.css";
export default function Header() {
  return (
    <>
      <div className={styles.header__wrapper}>
        <div className={styles.header}>
          <h2>ZTATS</h2>
        </div>
        <div>
          <Link href="https://appztats.brimble.app/signup" target="_blank">Signup</Link> /<Link href="https://appztats.brimble.app/login" target="_blank">Login</Link>
        </div>
      </div>
    </>
  );
}
