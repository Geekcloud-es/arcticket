import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PartesSchema = new Schema({
    parte: Number,
    aviso: Number,
    descripcion: String,
    reparacion: String,
    horas: Number,
    f_apertura: String,
    f_cierre: String,
    tecnico: [String],
    estado: String,
    desplazamiento: {
        km: Number,
        dietas: Number
    },
    prestamo: [{
        componentes: String,
        cantidad: Number,
    }],
    componentes: [{
        componentes: String,
        cantidad: Number,
    }]
})

const Partes = mongoose.model('partes', PartesSchema);
export default Partes;