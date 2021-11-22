const {check,body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const User = db.Users;

module.exports =[
    check('name')
    .notEmpty()
    .withMessage("El nombre es requerido"),

    check('lastName')
    .notEmpty()
    .withMessage("El apellido es requerido"),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('phone')
    .notEmpty()
    .withMessage("El número telefónico es requerido").bail()
    .isNumeric()
    .withMessage('Solo números, por favor')
    .isLength({
        min:7,
        max: 20
    })
    .withMessage('Debe tener al menos 7 caracteres'),

    body('email').custom(value => {
        return User.findOne({
            where : { email : value }
        })
        .then(user => {
            if(user){
                return Promise.reject('Este email ya está registrado')
            }
        })
    }),

    check('pass1')
    .notEmpty()
    .withMessage('Utiliza una clave que recuerdes')
    .isLength({
        min: 6,
        max: 15
    })
    .withMessage("Debe tener entre 6 y 15 caracteres"),

    body('pass2').custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check("terms")
    .isString("on")
    .withMessage("Debes aceptar las Bases y Condiciones")

]