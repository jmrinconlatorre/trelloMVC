const router = require('express').Router();

const Task = require('../models/Task');

router.get('/', (req, res) => {
    res.send(process.env.NODE_ENV);
});

/**
 * User Routers.
 */

router.post('/task', (req, res) => {
    console.log(req.body);
    new Task(req.body)
        //{//instancia el usuario, pero no lo guarda
        // name: 'Ivan',
        // email: 'ivan@geekshubsacademy.com',
        // password: "mipass123"
        //})
        .save() //guarda el usuario en la base de datos
        .then(task => { //nos devuelve el usuario que ha guardado en la respuesta
            res.send(task);
        }).catch(err => { //catch por si falla
            res.status(400).send(err);
        });
});

router.post('/users/auth', async (req, res) => { //usamos async porque lo llamamos como una promesa
    try {
        const user = await User.findByCredentials(req.body); //con el await se queda parado hasta que la promesa se resuelva

        console.log(req.body);
        if (!user) { //si no encuentra el usuario devuelve 401
            return res.status(401).send('Wrong credentials');
        }
        res.send();
    } catch (err) {
        res.status(401);
    }
});

router.get('/users/', (req, res) => {

    User.find()
        .then(users => { //busca los usuarios y luego contesta el then 
            res.send(users);
        }).catch(err => {
            res.status(500).send(err);
        })

})

router.get('/users/:user_id', (req, res) => {

    User.findById(req.params.user_id)
        .then(users => { //busca los usuarios y luego contesta el then 
            res.send(users);
        }).catch(err => {
            res.status(500).send(err);
        })
})

router.delete('/users/:user_id', (req, res) => {
    User.findByIdAndDelete(req.params.user_id)
        .then(user => { //busca los usuarios y luego contesta el then 
            res.send(user);
        }).catch(err => {
            res.status(500).send(err);
        })
});

router.patch('/users/:user_id', (req, res) => {

    User.findByIdAndUpdate(
            req.params.user_id, //busca el usuario con el id
            // {
            //     ...//coge los datos del body
            // },
            req.body, {
                new: true,
                runValidators: true //actualizalos
            }
        )
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});

// //@todo
// router.put('/users/:user_id',(req,res)=>{//falta que funcione

//     User.findByIdAndUpdate(
//         req.params.user_id,//busca el usuario con el id
//         {
//             $set={
//                 ...req.body//coge los datos del body
//             }
//         },       
//         {
//             new: true,
//             runValidators: true//actualizalos
//         }
//     )
//     .then(user=>{
//         res.send(user);
//     })
//     .catch(err=>{
//         res.status(400).send(err);
//     })   
// });

module.exports = router;