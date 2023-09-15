import { useState, useEffect } from "react";
import styles from "./page.module.css";
import SubmitButton from "../submit-button/page";
import Results from "../search-result/page";

export default function SearchBar() {
  const [input1, setInput1] = useState(""); // holds filtering input
  const [input2, setInput2] = useState(""); // holds filtering input
  const [storedData, setStoredData] = useState([]); // stored data fetched from api in array format
  const [results1, setResults1] = useState([]); // holds filtered results in array
  const [results2, setResults2] = useState([]); // holds filtered results in array
  const [inputResult1, setInputResult1] = useState(""); //  holds displayed results (in this case .name)
  const [inputResult2, setInputResult2] = useState(""); // holds displayed results
  const [inputResultId1, setInputResultId1] = useState(""); // holds selected result Id and passes to button (destination is api url but we need to do some validation in button)
  const [inputResultId2, setInputResultId2] = useState(""); // holds selected result Id and passes to button
  const [hasFetchedData, setHasFetchedData] = useState(false); // flag data has been fetched
  // fetch data on component mount once and pass to storedData ^_^
  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            "https://v3.football.api-sports.io/teams?league=39&season=2023",
            {
              headers: {
                "X-RapidAPI-Key": "d1ed515a838a8284f71cf976771ea33f",
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
              },
            }
          );
          const data = await res.json();
          const destructuredData = data.response;

          setStoredData({ response: destructuredData });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      setHasFetchedData(true);
    }
  }, [hasFetchedData]);
  // ends --------------------------------

  // filters data from storedData instead of fetching from api ^_^
  const filterResults = (value, setResultsFunc) => {
    const results = storedData.response.filter((team) => {
      return (
        value &&
        team.team &&
        team.team.name &&
        team.team.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResultsFunc(results);
  };
  // ends ----------------------------------------------------------------

  // handle individual input and pass  to results array to be displayed ^_^
  const handleChange1 = (value) => {
    setInput1(value);
    filterResults(value, setResults1);
  };

  const handleChange2 = (value) => {
    setInput2(value);
    filterResults(value, setResults2);
  };
  // ends ----------------------------------------------------------------

  // fetch selected result to display && remove fetched results and input field = true :)
  const handleResultClick1 = (result) => {
    setInputResult1(result);
    setResults1([]);
    setInput1("");
  };

  const handleResultClick2 = (result) => {
    setInputResult2(result);
    setInput2("");
    setResults2([]);
  };
  // ends ----------------------------------------------------------------

  // fetch input Id from results (runs when a result is clicked) ^_^
  const handleResultClickId1 = (result) => {
    setInputResultId1(result);
  };

  const handleResultClickId2 = (result) => {
    setInputResultId2(result);
  };
  // end ----------------------------------------------------------------

  // clear input fields
  const handleClearInput1 = () => {
    setInputResult1("");
    setInputResultId1("");
  };

  const handleClearInput2 = () => {
    setInputResult2("");
    setInputResultId2("");
  };
  // ends ----------------------------------------------------------------

  return (
    <>
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.input__wrapper}>
            <div className={styles.inputDisplay__wrapper}>
              <div className={styles.teamName}>
                <h3>Team 1</h3>
              </div>
              <div className={styles.inputDisplay}>
                <h3>{inputResult1}</h3>{" "}
                {inputResult1 && (
                  <button
                    onClick={() =>
                      handleClearInput1(setInputResult1, setInputResultId1)
                    }
                  >
                    {" "}
                    {/** clear the input field and display field ^_^ */}✖
                  </button>
                )}
              </div>
              {/** input display ^_^ */}
            </div>
            <div className={styles.input}>
              {/** user input field, value is sent to filter ^_^ */}
              <input
                type="text"
                value={input1}
                onChange={(e) => handleChange1(e.target.value)}
                placeholder="Please enter one or more characters"
              />{" "}
              {/** filtered results display here.  handles two events, sending .name and .id to there state ^_^ */}
              <div className={styles.searchResultsContainer}>
               <ul>
                  {results1.map((result, id) => {
                    return (
                      <Results
                        result={result}
                        key={id}
                        onResultClick={(result) => {
                          handleResultClick1(result.team.name);
                          handleResultClickId1(result.team.id);
                        }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.input__wrapper}>
            <div className={styles.inputDisplay__wrapper}>
              <div className={styles.teamName}>
                <h3>Team 2</h3>
              </div>
              <div className={styles.inputDisplay}>
                <h3>{inputResult2}</h3>
                {inputResult2 && (
                  <button
                    onClick={() =>
                      handleClearInput2(setInputResult2, setInputResultId2)
                    }
                  >
                    {/** clear the input field and display field ^_^ */} ✖
                  </button>
                )}{" "}
              </div>{" "}
              {/** input display */}
            </div>
            <div className={styles.input}>
              {/** user input field, value is sent to filter ^_^ */}
              <input
                type="text"
                value={input2}
                onChange={(e) => handleChange2(e.target.value)}
                placeholder="Please enter one or more characters"
              />
              {/** filtered results display, handles two events, sending .name and .id to there state ^_^ */}
              <div className={styles.searchResultsContainer}>
                <ul>
                  {results2.map((result, id) => {
                    return (
                      <Results
                        result={result}
                        key={id}
                        onResultClick={(result) => {
                          handleResultClick2(result.team.name);
                          handleResultClickId2(result.team.id);
                        }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/**  passing the .id value as a prop to the button for validation before sending to api url ^_^  */}
        <div className={styles.submitButton__wrapper}>
          <div className={styles.submitButton__container}>
            <SubmitButton
              inputResultId1={inputResultId1}
              inputResultId2={inputResultId2}
            />
          </div>
        </div>
      </div>
    </>
  );
}
// ^_^
