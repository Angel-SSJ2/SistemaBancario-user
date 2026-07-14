import { Schema, model } from 'mongoose';

const MonitoringSchema = new Schema({
    action: { type: String, required: true },
    userId: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Monitoring = model('Monitoring', MonitoringSchema);
