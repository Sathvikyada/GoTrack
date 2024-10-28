<script>
  import RunLogCreate from './runLogCreate.svelte';
  import RunLogList from './runLogList.svelte';
  import CalorieInfo from './calorieInfo.svelte';
  import { RunLogStore, CalorieInfoStore } from './store.js';

  let runLogs = [];
  let calorieInfo = {};

  // Subscribe to the stores
  RunLogStore.subscribe(value => runLogs = value);
  CalorieInfoStore.subscribe(value => calorieInfo = value);
</script>

<div>
  <h1>Run Log Application</h1>
  <div class="run-log-container">
    <RunLogCreate />
    <CalorieInfo calorieInfo={calorieInfo} /> <!-- Positioned next to RunLogCreate -->
    <RunLogList runLogs={runLogs} />
  </div>
</div>

<style>
/* General page background */
div {
  background-color: #f5f5dc; /* Beige background */
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding is included in total width/height */
}

/* Centering and styling the title */
h1 {
  color: #4d774e; /* Light green */
  text-align: center;
  font-size: 3em;
  margin-bottom: 40px;
  letter-spacing: 3px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Flexbox setup for content alignment */
.run-log-container {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  gap: 160px; /* Space between components */
  align-items: flex-start; /* Align items to the top to prevent stretching */
}

/* Styling the RunLogCreate component */
.run-log-create {
  max-width: 300px; /* Limit the width to prevent stretching */
  background-color: #fff8e1; /* Background color similar to the form */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Prevent content overflow */
}

/* Styling the CalorieInfo component */
.calorie-info {
  max-width: 300px; /* Set a max width */
  background-color: #fff8e1; /* Match background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Prevent content overflow */
}

/* Styling the RunLogList component */
.run-log-list {
  max-width: 400px; /* Adjust the width as needed */
}

/* Ensure all child components inside .run-log-container follow the same layout */
.run-log-container > * {
  flex: 0 1 auto; /* Prevent components from stretching */
}
  
</style>
