const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Boookware:998877665544332211@cluster0.cqwmocf.mongodb.net/?retryWrites=true&w=majority"

async function crearColleccionUsuario() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').createCollection(
            'usuarios', {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        title: 'usuarios',
                        required: ['idUsuario', 'idRol', 'nombreUsuario'],
                        properties: {
                            idUsuario: {
                                bsonType: 'number'
                            },
                            idRol: {
                                bsonType: 'int'
                            },
                            nombreUsuario: {
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
//crearColleccionUsuario();


async function crearUsuario() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const datosFakerRolUsuario = [];
        const idUsuarios = [];
        const idRoles = await obteneridRol();

        for (let i = 0; i < 3; i++) {
            let idUsuario;
            do {
                idUsuario = faker.number.int({ min: 1, max: 5000 });
            } while (idUsuarios.includes(idUsuario));
            idUsuarios.push(idUsuario);

            let idRol;
            do {
                idRol = faker.helpers.arrayElement(idRoles).idRol;
            } while (idRoles.includes(idRol));

            const nombreUsuario = faker.person.firstName();

            const datosInsertar = {
                idUsuario: idUsuario,
                idRol: idRol,
                nombreUsuario: nombreUsuario
            }
            datosFakerRolUsuario.push(datosInsertar);
            console.log('melo mi pai');
        }

        const resultado1 = await cliente.db('Bookware').collection('usuarios').insertMany(datosFakerRolUsuario);
        if (resultado1) {
            console.log('si se insertaron');
        } else {
            console.log('No se insertaron');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}




//crearUsuario();

async function crearUsuario2() {
    const cliente = new MongoClient(uri);
  
    try {
      await cliente.connect();
      const idRoles = await obteneridRol();
  
      let idUsuario;
      do {
        idUsuario = faker.number.int({ min: 1, max: 5000 });
      } while (await cliente.db('Bookware').collection('usuarios').findOne({ idUsuario: idUsuario }));
  
      let idRol;
      do {
        idRol = faker.helpers.arrayElement(idRoles).idRol;
      } while (idRoles.includes(idRol));
  
      const nombreUsuario = faker.person.firstName();
  
      const datosInsertar = {
        idUsuario: idUsuario,
        idRol: idRol,
        nombreUsuario: nombreUsuario
      };
  
      const resultado = await cliente.db('Bookware').collection('usuarios').insertOne(datosInsertar);
      if (resultado) {
        console.log('Se insertó el usuario correctamente');
      } else {
        console.log('No se pudo insertar el usuario');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }

 //crearUsuario2();

async function crearUsuario3() {
    const cliente = new MongoClient(uri);
  
    try {
      await cliente.connect();
      const idRoles = await obteneridRol();
  
      const idUsuario = 1; 
      const idRol = 1; 
      const nombreUsuario = 'John Doe';
  
      const datosInsertar = {
        idUsuario: idUsuario,
        idRol: idRol,
        nombreUsuario: nombreUsuario
      };
  
      const resultado = await cliente.db('Bookware').collection('usuarios').insertOne(datosInsertar);
      if (resultado) {
        console.log('Se insertó el usuario correctamente');
      } else {
        console.log('No se pudo insertar el usuario');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
//crearUsuario3();



// Eliminar usuario
async function eliminarUsuario(idUsuario) {
    const cliente = new MongoClient(uri);

    try {
        const resultado = await cliente.db('Bookware').collection('usuarios').deleteOne({ "idUsuario": idUsuario });
    } catch (e) {
        console.log(e);
    } finally {
        console.log('si elimino el rol');
        await cliente.close();
    }
}

//eliminarUsuario(2526);

// buscar usuario

async function buscarUsuario(idUsuario) {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('usuarios').aggregate([{
            $match: { idUsuario: idUsuario }
        }]).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//buscarUsuario(1774);


//ver usuario

async function verUsuario() {
    const cliente = new MongoClient(uri);

    try {
        const resultado = await cliente.db('Bookware').collection('usuarios').aggregate([{
            $lookup: {
                from: 'roles',
                localField: 'idRol',
                foreignField: 'idRol',
                as: 'rol'
            }
        }]).limit(5).toArray();
        console.log(JSON.stringify(resultado, null, 2))
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//verUsuario();



//actualizar usuario

async function actualizarUsuarios(idUsuario, atributoACambiar) {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('usuarios').updateOne({ idUsuario: idUsuario }, { $set: { nombreUsuario: atributoACambiar} }, { upsert: true });
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        console.log('Se actualizó el rol');
        cliente.close();
    }
}

//actualizarUsuario(1774, 'Gimena');


// buscar idRol

async function obteneridRol() {
    const rolCliente = new MongoClient(uri);

    try {
        await rolCliente.connect();

        const resultadoRol = await rolCliente.db('Bookware').collection('roles').find({}).project({ _id: 0, idRol: 1 }).toArray();
        return resultadoRol;
    } catch (e) {
        console.log(e);
    } finally {
        console.log('se han enviado los id')
        await rolCliente.close();
    }

}