import { Producto } from '../interfaces/interfaces';
import {productsSchema} from '../schema/productschema';

/*Creamos nuestra clase con los metodos a utilizar 
en la carpeta index.js*/

class ProductosPersistencia {
  
  async leer() {
    const producto = await productsSchema.find();
    return producto;
  }
  async leerPorId(id:any) {
    try{
      const producto = await productsSchema
      .findOne({ _id: id });
      return producto;
    }catch(error){
      console.log('Producto no encontrado');
    }
  }
  async guardar(nombre:string,precio:number,url:string) {
    const element: Producto = {
      nombre: nombre,
      precio: precio,
      url: url
    };

    try {
      if (typeof nombre !== 'string')
        throw new Error('nombre tiene que ser string');
      if (isNaN(precio)) throw new Error('precio tiene que ser un numero');
      if (typeof url !== 'string')
        throw new Error('url tiene que ser string de url');

      
      const newProduct = new productsSchema(element);
      return await newProduct.save();
    } catch (error) {
      console.log('ERROR: No se pudo agregar el producto. ' + error);
    }    
  }

  async actualizar(dato:any, id:any){

    try {
      if (typeof dato.nombre !== 'string')
        throw new Error('nombre tiene que ser string');
      if (typeof dato.precio !== 'number')
        throw new Error('precio tiene que ser un numero');
      if (typeof dato.url !== 'string')
        throw new Error('url tiene que ser string de url');

        const producto = {
          nombre: dato.nombre,
          precio: dato.precio,
          url: dato.url
        }; 

      // const data = { nombre, precio, url };
      return await productsSchema.updateOne({ _id: id }, { $set: producto });
    } catch (error) {
      console.log(error);
    }
  }

  async borrar(id:any) {
    try {
      return await productsSchema.deleteOne({ _id: id });
    } catch (error) {
      console.log('Producto no encontrado');
    }
  } 

  async query(query: object) {
    return await productsSchema.find(query);
  }
    
}


export default ProductosPersistencia;
