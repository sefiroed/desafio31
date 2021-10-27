import express from 'express';
import mainRouter from '../routes';
import session from 'express-session';
import passport from '../middlewares/auth';
import path from 'path';
import exphbs from 'express-handlebars';

const app = express();

app.use(express.json());

app.use(
  session({
    secret: 'your secret line of secretness',
    resave: true,
    saveUninitialized: true,
  })
);

export const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.use(passport.initialize());
app.use(passport.session());

const viewsPath = path.resolve(__dirname, '../../views');
const layoutDirPath = viewsPath + '/layouts';
const defaultLayerPth = viewsPath + '/layouts/main.hbs';
const partialDirPath = viewsPath + '/partials';

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

// Este middleware se pone para ejemplo solamente.
app.use((req, res, next) => {

  console.log(`REQ.SESSION =>\n${JSON.stringify(req.session)}`);

  console.log(`REQ.USER =>\n${JSON.stringify(req.user)}`);

  console.log(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`);

  next();
});

app.use('/api', mainRouter);

export default app;
