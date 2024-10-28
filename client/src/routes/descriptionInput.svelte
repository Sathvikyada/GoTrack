<script>
  import { RunLogStore } from './store.js';
  export let logId;

  let note = '';

  // Function to handle note submission
  const submitNote = async () => {
    try {
      const res = await fetch(`http://localhost:4000/runlogs/${logId}/add-note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: note }) // Send a single note
      });

      if (res.ok) {
        const updatedLog = await res.json();

        // Update the store with the updated run log
        RunLogStore.update(logs => {
          return logs.map(log => log._id === logId ? updatedLog : log);
        });

        // Clear the input field after successful submission
        note = '';
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
</script>

<div>
  <textarea bind:value={note} placeholder="Enter your note"></textarea>
  <button on:click={submitNote}>Add Note</button>
</div>
