import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// API key for Ninja API
const API_KEY = 'ed926229bdmsh24b7483a603536ap160940jsncf42f9a653c1';

app.post('/calculate-calories', async (req, res) => {
  const { weight, logId, distance } = req.body; // distance now passed in

  try {
    // Fetch the run log by ID
    const runLogRes = await fetch(`http://localhost:4000/runlogs/${logId}`);
    const runLog = await runLogRes.json();

    if (!runLog || !runLog.duration || !distance) {
      return res.status(404).json({ error: 'Run log not found or missing duration/distance' });
    }

    const durationMinutes = runLog.duration;
    const durationHours = durationMinutes / 60;

    // Calculate the actual speed (miles per hour)
    const actualSpeed = distance / durationHours;

    // Make API call to Ninja API for calorie calculation
    const response = await fetch(`https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=running&weight=${weight}&duration=${durationMinutes}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch calories data' });
    }

    const data = await response.json();

    // Extract the speed from the activity names in the response data
    const speedsData = data.map(activity => {
      const match = activity.name.match(/(\d+(\.\d+)?) mph/);
      const speed = match ? parseFloat(match[1]) : null;
      return { ...activity, speed };
    });

    // Filter out any invalid speeds
    const validSpeedsData = speedsData.filter(activity => activity.speed !== null);

    // Find the closest speed to the actual speed
    const closestActivity = validSpeedsData.reduce((prev, curr) => {
      return Math.abs(curr.speed - actualSpeed) < Math.abs(prev.speed - actualSpeed) ? curr : prev;
    });

    // Return the closest activity
    res.status(200).json(closestActivity);
  } catch (error) {
    console.error('Error calculating calories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(4001, () => {
  console.log('Calorie Counter Microservice running on port 4001');
});
