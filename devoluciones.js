const {faker}=require('@faker-js/faker');
const {MongoClient}=require('mongodb');

const uri= "mongodb+srv://Boookware:998877665544332211@cluster0.cqwmocf.mongodb.net/?retryWrites=true&w=majority"

async function crearColeccionDevolucion(){
    const cliente = new MongoClient(uri);

    try{
        await cliente.connect();
        const resultado = await cliente.db('Bookware').createCollection(
            'devoluciones',{
            validator:{
                $jsonSchema:{
                    bsonType:'object',
                    title:'devolucionPrestamoLibros',
                    required:['idDevolucion','fechaDevolucion','observaciones'],
                    properties:{
                        idDevolucion:{
                            bsonType:'number'
                        },
                        // idPrestamo:{
                        //     bsonType:'int'
                        // },
                        // idPeticion:{
                        //     bsonType:'int'
                        // },
                        fechaDevolucion:{
                            bsonType:"date"
                        },
                        observaciones:{
                            bsonType:"string"
                        }
                    }
                }
            }
        })
        if(resultado){
            console.log("Coleccion creada");
        }else{
            console.log("Paila pa")
        }
    }catch(e){
        console.log(e);
    }finally{
        await cliente.close();
    }
}

//crearColeccionDevolucion();

//crear Devolucion

async function crearDevolucion(){
    const devolucionCliente= new MongoClient(uri);

    try{
    await devolucionCliente.connect();
    const datosFakerDevoluciones=[];
    const idDevoluciones=[];
    // const idPeticiones= await obtenerIdPeticion();
    // const idPrestamos= await obtenerIdPrestamos();

    const fechaActual = new Date();
    const diaActual= fechaActual.getDate();
    const mesActual= (fechaActual.getMonth()+1);
    const añoActual= fechaActual.getFullYear();

    for (let i=0; i<1;i++){
    

        do{
            var idDevolucion=faker.number.int({min:1,max:5000});
        }while(idDevoluciones.includes(idDevolucion));

        idDevoluciones.push(idDevolucion);

        // do{
        //     var idPrestamo = faker.helpers.arrayElement(idPrestamos).idPrestamo;
        // }while(idPrestamos.includes(idPrestamo));


        // do{
        //     var idPeticion = faker.helpers.arrayElement(idPeticiones).idPeticion;
        // }while(idPeticiones.includes(idPeticion));

        const fechaDevolucion= faker.date.between({from:`${añoActual}-${mesActual}-${diaActual}`},{to:`${añoActual}-12-31`});

        const observaciones= faker.helpers.arrayElement(['Material en buen estado','Material con modificaciones','Material en mal estado']);

        const datosInsertar={
            idDevolucion:idDevolucion,
            // idPrestamo:idPrestamo,
            // idPeticion:idPeticion,
            fechaDevolucion:fechaDevolucion,
            observaciones:observaciones
        }
        datosFakerDevoluciones.push(datosInsertar);
        console.log('melo mi pai');
    }

    const resultado1= await devolucionCliente.db('Bookware').collection('devoluciones').insertMany(datosFakerDevoluciones);
    if(resultado1){
    console.log('si se insertaron');
    
    }else{
        console.log('No se insertaron')
    }

    }catch(e){
        console.log(e);
    }finally{
        await devolucionCliente.close();
    }
}

//crearDevolucion();

