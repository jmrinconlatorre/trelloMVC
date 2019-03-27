require ('./config');//hace las variables de entorno


const express = require ('express');

const router = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());//
app.use(router);

app.listen(PORT,()=>{
    console.log(`Puerto levantado en http://localhost:${PORT}`)
})
