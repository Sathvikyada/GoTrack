// topRunsService.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/top-runs', async (req, res) => {
  try {
    // Fetch run logs from RunLogService
    const runLogsRes = await fetch('http://localhost:4000/runlogs');
    const runLogs = await runLogsRes.json();

    // Rank based on speed (distance/time)
    const rankedLogs = runLogs
      .map(log => ({
        ...log,
        speed: log.distance / (log.duration/60) // Calculate speed
      }))
      .sort((a, b) => b.speed - a.speed); // Sort by speed descending

    res.status(200).send(rankedLogs);
  } catch (error) {
    console.error('Error fetching or ranking logs:', error);
    res.status(500).json({ error: 'Failed to fetch and rank logs' });
  }
});

app.listen(4002, () => {
  console.log('TopRuns Microservice running on port 4002');
});
