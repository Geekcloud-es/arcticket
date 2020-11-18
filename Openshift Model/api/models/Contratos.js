import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContratosSchema = new Schema({
    //Comun
    cliente: String,
    contrato: Number,
    tipo: String,

    //Mantenimiento Schema
    representante: String,
    inventario: [{
        tipo: String,
        descripcion: String,
        n_serie: String
    }],
    visitas: {
        parametros: [String],
        record: [{
            fecha: Date,
            parametros: [{
                x: String,
                y: Boolean
            }],
            tecnico: String,
            observaciones: String
        }]
    },
    f_inicio: Date,
    f_cierre: Date,


    //Bono de horas Schema
    horas_m: Number,
    record: [{
        fecha: Date,
        bono: {
            codigo: String,
            nombre: String,
            cantidad: Number
        },
        representante: String,
        horas_r: Number
    }]
})

const Contratos = mongoose.model('contratos', ContratosSchema);
export default Contratos