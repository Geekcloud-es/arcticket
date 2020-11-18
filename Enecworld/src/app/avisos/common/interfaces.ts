export class Aviso {
    cliente: string;
    contacto: {
        nombre: string,
        correo: string
    };
    tecnico: string[];
    fecha: Date;
    f_apertura: Date;
    f_cierre: Date;
    estado: string;
    prioridad: number;
    descripcion: string; 
    observaciones: string; 
    tp: string;
    despplazamiento: number;
}

export class Parte {
    aviso: string;
    descripcion: string;
    tecnico: string[];
    horas: number;
    f_apertura: Date;
    f_cierre: Date;
    estado: string;
    prestamo: any[];
    componente: string[]
}

export class searchValues {
    public search: {
        aviso: Number,
        cliente: String,
        fechaA: Date,
        fechaC: Date,
        specwords: String,
        estado: String
    };
    public response: {
        arrAvisos: Number[]
    }
    constructor() {
        this.search = {
            aviso :  undefined,
            cliente: undefined,
            fechaA : undefined,
            fechaC : undefined,
            specwords : undefined,
            estado : undefined
        },
        this.response = {
            arrAvisos: undefined
        }
    }
    
}

export class desplazamiento {
    
    km: Number;
    dietas: Number;

    constructor(){
        
        this.km = undefined;
        this.dietas = undefined
    }
}