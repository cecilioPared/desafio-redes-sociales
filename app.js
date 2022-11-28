import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import hbs from "hbs";

import router from './routers/index.js'
import viewRouter from "./routers/view.js";
import { init } from './db/mongodb.js'
import UserModel from './models/user.js'
import { isValidPassword } from './utils/handleEncrypt.js'

await init()

const app = express()

passport.use('sign-in', new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false)
      }
      if (!isValidPassword(password, user.password)) {              
        return done(null, false)
      }
      done(null, user)
    })
    .catch(error => {      
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then(user => done(null, user))
    .catch(done)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", hbs.__express);

app.use(cookieParser("3!$H4s5K36#s"));
app.use(session({
  secret: '3!$H4s5K36#s',
  resave: false, 
  saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use("/", viewRouter)

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));