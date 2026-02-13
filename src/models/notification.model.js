const { Schema, model } = require('mongoose');

const NotificationSchema = Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['INFO', 'WARNING', 'FRAUD'], 
        default: 'INFO' 
    },
    status: { 
        type: String, 
        enum: ['READ', 'UNREAD'], 
        default: 'UNREAD' 
    },
    date: { 
        type: Date, 
        default: 
        Date.now }
    });

module.exports = model('Notification', NotificationSchema);