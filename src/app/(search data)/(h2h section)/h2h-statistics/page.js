"use client";
import useSWR from "swr";
import styles from "./page.module.css";

export default function Statistics({ fixtureId }) {
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
      ? `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`
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
    
    return <>
        <div>
            <h2>{ }</h2>
        </div>
    
    </>
}
