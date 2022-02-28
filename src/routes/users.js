var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.get('/register',usersController.register);

router.post('/register',upload.single('imagenUsuario'), usersController.store);



module.exports = router;
