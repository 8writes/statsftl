"use client";
import useSWR from "swr";
import styles from "./page.module.css";

export default function Status() {
  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const headers = {
    "x-rapidapi-host": "v3.football.api-sports.io",
   // "x-rapidapi-key": "d1ed515a838a8284f71cf976771ea33f",
  };

  const { data, error, isLoading } = useSWR(
    "https://v3.football.api-sports.io/status",
    (url) => fetcher(url, headers)
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  const status = data.response[0];
  return (
    <>
      <div>
        {status && (
          <>
          Api calls remaining:  {status.requests.current}
          Api calls per day:  {status.requests.limit_day}
          </>
        )}
      </div>
    </>
  );
}
