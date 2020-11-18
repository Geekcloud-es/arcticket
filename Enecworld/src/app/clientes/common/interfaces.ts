export class mantenimiento {
    f_inicio: any;
    f_fin: any;
    visitas: [{
        fecha: Date, 
        checks:[[String ,String ]],
        tecnico: String[]
    }]

    constructor(){}
}
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

export class desplazamiento {

    km: Number;
    dietas: Number;

    constructor() {

        this.km = undefined;
        this.dietas = undefined
    }
}