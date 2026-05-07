const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: { type: String, required: [true, 'Title required'] },
    description: { type: String },
    priority: { type: String, enum: ['Basse', 'Moyenne', 'Haute'], default: 'Moyenne' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pct: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)
