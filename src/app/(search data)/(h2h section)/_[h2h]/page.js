"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import Statistics from "../_h2h-statistics/page";

export default function HeadToHead({ params }) {
  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const headers = {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "",
  };

  // should fetch condition
  const shouldFetch = params;

  const { data, error } = useSWR(
    shouldFetch
      ? `https://v3.football.api-sports.io/fixtures?id=${params}`
      : null,
    (url) => fetcher(url, headers),
    {
      shouldRetryOnError: false, // Disable automatic retries on error
    }
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  
  const teamsData = data.response[0];

  return (
    <div>
      <div className={styles.matchWrapper}>
        <section className={styles.matchWrapper__header}>
          <div className={styles.matchWrapper__header__content}>
            <div>
              <p>{teamsData.league.name}</p>
            </div>
            <div>
              <p>{teamsData.league.round}</p>
            </div>
            <div>
              <p>
                {new Date(teamsData.fixture.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </section>
        <section className={styles.matchWrapper__body}>
          <div className={styles.matchWrapper__body__content}>
            <div className={styles.matchWrapper__teams}>
              <div>
                {" "}
                <img src={teamsData.teams.home.logo} alt="Home Team Logo" />
              </div>
              <div>
                <p>{teamsData.teams.home.name}</p>
              </div>
            </div>
            <div className={styles.matchWrapper__fixture}>
              <div className={styles.matchWrapper__scores}>
                <p>{teamsData.goals.home}</p>
                <p>-</p>
                <p>{teamsData.goals.away}</p>
              </div>
              <p>{teamsData.fixture.status.long}</p>
              <div className={styles.matchWrapper__event}>
                <p>
                  {teamsData.fixture.venue.name},{teamsData.fixture.venue.city}
                </p>
                <p>
                  <span>&#128364;</span> {teamsData.fixture.referee}{" "}
                </p>
              </div>
            </div>
            <div className={styles.matchWrapper__teams}>
              <div>
                {" "}
                <img src={teamsData.teams.away.logo} alt="Away Team Logo" />
              </div>
              <div>
                <p>{teamsData.teams.away.name}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Statistics fixtureId={teamsData.fixture.id} />
    </div>
  );
}
