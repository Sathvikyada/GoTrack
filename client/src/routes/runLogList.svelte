<script>
  import { onMount } from 'svelte';
  import { RunLogStore, CalorieInfoStore } from './store.js';
  import Description from './descriptionInput.svelte';

  let rankedRunLogs = []; // Array to store ranked logs
  let currentLogId = null;
  let currentCalorieLogId = null; // Track which log's calorie data is displayed
  let calorieData = {}; // State to hold calorie data for each log
  let weight = 70; // Default weight value or dynamic from store

  // Fetch the ranked run logs on component mount
  onMount(async () => {
    const res = await fetch('http://localhost:4002/top-runs'); // Fetch from the ranking microservice
    rankedRunLogs = await res.json();
    RunLogStore.set(rankedRunLogs); // Store ranked logs in the RunLogStore
  });

  // Subscribe to updates from the RunLogStore
  RunLogStore.subscribe(value => {
    rankedRunLogs = value;
  });

  // Subscribe to weight from CalorieInfoStore
  CalorieInfoStore.subscribe(value => {
    weight = value.weight || 70; // Use default weight if not available in store
  });

  // Handle toggling the add note form
  const handleEditNote = (logId) => {
    currentLogId = (currentLogId === logId) ? null : logId; // Toggle between log IDs
  };

  // Handle toggling the calorie display
  const handleToggleCalories = (logId) => {
    currentCalorieLogId = (currentCalorieLogId === logId) ? null : logId; // Toggle between log IDs
  };

  // Handle deleting a run log
  const handleDelete = async (logId) => {
    try {
      const res = await fetch(`http://localhost:4000/runlogs/${logId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        // If deletion is successful, remove the log from the store
        RunLogStore.update(logs => logs.filter(log => log._id !== logId));
      } else {
        console.error('Failed to delete run log');
      }
    } catch (error) {
      console.error('Error deleting run log:', error);
    }
  };

  // Handle calculating calories
  const handleCalculateCalories = async (logId, distance) => {
  try {
    const res = await fetch('http://localhost:4001/calculate-calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ weight, logId, distance }) // Include distance in the request body
    });

    if (res.ok) {
      const data = await res.json();
      calorieData[logId] = data; // Store the result in calorieData
      handleToggleCalories(logId); // Show the calorie data after calculation
    } else {
      console.error('Failed to calculate calories');
    }
  } catch (error) {
    console.error('Error calculating calories:', error);
  }
};
</script>

<div>
  <!-- Display ranked run logs -->
  {#each rankedRunLogs as log, index}
    <div>
      <h3>Rank: {index + 1}</h3> <!-- Show rank -->
      <h3>Duration: {log.duration}</h3>
      <h3>Distance: {log.distance} miles</h3> <!-- Display distance from the log -->
      <h3>Speed: {(log.distance / (log.duration/60)).toFixed(2)} miles/h</h3> <!-- Show calculated speed -->
      
      <ul>
        {#each log.splits as split}
          <li>{split}</li>
        {/each}
      </ul>

      <!-- Display the notes if available -->
      {#if log.notes && log.notes.length > 0}
        <h4>Notes:</h4>
        <ul>
          {#each log.notes as note}
            <li>{note}</li>
          {/each}
        </ul>
      {/if}

      <!-- Button to toggle "Add Note" form -->
      <button on:click={() => handleEditNote(log._id)}>
        {#if currentLogId === log._id} Close Notes {/if} 
        {#if currentLogId !== log._id} Add Note {/if}
      </button>
      
      <!-- Button to delete the run log -->
      <button on:click={() => handleDelete(log._id)}>Delete</button>

      <!-- Button to calculate calories and toggle the display -->
      <button on:click={() => handleCalculateCalories(log._id, log.distance)}>
        {#if currentCalorieLogId === log._id} Close Calories {/if} 
        {#if currentCalorieLogId !== log._id} Calculate Calories {/if}
      </button>

      <!-- Display calorie data if available and if toggled open -->
      {#if calorieData[log._id] && currentCalorieLogId === log._id}
        <h4>Calories Burned:</h4>
        <pre>{JSON.stringify(calorieData[log._id], null, 2)}</pre>
      {/if}

      <!-- Conditionally show the description input for notes -->
      {#if currentLogId === log._id}
        <Description logId={log._id} />
      {/if}
    </div>
  {/each}
</div>

<style>
 /* General layout for the container */
div {
  display: flex;
  flex-direction: column;
  background-color: #fff8e1; /* Beige background */
  padding: 20px;
  margin-left: -20px; /* Space between components */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px; /* Adjust width */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box; /* Ensure padding is included in total width */
}

/* Styling for each run log entry */
div > div {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #e0f2e0; /* Light green background for each log */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden; /* Prevent content overflow */
}

/* Titles for each run log */
h3 {
  margin: 5px 0;
  color: #4d774e; /* Light green text for titles */
  font-weight: bold;
}

/* Styled list for splits and notes */
ul {
  padding-left: 20px;
  color: #4d774e;
  margin: 0; /* Remove default margin */
}

li {
  margin-bottom: 5px;
}

/* Button styling */
button {
  background-color: #4d774e; /* Light green background */
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping */
}

button:hover {
  background-color: #386b3f; /* Darker green on hover */
}

/* Styling for calorie data display */
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  font-size: 0.9em;
}

</style>

