import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProyectosSchema = new Schema({
    codigo: String,
    titulo: String,
    descripcion: String,
    fecha_inicio: Date,
    fecha_fin: Date,
    partner: String,
    cliente_final: String
})
ProyectosSchema.index({
    titulo: 'text',
    descripcion: 'text',
    partner: 'text',
    cliente_final: 'text'
})

const Proyectos = mongoose.model('proyectos', ProyectosSchema);
export default Proyectos;