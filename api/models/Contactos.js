import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactosSchema = new Schema({
    nombre: String,
    empresa: String,
    correo: String,
    departamento: String,
    cargo: String,
    telefono: String
})

const Contactos = mongoose.model('contactos', ContactosSchema);
export default Contactos;