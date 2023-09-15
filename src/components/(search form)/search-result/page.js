import styles from "./page.module.css";
export default function Results({ result, onResultClick }) {
  return (
    <>
     
        <div
          className={styles.result}
          onClick={() => {
            onResultClick(result);
          }}
        >
          <img src={result.team.logo} alt="Away Team Logo" />{" "}
          <h3>{result.team.name}</h3>
        </div>
    </>
  );
}
