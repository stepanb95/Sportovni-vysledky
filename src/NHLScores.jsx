import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NHLScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4380');
        console.log(response.data); // Debug: Zobrazení celé odpovědi
        setScores(response.data.events); // Předpokládám, že data jsou v response.data.events
        setLoading(false);
      } catch (err) {
        console.error(err); // Debug: Zobrazení chyby
        setError(err);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>NHL Scores</h1>
      <ul>
        {scores.map(score => (
          <li key={score.idEvent}>
            {score.strHomeTeam} {score.intHomeScore} - {score.strAwayTeam} {score.intAwayScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NHLScores;
