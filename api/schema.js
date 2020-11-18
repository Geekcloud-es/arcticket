export default `

    scalar Date
    union Contrato = mantenimiento | bhoras
    type avisos{
        aviso: Int,
        cliente: String,
        contacto: contacto,
        tecnico: [String],
        fecha: Date,
        f_apertura: Date,
        f_cierre: Date,
        estado: String,
        prioridad: Int,
        descripcion: String,
        desplazamiento: Int,
        observaciones: String,
        tp: String,
        partes: [parte],
        contrato: String
    }

    input avisosInput {
        aviso: Int,
        cliente: String,
        contacto: contactoInput,
        tecnico: [String],
        fecha: Date,
        f_apertura: Date,
        f_cierre: Date,
        estado: String,
        prioridad: Int,
        descripcion: String,
        desplazamiento: Int,
        observaciones: String,
        tp: String,
        partes: [parteInput],
        contrato: String
    }

    input avisosModify{
        aviso: Int,
        tecnico:[String],
        f_apertura: Date, 
        f_cierre: Date,
        prioridad: Int, 
        descripcion: String, 
        Observaciones: String, 
        tp: String, 
        contrato: String
    }

    
    
    type contacto{
        nombre: String,
        correo: String,
        numero: String,
    } 

    input contactoInput {
        nombre: String,
        correo: String,
        numero: String,
    }

    type parte{
        parte: Int,
        aviso: Int,
        descripcion: String,
        reparacion: String,
        horas: Int,
        f_apertura: String,
        f_cierre: String,
        estado: String,
        tecnico: [String],
        prestamo: [componente],
        componentes: [componente],
        desplazamiento: desplazamiento
    }

    input parteInput {
        parte: Int,
        aviso: Int,
        descripcion: String,
        reparacion: String,
        horas: Int,
        f_apertura: String,
        f_cierre: String,
        estado: String,
        prestamo: [componenteInput],
        componentes: [componenteInput]
    }

    input parteInput2 {
        aviso: Int,
        descripcion: String,
        horas: Int,
        f_apertura: Date,
        f_cierre: Date,
        estado: String,
        tecnico: [String]
       
    }

    type componente{
        componente: String,
        cantidad: Int
    }
    
    input componenteInput {
         componente: String,
         cantidad: Int
    }

    type incidencia {
        aviso: avisos,
        parte: [parte],
    }

    type Clientes {
        codigo: String, 
        nombre: String,
        telefono: String,
        f_alta: Date,
        sla: Boolean
    }
    
    type Usuarios {
        usuario: String,
        password: String,
        nombre: String,
        apellido: String,
        tp: String
    }

    type barchart {
        data: [Int],
        label: String
        
    }
    type monthlyAvisos{
        _id : month
        count: Int
    }
    
    type month{
        month: Int
    }
    type clientesAvisos {
        _id: String
        count: Int
    }

    type desplazamiento {
        km: Int,
        dietas: Int
    }

    input desplazamientoInput  {
        km: Int, 
        dietas: Int
    }



    enum contratoTp{
        mantenimiento
        bhoras
    }

    type mantenimiento{
        cliente: String
        contrato: Int
        representante: String
        tipo: contratoTp
        inventario: [inventario]
        visitas: visitas
        f_inicio: Date
        f_cierre: Date
    }

    type visitas {
        parametros: [String]
        record:[recordVisitas]
    }

    type recordVisitas{
        fecha: Date
        parametros: [formularioVisitas], 
        tecnico: String
        observaciones: String
    }

    type formularioVisitas{
        x: String,
        y: Boolean
    }

    type inventario{
        tipo: String, 
        descripcion: String
        n_serie: String
    }

    

    type bhoras{
        cliente: String
        contrato: Int
        tipo: contratoTp
        horas_m: Float
        record: [recordBH]
        
    }   

    type recordBH{
        fecha: Date
        bono: bonos
        representantes: String
        horas_r: Float
    }

    type bonos{
        codigo: String
        nombre: String 
        cantidad: Float
    }

    input mantenimientoInput {
        cliente: String
        contrato: Int
        representante: String
        tipo: contratoTp
        inventario: [inventarioInput]
        visitas: visitasInput
        f_inicio: Date
        f_cierre: Date
    }

    input visitasInput {
        parametros: [String]
        record: [recordVisitasInput]
    }

    input recordVisitasInput {
        fecha: Date
        parametros: [formularioVisitasInput],
        tecnico: String
        observaciones: String
    }

    input formularioVisitasInput {
        x: String,
        y: Boolean
    }

    input inventarioInput {
        tipo: String,
        descripcion: String
        n_serie: String
    }



    input bhorasInput {
        cliente: String
        contrato: Int
        tipo: contratoTp
        horas_m: Float
        record: [recordBHInput]

    }

    input recordBHInput {
        fecha: Date
        bono: bonosInput
        representantes: String
        horas_r: Float
    }


    
    input bonosInput {
        codigo: String
        nombre: String
        cantidad: Float
    }
    
    type Contactos{
        nombre: String, 
        empresa: String, 
        correo: String,
        departamento: String, 
        cargo: String, 
        telefono: String
    }

    input ContactosInput {
        nombre: String,
        empresa: String,
        correo: String,
        departamento: String,
        cargo: String,
        telefono: String
    }

    type proyectos{
        codigo: String,
        titulo: String, 
        descripcion: String,
        fecha_inicio: Date, 
        fecha_fin: Date,
        partner: String,
        cliente_final: String
    }

    input proyectosInput{
        codigo: String,
        titulo: String,
        descripcion: String,
        fecha_inicio: Date,
        fecha_fin: Date,
        partner: String,
        cliente_final: String
    }

    type task_proyecto {
        codigo: Int, 
        proyecto: String, 
        titulo: String,
        descripcion: String,
        fecha_inicio: Date, 
        fecha_fin: Date,
        tecnico:[String], 
        horas: Float, 
        notas: [String]
    }

    input task_proyectoInput {
        proyecto: String!,
        titulo: String,
        descripcion: String,
        fecha_inicio: Date,
        fecha_fin: Date,
        tecnico: [String],
        horas: Float,
        notas: [String]
    }

    type proyectoTask {
        proyecto: proyectos,
        tareas: [task_proyecto]
    }

    type Query{
        getHoras(tipo: [String], tecnico: [String]): [barchart]
        allAvisos: [avisos],
        allFullAvisos(avisosArr: [Int]): [incidencia],
        searchAvisos(situacion: String): [avisos],
        advSearchAvisos(cliente: String, fechaA: Date, fechaC: Date, specwords: String, estado: String, aviso: Int, contrato: String): [Int],
        getFullAvisos(tp: String, tecnico: [String]): [incidencia],
        clientesSearch(input: String, codigo: String,all: String): [Clientes],
        getUser(codigo: String, tp: String): [Usuarios],
        stadAvisos(estado: String, cliente: String, tp: String, usuario: String): Int
        monthlyAvisos: [monthlyAvisos],
        clientesAvisos: [clientesAvisos],
        contratos(busqueda: String = undefined, codigo: Int = undefined): [Contrato]
        contactos(busqueda: String = undefined, empresa: String):[Contactos]    
        horasAvisos(contrato: Int): Int

        proyecto_show(codigo: String = undefined): [proyectos]

        proyectosTask(codigo: String): proyectoTask
        task_show(codigo: String = undefined, proyecto: String = undefined): [task_proyecto]

    
    }
    
    type Mutation {
        closeAviso(cod: Int, f_cierre: String) : avisos,
        closeParte(parte: Int, f_cierre: String, desplazamiento: desplazamientoInput): parte,
        
        newAviso(Aviso: avisosInput): avisos
        newParte(Parte: parteInput2): parte, 
        updateAviso(formulario: avisosModify): Int

        newContrato(mantenimientoInput: mantenimientoInput, bhorasInput: bhorasInput):[Contrato]
        modifyContrato(contrato: Int, mantenimientoInput: mantenimientoInput, bhoras: bhorasInput):Contrato
        addVisita(record: recordVisitasInput, contrato: Int): Int
        addBonoHoras(bono: bonosInput, contrato: Int): Int

        proyectoInput(proyectos: proyectosInput): proyectos
        
        task_proyectoInput(tarea: task_proyectoInput): task_proyecto
    }
`