const mongoose = require('mongoose');
//notes-db-app o el nombre que quiera para la base de datos
mongoose.connect('mongodb://localhost/zappingApp-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is conected'))
    .catch(err=> console.log(err));
