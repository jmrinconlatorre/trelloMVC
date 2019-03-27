/**
 * Fichero para las variables de entorno
 */
console.log(process.env.NODE_ENV);


const environments={
    production : "production",
    development : "development",
    test: "test"
}

const ENV = process.env.NODE_ENV || environments.development;//para que alguien que se baje la aplicacion que la ejecute por defecto en desarrollo


const config = {
    [environments.production] :{
        PORT: 80,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'mongoDB'
        }
    },
    [environments.development] :{
        PORT:3000,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'mongoDB_dev'
        }
    },
    [environments.test] :{
        PORT:3000,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'mongoDB_test'
        }
    }
}

const CONFIG = config[ENV];//guardamos la configuracion en una constante
if(!CONFIG){
    throw new Error (`NODE_ENV=${ENV} is not a valid environment.`);
}

process.env = {//AÑADE AL OBJETO process.env el objeto config (sin que se borre lo que ya tenia)
    ...process.env,
    ...CONFIG
}
console.log(process.env.MongoDB);