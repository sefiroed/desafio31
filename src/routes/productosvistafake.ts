import { Router, Request, Response } from 'express';
import ProductosPersistencia from '../persistencia/productos';
import faker from 'faker';
import { publicPath } from '../services/server';
import path from 'path';
import { isLoggedIn } from '../middlewares/auth';


declare module 'express-session' {
	interface SessionData {
	  nombre?: string;
	  contador: number;
	}
}

const router = Router();
const miProducto = new ProductosPersistencia();
// let usuarios = [
// 	{ nombre: config.MONGO_ATLAS_USER, password: config.MONGO_ATLAS_PASSWORD },
// ];


router.get('/', isLoggedIn, (req: Request, res: Response) => {
	if (req.session.nombre) {
	  res.redirect('/datos');
	} else {
	  res.redirect('/login');
	}
});


/* --------- LOGIN ---------- */
router.get('/login', (req: Request, res: Response) => {
	res.sendFile(publicPath + '/login.html');
});


router.get('/register', (req: Request, res: Response) => {
	const registerPath = path.resolve(__dirname, '/public/index.html');
	res.sendFile(publicPath + registerPath);
});


router.post('/register', (req: Request, res: Response) => {
	
	  res.render('register-error', {});
	
});


// router.get('/logout', (req: Request, res: Response) => {
// 	req.session.destroy((data) => {
// 	  res.redirect('/');
// 	});
// });


router.get('/vista', (req: Request, res: Response) => {
	miProducto.leer().then((data) => {
		const datosDinamicos = { 
			productos: data
		}
		console.log(datosDinamicos);
		res.render('main', datosDinamicos);
	})
}); 

router.get('/vista-test', (req: Request, res: Response) => {
	const productosFaker = []
	let { noProductos } = req.query

	if(!noProductos){
		noProductos = "10"
	}

	for(let i =0; i<Number(noProductos); i++){
		productosFaker.push({
				nombre: faker.commerce.productName(),
				precio: faker.commerce.price(),
				url: faker.image.imageUrl()
		})
	}

	const productosDinamicos = {
		productos: productosFaker
	}
	res.render('main', productosDinamicos);

});   

export default router;