import express from 'express';
import Datastore from 'nedb';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Datastore({ filename: 'runLogDB.db', autoload: true });

// Create a new run log
app.post('/runlogs', (req, res) => {
  const { duration, distance, splits } = req.body;

  // Ensure all necessary fields are provided
  if (!duration || !distance || !splits) {
    return res.status(400).json({ error: 'Missing required fields: duration, distance, or splits' });
  }

  // Insert the new log into the database
  const newRunLog = {
    duration,
    distance, // Now includes distance
    splits,
    notes: [], // Initialize an empty array for notes
  };

  db.insert(newRunLog, (err, newDoc) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create run log' });
    } else {
      res.status(201).json({ success: true, message: 'Run log created', data: newDoc });
    }
  });
});

// Get all run logs
app.get('/runlogs', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve run logs' });
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get a specific run log by ID
app.get('/runlogs/:id', (req, res) => {
  const logId = req.params.id;
  
  db.findOne({ _id: logId }, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve run log' });
    } else if (!doc) {
      res.status(404).json({ error: 'Run log not found' });
    } else {
      res.status(200).json(doc);
    }
  });
});

// Add a note to a specific run log
app.post('/runlogs/:id/add-note', (req, res) => {
  const logId = req.params.id;
  const { notes } = req.body;

  // Use $push to append the new note to the notes array
  db.update({ _id: logId }, { $push: { notes: notes } }, {}, (err, numAffected) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update run log' });
    } else if (numAffected === 0) {
      res.status(404).json({ error: 'Run log not found' });
    } else {
      db.findOne({ _id: logId }, (err, doc) => {
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve updated run log' });
        } else {
          res.status(200).json(doc);
        }
      });
    }
  });
});

// Delete a specific run log
app.delete('/runlogs/:id', (req, res) => {
  const logId = req.params.id;

  db.remove({ _id: logId }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete run log' });
    } else if (numRemoved === 0) {
      res.status(404).json({ error: 'Run log not found' });
    } else {
      res.status(200).json({ success: true, message: 'Run log deleted' });
    }
  });
});

app.listen(4000, () => {
  console.log('RunLog Microservice running on port 4000');
});
