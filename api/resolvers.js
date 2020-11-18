import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { UserInputError } from 'apollo-server';
import { userInfo } from 'os';

export default {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {

            return new Date(value).getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),

    Contrato: {
        __resolveType(obj, context, info) {

            if (obj.tipo == "mantenimiento") {
                return 'mantenimiento'
            }
            if (obj.tipo == "bhoras") {

                return 'bhoras'
            }
        },
    },

    Query: {


        allAvisos: async(parents, args, { Avisos }) => {
            const avisos = await Avisos.find();
            return avisos
        },

        allFullAvisos: async(parents, { avisosArr }, { Avisos, Partes }) => {

            var avisosObj = avisosArr != undefined ? { aviso: { $in: avisosArr } } : {};
            //console.log(avisosObj)
            var avisos = await Avisos.find(avisosObj);
            //console.log(avisos);
            var F_aviso = await Promise.all(avisos.map(async data => {
                var incidencia = {
                    aviso: '',
                    partes: []
                }

                incidencia.aviso = data;
                incidencia.parte = await Partes.find({ aviso: data.aviso });
                // console.log(incidencia);
                return incidencia
            }));


            return F_aviso;

        },

        getFullAvisos: async(parents, args, { Avisos, Partes }) => {
            var avisos;
            var a = {};
            if (args.tp != undefined) {
                Object.assign(a, {
                    tp: args.tp
                })
            };
            if (args.tecnico != undefined) {
                Object.assign(a, {
                    tecnico: { $in: args.tecnico }
                })
            };


            var avisos = await Avisos.find(a);

            var F_aviso = await Promise.all(avisos.map(async data => {
                var incidencia = {
                    aviso: '',
                    partes: []
                }

                incidencia.aviso = data;
                incidencia.parte = await Partes.find({
                    aviso: data.aviso
                });
                // console.log(incidencia);
                return incidencia
            }));


            return F_aviso;

        },
        advSearchAvisos: async(parent, { cliente, fechaA, fechaC, specwords, estado, aviso, contrato }, { Avisos, Partes }) => {
            //console.log(aviso);
            var searchAvisos = {};
            var result;
            //var avisos = [];
            var d = Date(Date.now());
            var d = d.toString();

            if (aviso != undefined) {
                searchAvisos = {
                    "aviso": aviso
                }

            } else {
                var contrats = contrato != undefined ? {
                    "contrato": contrato
                } : {};
                Object.assign(searchAvisos, contrats)

                var cli = cliente != null ? {
                    "cliente": cliente
                } : {};
                Object.assign(searchAvisos, cli)

                var fechaAp = fechaA != null ? {
                    "f_apertura": {
                        $gt: new Date(fechaA)
                    }
                } : {};
                Object.assign(searchAvisos, fechaAp);

                //var fechaCr = fechaC != undefined ? { "f_cierre": { $lte: fechaC } } : { "f_cierre": { $lte: Date(d) } }
                var fechaCr = fechaC != null ? {
                    "f_cierre": {
                        $lte: new Date(fechaC)
                    }
                } : {}
                Object.assign(searchAvisos, fechaCr);


                var estadoObj = estado != undefined ? {
                    "estado": estado
                } : {};
                Object.assign(searchAvisos, estadoObj);
            }




            console.log(searchAvisos);
            var avisos = await Avisos.find(searchAvisos);
            // console.log(avisos)
            var avisosArr = avisos.map(element => {
                return element.aviso
            })

            var avisosObj = {
                aviso: { $in: avisosArr }
            };


            var words = specwords != undefined ? { $text: { $search: specwords } } : {}
                // Object.assign(searchAvisos, words);

            var avisosObj = Object.assign(avisosObj, words);

            var avisoPostWords = await Avisos.find(avisosObj);

            var result = avisoPostWords.map(elem => {
                return String(elem.aviso);
            });

            var partesPostWords = await Partes.find(avisosObj);

            await partesPostWords.forEach(elm => {
                if (!result.includes(elm.aviso)) {
                    result.push(String(elm.aviso));
                }
            })

            //console.log(result)
            return result





            /*const avisos = Avisos.find(words);
            return avisos;*/

        },
        searchAvisos: async(parent, { situacion }, { Avisos }) => {
            var d = new Date();
            d.setDate(d.getDate() - 2);
            var obj = {}
            switch (situacion) {
                case "Sin_cerrar":
                    obj = {
                        estado: "A",
                        f_apertura: {
                            $lt: String(d)
                        }
                    }
                    break
                case "Por_atender":
                    obj = {
                        $or: [{ tecnico: [] }, { f_apertura: null }]
                    }
                    break
            }


            var respuesta = await Avisos.find(obj);
            // console.log(respuesta)
            return respuesta;
        },



        clientesSearch: async(parents, args, { Clientes }) => {
            if (args.input != undefined && args.input != "") {
                var clientes = await Clientes.find({
                    nombre: {
                        $regex: new RegExp(args.input, "i")
                    }
                });
            } else if (args.codigo != undefined) {
                var clientes = await Clientes.find({
                    codigo: args.codigo
                })
            } else {
                var clientes = await Clientes.find({

                })
            }

            return clientes
        },

        getUser: async(parents, args, { Usuarios }) => {
            var usuario
                //console.log(args.codigo);
            if (args.codigo != undefined) {
                usuario = Usuarios.find({
                    usuario: args.codigo
                })
            } else if (args.tp != undefined) {
                usuario = Usuarios.find({
                    tp: args.tp
                })
            }

            return usuario
        },



        //GET HORAS 

        getHoras: async(parent, args, { Avisos, Partes }) => {
            var avisos = await Avisos.find();

            var f_avisos = await Promise.all(avisos.map(async data => {
                var incidencia = {
                    aviso: '',
                    partes: []
                }

                incidencia.aviso = data;
                incidencia.parte = await Partes.find({
                    aviso: data.aviso
                });
                // console.log(incidencia);
                return incidencia
            }));

            var tipo = args.tipo;

            var tecnicos = args.tecnico;
            var ret = [];

            tipo.forEach(elm => {

                var partes = f_avisos.filter(avi => {
                    if (avi.aviso.tp == elm) {

                        return avi.parte;
                    }
                });

                var partesfit = [];

                partes.forEach(parte => {

                    parte.parte.forEach(elm => {

                        partesfit.push(elm);
                    })
                });

                var column = {
                    data: [],
                    label: elm
                };

                tecnicos.forEach(tec => {
                        var sum = 0

                        var horas = partesfit.filter(obj => {

                            if (obj.tecnico.includes(tec)) {

                                return obj;
                            }

                        }).map(obj => {
                            return obj.horas
                        })

                        try {
                            sum = horas.reduce((a, b) => a + b);
                        } catch (error) {
                            sum = 0;
                        }
                        column.data.push(sum);
                    })
                    // console.log(column);
                ret.push(column);

            })
            return ret;
        },

        stadAvisos: async(parents, { estado, cliente, tp, usuario }, { Avisos }) => {

            var findObj = {}

            var estadoObj = estado != undefined ? { "estado": estado } : {};
            Object.assign(findObj, estadoObj);

            var clienteObj = cliente != undefined ? { "cliente": cliente } : {};
            Object.assign(findObj, clienteObj);

            //  var sortObj = sort != undefined ? { orden: orden[1] } : {};

            var tpObj = tp != undefined ? { "tp": tp } : {};
            Object.assign(findObj, tpObj)

            var usuarioObj = usuario != undefined ? { "tecnico": { $in: usuario } } : {};
            Object.assign(findObj, usuarioObj)

            return await Avisos.find(findObj).countDocuments();


        },

        monthlyAvisos: async(parents, args, { Avisos }) => {

            return await Avisos.aggregate([{
                $match: {
                    $and: [{
                        estado: {
                            $eq: "C"
                        }
                    }]
                }
            }, {
                $group: {
                    _id: {
                        month: {
                            $month: "$f_apertura"
                        }
                    },
                    count: {
                        $sum: 1
                    }
                }
            }])
        },

        clientesAvisos: async(parents, args, { Avisos }) => {
            return await Avisos.aggregate([{
                $match: {
                    $and: [{
                        estado: {
                            $eq: "A"
                        }
                    }]
                }
            }, {
                $group: {
                    _id: "$cliente",
                    count: {
                        $sum: 1
                    }
                }
            }])
        },

        contratos: async(parent, { busqueda, codigo }, { Contratos }) => {
            if (codigo != undefined) {
                var search = { contrato: codigo }
            } else {
                var search = busqueda != undefined ? { cliente: busqueda } : {};
            }
            return await Contratos.find(search)
        },

        contactos: async(parent, { busqueda, empresa }, { Contactos }) => {
            var search = busqueda != undefined && busqueda != "" ? { $text: { $search: busqueda } } : {};
            Object.assign(search, {
                empresa: empresa
            })
            return await Contactos.find(search);
        },

        horasAvisos: async(parent, { contrato }, { Contratos, Partes, Avisos }) => {
            const cliente = await Contratos.findOne({
                contrato: contrato
            });

            var lastDate = cliente.record.reverse()[0] != undefined ? cliente.record.reverse()[0].fecha : new Date('1970-01-01Z00:00:00:000');

            var avisos = await Avisos.find({
                contrato: "bhoras",
                cliente: cliente.cliente
            });

            var avisos = avisos.map(element => {
                return element.aviso
            })

            var partes = await Partes.find({
                aviso: {
                    $in: avisos
                },
                f_apertura: {
                    $gte: lastDate
                }
            });
            var horas_totales = partes
                .map(element => element.horas)
                .reduce((a, b) => a + b);

            return horas_totales
        },

        proyecto_show: async(parent, { codigo }, { Proyectos }) => {
            var response;
            if (codigo != undefined) {
                response = await Proyectos.find({
                    codigo: codigo
                })
            } else {
                response = await Proyectos.find();
            }

            return response;

        },

        task_show: async(parent, { codigo, proyecto }, { Proyectos, TaskProyectos }) => {
            var tarea;
            var comprobacion_proyecto = await Proyectos.findOne({ codigo: proyecto });
            console.log(comprobacion_proyecto);
            var comprobacion_codigo = await TaskProyectos.findOne({ codigo: codigo });
            if (proyecto != undefined) {
                if (comprobacion_proyecto == null) {
                    throw new UserInputError("Este Proyecto no existe");
                } else {
                    tarea = await TaskProyectos.find({
                        proyecto: proyecto
                    });
                }

            } else if (codigo != undefined) {
                if (comprobacion_codigo == null) {
                    throw new UserInputError("Esta Tarea no existe");
                } else {
                    tarea = await TaskProyectos.find({
                        codigo: codigo
                    });
                }
            };


            return tarea;
        },

        proyectosTask: async(parent, { codigo }, { Proyectos, TaskProyectos }) => {
            var response;

            if (codigo != undefined) {
                let proyecto = await Proyectos.findOne({
                    codigo: codigo
                })
                console.log(proyecto);
                if (proyecto != null) {
                    var tarea = await TaskProyectos.find({
                        proyecto: codigo
                    });
                } else {
                    throw new UserInputError('Proyecto No existe');
                };
                response = { proyecto: proyecto, tareas: tarea };
            } else {
                response = []
                var proyecto = await Proyectos.find();
                proyectos.forEach(async proyecto => {
                    tarea = await TaskProyectos.find({
                        proyecto: proyecto.codigo
                    })
                    response.push({ proyecto: proyecto, tareas: tarea });
                });
            }
            console.log(response)
            return response;

        }

    },

    Mutation: {
        closeAviso: async(parent, args, { Avisos }) => {
            //console.log(args.f_cierre);
            // console.log(args.cod)
            console.log(await Avisos.updateOne({
                aviso: args.cod
            }, {
                $set: {
                    f_cierre: new Date(args.f_cierre),
                    estado: "C"
                }
            }));

        },

        closeParte: async(parent, args, { Partes }) => {
            var desplazamiento = {}
            console.log("cerrando parte")
            if (args.desplazamiento.km != undefined || args.desplazamiento.dietas != undefined) {
                var km = args.desplazamiento.km != undefined ? { km: args.desplazamiento.km } : { km: 0 };
                Object.assign(desplazamiento, km);
                var dietas = args.desplazamiento.dietas != undefined ? { dietas: args.desplazamiento.dietas } : { dietas: 0 };
                Object.assign(desplazamiento, dietas)
            }

            await Partes.updateOne({
                parte: args.parte
            }, {
                $set: {
                    f_cierre: new Date(args.f_cierre),
                    estado: "C",
                    desplazamiento: desplazamiento
                }
            });

        },

        newAviso: async(parent, args, { Avisos }) => {
            var n_aviso = await Avisos.find({}).sort({
                aviso: -1
            });

            n_aviso = n_aviso[0].aviso + 1;

            var Aviso = new Avisos(Object.assign(args.Aviso, { "aviso": n_aviso, estado: "A", fecha: Date.now() }));
            //  console.log(Aviso);
            await Aviso.save(Aviso)
        },

        newParte: async(parent, { Parte }, { Partes }) => {
            var n_parte = await Partes.find().sort({
                parte: -1
            });

            n_parte = parseInt(n_parte[0].parte) + 1;
            //console.log(n_parte);
            var ParteNew = new Partes(Object.assign(Parte, { "parte": n_parte, "estado": "A" }));

            //console.log(ParteNew);
            await ParteNew.save(ParteNew);

        },

        updateAviso: async(parent, args, { Avisos }) => {
            console.log(args)
            var update = await Avisos.updateOne({
                aviso: args.formulario.aviso
            }, {
                $set: args.formulario
            })
            console.log(update)
            return 1
        },


        newContrato: async(parent, { mantenimientoInput, bhorasInput }, { Contratos }) => {
            var n_contrato = await Aviso.find().sort({ contrato: -1 });
            n_contrato = n_contrato[0].contrato
            n_contrato = n_contrato + 1;

            if (mantenimientoInput != undefined || bhorasInput != undefined) {
                if (mantenimientoInput != undefined) {
                    contratoInptut = mantenimientoInput
                } else if (bhorasInput != undefined) {
                    contratoInput = bhorasInput
                }
                contratoInput.contrato = n_contrato;

                var contrato = new Contratos(contratoInptut);
                await contrato.save()
            }
        },

        modifyContrato: async(parent, { contrato, mantenimientoInput, bhorasInput }, { Contratos }) => {
            var contratoUpdate = mantenimientoInput != undefined ? mantenimientoInput : bhorasInput;
            Object.keys(contratoUpdate).forEach(key => obj[key] === undefined && delete obj[key]);

            return await Contratos.updateOne({ contrato: contrato }, {
                $set: contratoUpdate
            })

        },

        addVisita: async(parent, { record, contrato }, { Contratos }) => {
            //console.log(record)
            await Contratos.updateOne({ contrato: contrato }, { $addToSet: { 'visitas.record': record } });

            return 1
        },

        addBonoHoras: async(parent, { bono, contrato }, { Contratos, Avisos, Partes }) => {

            const cliente = await Contratos.findOne({
                contrato: contrato
            });

            const lastDate = cliente.record.reverse()[0] != undefined ? cliente.record.reverse()[0].fecha : new Date('1970-01-01Z00:00:00:000');

            const Horas_restantes = cliente.horas_m

            var avisos = await Avisos.find({
                contrato: "bhoras",
                cliente: cliente.cliente
            });

            var avisos = avisos.map(element => {
                return element.aviso
            })

            var partes = await Partes.find({
                aviso: { $in: avisos },
                f_apertura: { $gte: lastDate }
            });
            var horas_totales = partes
                .map(element => element.horas)
                .reduce((a, b) => a + b);


            const horas_m = Horas_restantes - horas_totales + bono.cantidad

            var record = {
                    fecha: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                    bono: bono,
                    representante: "enec",
                    horas_r: horas_m,
                }
                //console.log(record)
            await Contratos.update({ contrato: contrato }, { $addToSet: { record: record }, horas_m: horas_m });
            return 1
        },

        proyectoInput: async(parents, args, { Proyectos }) => {
            console.log(args.proyectos)
            var proyecto = new Proyectos(args.proyectos);

            var response = await proyecto.save();
            return response
        },

        task_proyectoInput: async(parents, { tarea }, { TaskProyectos }) => {
            var codigo = await TaskProyectos.findOne()
                .sort({ 'codigo': -1 })
                .limit(1);
            codigo = { "codigo": codigo.codigo + 1 };
            console.log(tarea);

            if (tarea.horas === undefined) {
                throw new UserInputError('Faltan las horas de la tarea')
            };
            const tarea_insert = Object.assign(codigo, tarea);
            console.log(tarea_insert);
            var task = new TaskProyectos(tarea_insert);
            var response = await task.save();
            return response
        }


    }
}