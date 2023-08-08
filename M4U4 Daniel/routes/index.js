var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/', async(req,res,next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;
  var apellido = req.body.apellido;

  var obj ={
    to: 'daniel_duda93@gmail.com',
    subject: 'contacto web',
    html: nombre + " " + apellido +  " se contacto a través de la web y quiere mas información a este correo: " + email + ". <br> además, hizo este comentario : " + mensaje + ". <br> su tel es: "+ tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente'
  });
});

module.exports = router;
