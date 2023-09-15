import styles from "./page.module.css";
export default function Footer() {
  return (
    <>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__container}>
          {" "}
          <div className={styles.footerLink}>
          <h5>About</h5>/<h5>Twitter</h5>
          </div>
          <div className={styles.footer}>
            <h6>COPYRIGHT © 2023 STATSFTL</h6>
          </div>
        </div>
      </div>
    </>
  );
}
