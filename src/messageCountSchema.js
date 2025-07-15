const {Schema, model, models} = require('mongoose');

const messageCountSchema = new Schema({
    userId: { type: String, required: true, unique: true },  // Unique identifier for the user
    messageCount: { type: Number, default: 0 },  // Count of messages
    userName: { type: String, default: '' }  // Stores user nickname
});

const name = 'MessageCount';  // Name of the model
module.exports = models[name] || model(name, messageCountSchema);  // Export the model, or use existing one if it exists