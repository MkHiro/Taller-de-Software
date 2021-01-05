const express = require('express');
const Publicacion = express;
const bodyParser = require('body-parser');
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
require('dotenv/config'); 

const Publicacion = require(Publicacion);
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
const upload = multer({ storage: storage }); 

routes.get('/', (req, res) => { 
    Publicacion.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('publicacion', { items: items }); 
        } 
    }); 
}); 

routes.post('/', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        title: req.body.title, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    Publicacion.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/'); 
        } 
    }); 
}); 