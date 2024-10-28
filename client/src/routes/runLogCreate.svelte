<script>
  import { RunLogStore } from './store.js';

  let duration = '';
  let distance = ''; // New variable for distance
  let splits = ['', '', '', ''];

  const addRunLog = async () => {
    // Send a POST request to the backend to create a new run log
    const res = await fetch('http://localhost:4000/runlogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ duration, distance, splits }) // Include distance
    });

    const result = await res.json();
    if (result.success) {
      const newLog = result.data;

      // Update the RunLogStore with the new log
      RunLogStore.update(logs => [...logs, newLog]);

      // Reset form fields
      duration = '';
      distance = ''; // Reset distance
      splits = ['', '', '', ''];
    } else {
      console.error('Failed to create run log:', result.error);
    }
  };
</script>

<form on:submit|preventDefault={addRunLog}>
  <label>
    Duration:
    <input bind:value={duration} type="text" />
  </label>
  
  <label>
    Distance (km): <!-- New distance input -->
    <input bind:value={distance} type="text" />
  </label>
  
  {#each splits as split, index}
    <label>
      Split {index + 1}:
      <input bind:value={splits[index]} type="text" />
    </label>
  {/each}
  
  <button type="submit">Add Run Log</button>
</form>

<style>
/* Styling the form container */
form {
  background-color: #fff8e1; /* Soft beige background for form */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Make the form smaller */
  margin-left: 0; /* Align form to the left */
  margin-right: auto; /* Prevent centering */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden; /* Hide any overflowing content */
  display: flex;
  flex-direction: column; /* Stack children vertically */
}

/* Styling form labels */
label {
  display: block;
  margin-bottom: 10px;
  color: #4d774e; /* Light green text */
  font-size: 1em; /* Reduced font size for better fitting */
  font-weight: bold;
}

/* Styling text inputs */
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px; /* Reduced margin to prevent excessive height */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box; /* Ensure padding doesn't affect width */
  background-color: #f9f9f9;
  transition: border-color 0.3s ease-in-out;
}

/* Styling input focus */
input[type="text"]:focus {
  border-color: #4d774e; /* Light green border on focus */
  outline: none;
}

/* Styling the button */
button {
  width: 100%;
  background-color: #4d774e; /* Light green background */
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em; /* Adjusted font size */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Button hover effect */
button:hover {
  background-color: #386b3f; /* Darker green on hover */
}

/* Flexbox setup for alignment */
body {
  display: flex;
  justify-content: center; /* Center the form horizontally */
  padding: 50px; /* Add space around the body */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}


</style>

