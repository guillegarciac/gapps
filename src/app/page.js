'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';

export default function Home() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);  // Added to track error state

  useEffect(() => {
    async function fetchApps() {
      try {
        console.log("Fetching apps from API");  // Log the action
        const res = await fetch('/api/apps');
        if (!res.ok) {  // Check if the response was not okay
          throw new Error(`HTTP error! status: ${res.status}`); // Throw to catch block
        }
        const data = await res.json();
        if (!data.data) {  // Check if data is structured as expected
          throw new Error("No data key found in response"); // Throw to catch block
        }
        setApps(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch apps:', error);
        setError(error.message);  // Set error state to display or use later
        setIsLoading(false);
      }
    }

    fetchApps();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;  // Display error message if an error occurred
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Apps</h1>
        {apps.map(app => (
          <div key={app._id}>
            <h2>{app.name}</h2>
            <p>{app.description}</p>
          </div>
        ))}
      </div>

      {/* Rest of your Home component */}
    </main>
  );
}
