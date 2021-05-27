const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// no hace falta colocar id
const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    lastName:   String,
    email: String,
    birthdate: Date, // mm/dd/aaaa
    },
    {timestamps: true} // agrega fecha de creación y modificación cada vez que se persista un dato 
);

module.exports = mongoose.model('user', userSchema); // user = nombre de la BBDD en mongo