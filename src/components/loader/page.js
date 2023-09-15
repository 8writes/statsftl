
import styles from "./page.module.css"; // Import CSS styles

// Define the Loader component
export default function Loader() {

  return (
    // Container for the loader
    <div className={styles.loaderWrapper}>
      {/* Loader body */}
      <div className={styles.loaderWrapper__body}>
        <div className={styles.loaderWrapper__body__content}>
          {/* Loading text with a loading animation */}
          Loading<span className={styles.loadingAnimation}>...</span>🤖
        </div>{" "}
      </div>
    </div>
  );
}
