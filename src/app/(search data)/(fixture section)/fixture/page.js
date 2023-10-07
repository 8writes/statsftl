"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import HeadToHeadList from "../h2h-list/page";

export default function Fixtures({ teamId1, teamId2 }) {
  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const headers = {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "d1ed515a838a8284f71cf976771ea33f",
  };

  // should fetch condition based on teamId1 and teamId2
  const shouldFetch = teamId1 && teamId2;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${teamId1}-${teamId2}&status=NS`
      : null,
    (url) => fetcher(url, headers),
    {
      shouldRetryOnError: false, // Disable automatic retries on error
    }
  );

  if (error) {
    return <div className={styles.loader}>Failed to load</div>;
  }

  if (isLoading) {
    return <div className={styles.loader}>Loading data... 🤖 </div>;
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
              <div className={styles.matchWrapper__time}>
                <p>
                  {new Date(teamsData.fixture.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className={styles.matchWrapper__event}>
                <p>Vs</p>
              </div>
              <div>
                <p>{teamsData.fixture.status.long}</p>
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
        <section>
          {teamId1 && teamId2 && (
            <HeadToHeadList teamId1={teamId1} teamId2={teamId2} />
          )}
        </section>
      </div>
    </div>
  );
}
