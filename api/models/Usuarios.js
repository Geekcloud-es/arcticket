import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    usuario: String,
    password: String,
    nombre: String,
    apellido: String,
    tp: String
})

const Usuarios = mongoose.model('usuarios', UsuariosSchema);
export default Usuarios;