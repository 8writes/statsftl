import { useState } from "react";
import styles from "./page.module.css";
import Fixtures from "@/app/(search data)/(fixture section)/_fixture/page";

export default function SubmitButton({ inputResultId1, inputResultId2 }) {
  const [teamId1, setTeamId1] = useState("");
  const [teamId2, setTeamId2] = useState("");

  // State to hold error message
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    // Check if both resultId1 and resultId2 are available
    if (inputResultId1 && inputResultId2) {
      // Set the result IDs in component state
      setTeamId1(inputResultId1);
      setTeamId2(inputResultId2);
      setErrorMessage(""); // Clear any previous error messages
    } else if (!inputResultId1 && !inputResultId2) {
      // Clear both result IDs if they are not available
      setTeamId1("");
      setTeamId2("");
      setErrorMessage("Oops...<br/> Please select both teams 🤖");
    } else if (!inputResultId1) {
      // Clear resultId1 if it is not available
      setTeamId1("");
      setErrorMessage("Oops...<br/> Please select the first team 🤖");
    } else if (!inputResultId2) {
      // Clear resultId2 if it is not available
      setTeamId2("");
      setErrorMessage("Oops...<br/> Please select the second team 🤖");
    }
  };

  return (
    <>
      <div className={styles.submitButton__content}>
        <div>
          <button className={styles.submitButton} onClick={handleClick}>
            Compare Teams
          </button>{" "}
        </div>
        <div>
          {/* Display error message when it is set */}
          {errorMessage && (
            <p
              className={styles.errorWrapper}
              dangerouslySetInnerHTML={{
                __html: errorMessage,
              }}
            />
          )}
          {/* Display a message if there are no errors and no result IDs selected */}
          {!errorMessage && !teamId1 && !teamId2 && (
            <p className={styles.errorWrapper}>
              Statistics will be displayed here 🤖
            </p>
          )}
        </div>
      </div>
      {/* pass data if no errors */}
      {teamId1 && teamId2 && !errorMessage && (
        <Fixtures teamId1={teamId1} teamId2={teamId2} />
      )}{" "}
      
    </>
  );
}
