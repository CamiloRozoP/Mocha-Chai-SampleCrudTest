const Joi = require('joi');

const taskSchema = {
    name: Joi.string(),
    city: Joi.string().min(4).required()
    
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);
