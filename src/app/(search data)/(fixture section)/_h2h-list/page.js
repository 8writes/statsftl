"use client";
import useSWR from "swr";
import styles from "./page.module.css";

export default function HeadToHeadList({ teamId1, teamId2 }) {
  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const headers = {
    "x-rapidapi-host": "v3.football.api-sports.io",
     "x-rapidapi-key":"d1ed515a838a8284f71cf976771ea33f",
  };

  // should fetch condition based on teamId1 and teamId2
  const shouldFetch = teamId1 && teamId2;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${teamId1}-${teamId2}&last=20`
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
    return <div className={styles.loader}>Loading...</div>;
  }
console.log(data);
  const teamsData = data.response;

  return (
    <div>
      <section className={styles.matchWrapper__header}>
          <div className={styles.matchWrapper__header__content}>
            <div>
              <p>{teamsData[0].teams.home.name} & {teamsData[0].teams.away.name}</p>
            </div>
            <div>
              <p>H2H results</p>
            </div>
          </div>
        </section>
      <div className={styles.table__container}>
        <table>
          <tbody>
            {teamsData.map((h2h, id) => (
              <tr key={id}>
                <td> {new Date(h2h.fixture.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}</td>
                <td>{h2h.teams.home.name}</td>
                <td>{h2h.goals.home}</td>
                <td>{h2h.goals.away}</td>
                <td>{h2h.teams.away.name}</td>
                <td>{h2h.league.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
