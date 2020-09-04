const { Router } = require('express');
const router = Router();
//
const jsonWebT = require('jsonwebtoken');
//
const UserModel = require('../models/User');

router.get('/', (req, res) => { res.send('Pagina Inicial de /API.')} );

router.post('/registrar', async (req, res) => { 
    
    const email = req.body.email;
    const password = req.body.password;

    const validate = ValidateEmail(email);

    if(validate){
        res.status(401).send("Email Existente");
    }else{

        const newUser = new UserModel({email: email, password : password});

        await newUser.save();

        const token = jsonWebT.sign(
            { _id : newUser._id },
            'variableEntorno'
        );

        res.status(200).json({token});
    }   
    
} );

router.post('/entrar', async (req, res) => {

    const { email, password } = req.body;

    const userAuth = await UserModel.findOne(
        {email : email}
    );

    if(!userAuth) return res.status(401).send("Email Invalido");
    if(userAuth.password !== password) return res.status(401).send("Contraseña Invalida");

    const token = jsonWebT.sign(
        {_id : userAuth._id},
        'variableEntorno'
    );

    res.status(200).json({token});
});

router.get('/empresas', (req, res) => {
    res.json([
        {
            _id : 1,
            name: "Peregrina",
            descrip: "¡Disfruta de catas, visitas a nuestra planta, entradas a eventos, descuentos en tus compras, promociones, concursos y muchas sorpresas más!",
            url : "https://www.peregrinabirra.com/"
        },
        {
            _id : 2,
            name: "Andromeda",
            descrip: "Somos un grupo de inversionistas enfocados en el crecimiento de proyectos con propósito. ",
            url : "https://www.andromedaventures.net/"
        },
        {
            _id : 3,
            name: "Ekiipago",
            descrip: "En Ekiipago estamos liderando la transformación de los pagos digitales a través de innovaciones disruptivas que potencian el mercado digital del ahora.",
            url : "https://enviodedinero.ekiipago.com/"
        }
    ]);
});

router.get('/metadata', verifyToken, (req, res) => {
    //res.send(req.userObjAuthorizate);
    //res.send(req.);
    res.json([
        {
            _id : 1,
            nombre: "Bryan",
            espec: "Frontend"
        },
        {
            _id : 2,
            nombre: "Carmen",
            espec: "Frontend"
        },
        {
            _id : 3,
            nombre: "Isacc",
            espec: "Backend"
        },
        {
            _id : 4,
            nombre: "Key",
            espec: "Full-Stack"
        }
    ]);
});

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).send('No estas autorizado');
    }

    const token = req.headers.authorization.split(' ')[1];

    if(token === 'null'){
        return res.status(401).send('No estas autorizado');
    }

    const tokenLoad = jsonWebT.verify(token, 'variableEntorno')
    console.log(tokenLoad);

    req.userObjAuthorizate = tokenLoad._id;

    next();
}

function ValidateEmail(email){

    if(email.match(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/))
    {   
        return true;
    }else{
        return false;
    }
}



module.exports = router;