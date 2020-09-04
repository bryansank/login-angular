const { Router } = require('express');
const router = Router();
//
const jsonWebT = require('jsonwebtoken');
//
const UserModel = require('../models/User');

router.get('/', (req, res) => { res.send('Pagina Inicial de /API.')} );

router.post('/registrar', async (req, res) => { 
    
    const { email, password } = req.body;

    const newUser = new UserModel({email: email, password : password});

    await newUser.save();

    const token = jsonWebT.sign(
        { _id : newUser._id },
        'variableEntorno'
    );

    res.status(200).json({token});
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
            descrip: "Cervezas"
        },
        {
            _id : 2,
            name: "Conectium",
            descrip: "Desarrolladora"
        },
        {
            _id : 3,
            name: "Ekiipago",
            descrip: "Pagos moviles"
        }
    ]);
});

router.get('/metadata', verifyToken, (req, res) => {
    res.send(req.userObjAuthorizate);
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

module.exports = router;