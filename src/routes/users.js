const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


router.get('/user/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes', //direccion a donde se redirige al usuario si se logea de manera exitosa
    failureRedirect: '/user/signin',
    failureFlash: true //
}));

router.get('/user/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Debe ingresar un nombre' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'La contraseña no coincide' });
    }
    if (password.length < 5) {
        errors.push({ text: 'la contraseña debe contener al menos 5 caracteres' });
    }
    if (confirm_password.length <= 0) {
        errors.push({ text: 'no ingreso la confirmacion de contraseña' });
    }
    if (errors.length > 0) {
        res.render('/users/signup');
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ya se encuentra en uso');
            res.redirect('/user/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro exitoso');
        res.redirect('/user/signin');
    }
});

router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});



module.exports = router;