const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Boookware:998877665544332211@cluster0.cqwmocf.mongodb.net/?retryWrites=true&w=majority"

async function crearColeccionRoles() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').createCollection(
            'roles', {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        title: 'rolesusuarios',
                        required: ['idRol', 'idDevolucion', 'nombreRol'],
                        properties: {
                            idRol: {
                                bsonType: 'number'
                            },
                            idDevolucion: {
                                bsonType: 'int'
                            },
                            nombreRol: {
                                bsonType: 'string'
                            }
                        }
                    }
                }
            })
        if (resultado) {
            console.log("Coleccion creada");
        } else {
            console.log("Paila pa")
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearColeccionRoles();


//crear Rol

async function crearRol() {
    const rolUsuario = new MongoClient(uri);

    try {
        await rolUsuario.connect();
        const datosFakerRolUsuario = [];
        const idRoles = [];
        const idDevoluciones = await obtenerIdDevolucion();
        const nombreRol = [];
        for (let i = 0; i < 3; i++) {
            do {
                var idRol = faker.number.int({ min: 1, max: 5000 });
            } while (idRoles.includes(idRol));
            idRoles.push(idRol);

            do {
                var idDevolucion = faker.helpers.arrayElement(idDevoluciones).idDevolucion;
            } while (idDevoluciones.includes(idDevolucion));

            idDevoluciones.push(idDevolucion);

            const nombreRol = faker.helpers.arrayElement(['Usuario', 'Administrador', 'Alfabetizador']);

            const datosInsertar = {
                idRol: idRol,
                idDevolucion: idDevolucion,
                nombreRol: nombreRol
            }
            datosFakerRolUsuario.push(datosInsertar);
            console.log('melo mi pai');
        }

        const resultado1 = await rolUsuario.db('Bookware').collection('roles').insertMany(datosFakerRolUsuario);
        if (resultado1) {
            console.log('si se insertaron');

        } else {
            console.log('No se insertaron')
        }

    } catch (e) {
        console.log(e);
    } finally {
        await rolUsuario.close();
    }
}

//crearRol();

async function crearRol2() {
    const cliente = new MongoClient(uri);
  
    try {
      await cliente.connect();
      const idRoles = [];
      const idDevoluciones = await obtenerIdDevolucion();
      const nombreRol = faker.helpers.arrayElement(['Usuario', 'Administrador', 'Alfabetizador']);
  
      let idRol;
      do {
        idRol = faker.number.int({ min: 1, max: 5000 });
      } while (idRoles.includes(idRol));
  
      let idDevolucion;
      do {
        idDevolucion = faker.helpers.arrayElement(idDevoluciones).idDevolucion;
      } while (idDevoluciones.includes(idDevolucion));
  
      const datosInsertar = {
        idRol: idRol,
        idDevolucion: idDevolucion,
        nombreRol: nombreRol
      };
  
      const resultado = await cliente.db('Bookware').collection('roles').insertOne(datosInsertar);
      if (resultado) {
        console.log('Se insertó el rol correctamente');
      } else {
        console.log('No se pudo insertar el rol');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  



  

//crearRol2();


async function crearRol3() {
    const cliente = new MongoClient(uri);
  
    try {
      await cliente.connect();
      const idRol= 23;
      const idDevolucion=23;
      const nombreRol="javier"
  
      const datosInsertar = {
        idRol: idRol,
        idDevolucion: idDevolucion,
        nombreRol: nombreRol
      };
  
      const resultado = await cliente.db('Bookware').collection('roles').insertOne(datosInsertar);
      if (resultado) {
        console.log('Se insertó el rol correctamente');
      } else {
        console.log('No se pudo insertar el rol');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  
//crearRol3();



// Eliminar Rol
async function eliminarRol(idRol) {
    const cliente = new MongoClient(uri);

    try {
        const resultado = await cliente.db('Bookware').collection('roles').deleteOne({ "idRol": idRol });
    } catch (e) {
        console.log(e);
    } finally {
        console.log('si elimino el rol');
        await cliente.close();
    }
}

//eliminarRol(1965);

// buscar Rol

async function buscarRol(idRol) {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('roles').aggregate([{
            $match: { idRol: idRol }
        }]).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//buscarRol(273);


//ver Rol

async function verRol() {
    const cliente = new MongoClient(uri);

    try {
        const resultado = await cliente.db('Bookware').collection('roles').aggregate([{
            $lookup: {
                from: 'devoluciones',
                localField: 'idDevolucion',
                foreignField: 'idDevolucion',
                as: 'devolucion'
            }
        }]).limit(5).toArray();
        console.log(JSON.stringify(resultado, null, 2))
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//verRol();



//actualizar Rol

async function actualizarRol(idRol, atributoACambiar) {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('roles').updateOne({ idRol: idRol }, { $set: { nombreRol: atributoACambiar} }, { upsert: true });
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        console.log('Se actualizó el rol');
        cliente.close();
    }
}

//actualizarRol(273, 'Estudiante');


// buscar idDevolucion

async function obtenerIdDevolucion() {
    const devolucionCliente = new MongoClient(uri);

    try {
        await devolucionCliente.connect();

        const resultadoDevolucion = await devolucionCliente.db('Bookware').collection('devoluciones').find({}).project({ _id: 0, idDevolucion: 1 }).toArray();
        return resultadoDevolucion;
    } catch (e) {
        console.log(e);
    } finally {
        console.log('se han enviado los id')
        await devolucionCliente.close();
    }

}