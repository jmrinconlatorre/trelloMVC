const mongoose = require('mongoose');
const {pick} = require ('lodash');//solamente importamos pick 

const UserSchema = new mongoose.Schema({
        //_id, el id lo añade solo
        name: {
            type: String, // String
            required: true, // obligatorio
            maxlength: 50, // maximo 50
        },
        email: {
            type: String,
            unique: true,
            required: true,

            
        },
        password: {
            type: String,
            required: true,
            minlength: 8
            // string
            // required
            // minimo 8 chars
            // reglas de validación
        }
    }, {
        strict: false,
    }

);
/**@override
 * Funcion para devolver solo lo que queramos que devuelva el GET (sin la contraseña por ejemplo)
 */
UserSchema.methods.toJSON = function () { //lo ponemos como function para que coja el this de UserSchema
    const user = this;

    // return {
    //     name: user.name,
    //     email: user.email
    // }

    return pick(user, ['id','name','user','email']);

}

UserSchema.statics.findByCredentials = ({email,password}) => {
    // email, password
    console.log(email,password);
    return User.findOne({email,password});//busca solo uno con monogoose
}

const User = mongoose.model('User', UserSchema);

module.exports = User;//exportamos la variable 