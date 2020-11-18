import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
    codigo: String,
    nombre: String,
    telefono: String,
    f_alta: Date,
    sla: Boolean
})

const Clientes = mongoose.model('clientes', ClientesSchema);
export default Clientes;