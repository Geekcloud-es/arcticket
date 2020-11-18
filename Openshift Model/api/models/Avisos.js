import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AvisosSchema = new Schema({
    aviso: Number,
    cliente: String,
    contacto: {
        nombre: String,
        correo: String,
        numero: String
    },
    tecnico: [String],
    fecha: Date,
    f_apertura: Date,
    f_cierre: Date,
    estado: String,
    prioridad: Number,
    descripcion: String,
    observaciones: String,
    tp: String,
    desplazamiento: Number,
    contrato: String

})

AvisosSchema.index({
    descripcion: 'text',
    observaciones: 'text'
})

const Avisos = mongoose.model('avisos', AvisosSchema);
export default Avisos;