const statusOpts = ['Not Started','In Progress','Completed']
import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "Testing"
    },
    status: {
        type: String,
        default: "Not Started",
        enum: statusOpts
    },
    dueTime: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    /*userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    */
   users: {
    type: [String],
    validate: {
        validator: function(v) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return v.every(email => emailRegex.test(email));
        },
        message: props => `${props.value} contains invalid emails`
    }
   }
})

const todos = mongoose.model('todos', todoSchema);
export default todos;