async function crearDevolucion2() {
    const devolucionCliente = new MongoClient(uri);
  
    try {
      await devolucionCliente.connect();

    const fechaActual = new Date();
    const diaActual= fechaActual.getDate();
    const mesActual= (fechaActual.getMonth()+1);
    const añoActual= fechaActual.getFullYear();
  
      const idDevolucion = faker.number.int({ min: 1, max: 5000 });
      const fechaDevolucion= faker.date.between({from:`${añoActual}-${mesActual}-${diaActual}`},{to:`${añoActual}-12-31`});
      const observaciones = faker.helpers.arrayElement(['Material en buen estado', 'Material con modificaciones', 'Material en mal estado']);
  
      const datosInsertar = {
        idDevolucion: idDevolucion,
        fechaDevolucion: fechaDevolucion,
        observaciones: observaciones
      };
  
      const resultado = await devolucionCliente.db('Bookware').collection('devoluciones').insertOne(datosInsertar);
  
      if (resultado) {
        console.log('Se insertó la devolución correctamente');
      } else {
        console.log('No se pudo insertar la devolución');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await devolucionCliente.close();
    }
  }

  //crearDevolucion2();  

async function crearDevolucion3() {
    const devolucionCliente = new MongoClient(uri);
  
    try {
      await devolucionCliente.connect();

    const idDevolucion= 1;
    const fechaDevolucion = "2025-01-23T01:26:00.198Z"; 
    const observaciones = "Material en material"
  
      const datosInsertar = {
        idDevolucion: idDevolucion,
        fechaDevolucion: fechaDevolucion,
        observaciones: observaciones
      };
  
      const resultado = await devolucionCliente.db('Bookware').collection('devoluciones').insertOne(datosInsertar);
  
      if (resultado) {
        console.log('Se insertó la devolución correctamente');
      } else {
        console.log('No se pudo insertar la devolución');
      }
    } catch (e) {
      console.log(e);
    } finally {
      await devolucionCliente.close();
    }
  }

  //crearDevolucion3();
  

// Eliminar devolucion
async function eliminarDevolucion(idDevolucion){
    const cliente = new MongoClient(uri);

    try{
        const resultado = await cliente.db('Bookware').collection('devoluciones').deleteOne({"idDevolucion":idDevolucion});
    }catch(e){
        console.log(e);
    }finally{
        console.log('si elimino la devolucion');
        await cliente.close();    
    }
}

//eliminarDevolucion(1281);

// buscar Devolucion

async function buscarDevolucion(idDevolucion){
    const cliente = new MongoClient(uri);

    try{
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('devoluciones').aggregate([{
            $match:{idDevolucion:idDevolucion}
        }]).toArray();
        console.log(resultado);
    }catch(e){
        console.log(e);
    }finally{
        await cliente.close();
    }
}

//buscarDevolucion(2288);

//ver Devolucion

async function verDevoluciones(){
    const cliente = new MongoClient(uri);

    try{
        const resultado = await cliente.db('Bookware').collection('devoluciones').aggregate([
            {
                $lookup:{
                    from: 'roles',
                    localField: 'idRol',
                    foreignField: 'idRol',
                    as:'prestamo'
                }
            }
        ]).limit(5).toArray();
        console.log(JSON.stringify(resultado,null,2))
    }catch(e){
        console.log(e);
    }finally{
        await cliente.close();
    }
}
//verDevoluciones();


//actualizar Devolucion

async function actualizarDevolucion(idDevolucion, atributoACambiar) {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Bookware').collection('devoluciones').updateOne(
            { idDevolucion: idDevolucion },
            { $set: { fechaDevolucion: new Date(atributoACambiar) } },
            { upsert: true }
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        console.log('Se actualizó la devolución');
        cliente.close();
    }
}

//actualizarDevolucion(2288, "2023-01-23T01:25:00.198Z");


// buscar idPrestamo

// async function obtenerIdPrestamos(){
//     const prestamoCliente = new MongoClient(uri);

//     try{
//         await prestamoCliente.connect();

//         const resultadoPrestamo = await prestamoCliente.db('Bookware').collection('prestamos').find({}).project({_id:0,idPrestamo:1}).toArray();
//         return resultadoPrestamo;
//     }catch(e){
//         console.log(e);
//     }finally{
//         console.log('se han enviado los id')
//         await prestamoCliente.close();
//     }
    
// }

// // buscar idPeticion

// async function obtenerIdPeticion(){
//     const peticionCliente = new MongoClient(uri);

//     try{
//         await peticionCliente.connect();
//         const resultadoPeticion= await peticionCliente.db('Bookware').collection('peticiones').find({}).project({_id:0,idPeticion:1}).toArray();
//         return resultadoPeticion;
//     }catch(e){
//         console.log(e);
//     }finally{
//         console.log('Se han enviado los id')
//         await peticionCliente.close();
//     }
// }