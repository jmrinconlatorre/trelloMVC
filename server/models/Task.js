const mongoose = require('mongoose');
const {
    pick
} = require('lodash'); //solamente importamos pick 

const TaskSchema = new mongoose.Schema({
    //_id, el id lo añade solo
        text: String,
        completed: Boolean,
        color: String
        
        // name: {
        //     type: String, // String
        //     required: true, // obligatorio
        //     maxlength: 50, // maximo 50
        // },
        // email: {
        //     type: String,
        //     unique: true,
        //     required: true,
        // },
        // password: {
        //     type: String,
        //     required: true,
        //     minlength: 8
        //     // string
        //     // required
        //     // minimo 8 chars
        //     // reglas de validación
        // }

    }, {
        strict: false,
    }

);
/**@override
 * Funcion para devolver solo lo que queramos que devuelva el GET (sin la contraseña por ejemplo)
 */
TaskSchema.methods.toJSON = function () { //lo ponemos como function para que coja el this de UserSchema
    const task = this;

    // return {
    //     name: user.name,
    //     email: user.email
    // }

    return pick(task, ['id', 'text', 'completed', 'color']);

}

TaskSchema.statics.findByCredentials = ({
    text,
    completed
}) => {
    // email, password
    console.log(text, completed);
    return User.findOne({
        text,
        completed
    }); //busca solo uno con monogoose
}

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; //exportamos la variable 