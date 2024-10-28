<script>
  import { CalorieInfoStore } from './store.js';

  let weight = '';

  // Function to store the weight in the store
  const storeWeight = () => {
    CalorieInfoStore.set({ weight });
  };
</script>

<div class="weight-box">
  <label>
    Weight:
    <input bind:value={weight} type="text" />
  </label>
  <button on:click={storeWeight}>Store Weight Data</button>
</div>

<style>
  /* Styling the weight box container */
  .weight-box {
    background-color: #fff8e1; /* Soft beige background to match theme */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px; /* Limit the width */
    margin-top: 20px; /* Space above the box */
    display: flex;
    flex-direction: column; /* Stack children vertically */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Styling form labels */
  .weight-box label {
    display: block;
    margin-bottom: 10px;
    color: #4d774e; /* Light green text */
    font-size: 1em; /* Font size for labels */
    font-weight: bold;
  }

  /* Styling text inputs */
  .weight-box input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px; /* Margin to separate from the button */
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    box-sizing: border-box; /* Ensure padding doesn't affect width */
    background-color: #f9f9f9;
    transition: border-color 0.3s ease-in-out;
  }

  /* Styling input focus */
  .weight-box input[type="text"]:focus {
    border-color: #4d774e; /* Light green border on focus */
    outline: none;
  }

  /* Styling the button */
  .weight-box button {
    width: 100%;
    background-color: #4d774e; /* Light green background */
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  /* Button hover effect */
  .weight-box button:hover {
    background-color: #386b3f; /* Darker green on hover */
  }
</style>
