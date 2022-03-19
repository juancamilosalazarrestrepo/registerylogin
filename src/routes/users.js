var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let logDBMiddleware = require('../../middlewares/logDBMiddleware');

// llamando a express validator

const {body} = require ('express-validator');

// validaciones
const validacioneslogin = [
  body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('email').notEmpty().withMessage('debes Ingresar un correo').bail()
  .isEmail().withMessage('debes escribir un formato de correo valido'),
  body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
  body('age').notEmpty().withMessage('debes ingresar tu edad'),
  body('country').notEmpty().withMessage('Debes escoje un pais'),
  body('imagenUsuario').custom((value,{req}) => {
    let file = req.file;
    let acceptedExtensions = [ '.jpg','.png','.gif'];


    if (!file) {
      throw new Error('Tienes que subir una imagen')
    }else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}`);
      }

    }
    
    return true;
  })

]

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,path.resolve(__dirname,'../../public/images'))
  },
  filename:(req,file,cb)=>{
    console.log(file);
    const newFilename='user-'+ Date.now() + path.extname(file.originalname);
    cb(null,newFilename);
  }
});

const upload = multer({ storage });

/* GET users listing. */
router.get('/', usersController.users);

router.get('/register' ,usersController.register);

router.post('/register',upload.single('imagenUsuario'),validacioneslogin, usersController.store);



module.exports = router;
