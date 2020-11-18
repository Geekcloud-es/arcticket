import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskProyectosSchema = new Schema({
    codigo: Number,
    proyecto: String,
    titulo: String,
    descripcion: String,
    fecha_inicio: Date,
    fecha_fin: Date,
    tecnico: [String],
    horas: Number,
    notas: [String],
    root: Number

})

TaskProyectosSchema.index({
    titulo: 'text',
    descripcion: 'text',

})

const TaskProyectos = mongoose.model('task_proyectos', TaskProyectosSchema);
export default TaskProyectos;