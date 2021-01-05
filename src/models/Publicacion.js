const mongoose = require('mongoose');
const { Schema } = mongoose;

const PublicacionSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, requiered: true},
    date: { type: Date, default: Date.now},
    img:{
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Publicacion', NoteSchema);
