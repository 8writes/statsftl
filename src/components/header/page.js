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
          <Link href="" target="_blank">Signup</Link> /<Link href="" target="_blank">Login</Link>
        </div>
      </div>
    </>
  );
}
