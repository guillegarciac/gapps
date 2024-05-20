import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema.
const App = mongoose.models.App || mongoose.model('App', appSchema);

export default App;
