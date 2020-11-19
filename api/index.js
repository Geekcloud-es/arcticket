import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';

// Schema y Resolvers
import typeDefs from './schema';
import resolvers from './resolvers';

//Modelos
import Clientes from './models/Clientes';
import Usuarios from './models/Usuarios';
import Contratos from './models/Contratos';
import Contactos from './models/Contactos';
import Proyectos from './models/Proyectos';
import TaskProyectos from './models/task_proyectos';


var morgan = require('morgan');


const app = express();


mongoose.connect('mongodb://localhost/enecworld', {
        useNewUrlParser: true
    })
    .then(() => console.log('Conected'))
    .catch(err => console.log(err));



const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Avisos,
        Partes,
        Clientes,
        Usuarios,
        Contratos,
        Contactos,
        Proyectos,
        TaskProyectos
    },
    introspection: true,
    playground: {
        settings: {
            'editor.theme': 'dark',
            endpoint: `http://localhost:3200/api`,
        },
    }


});

SERVER.applyMiddleware({
    app,
    path: '/api'
});
// CORS
app.use(cors());
// settings
app.set('port', process.env.PORT || 3200);

// start the server
app.listen(app.get('port'), () => {
    console.log('Fire Up in', app.get('port'));
});


// Start Morgan
//app.use(morgan('combined'));