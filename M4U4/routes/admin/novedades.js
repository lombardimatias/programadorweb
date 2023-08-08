var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');



router.get('/', async function(req, res, next) {

var novedades = await novedadesModel.getNovedades();

//imprime en el hbs estos datos
  res.render('admin/novedades',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades

  }); 
});


//para eliminar novedades

router.get('/eliminar/:id', async (req, res, next) => {

 const id = req.params.id; //2
 await novedadesModel.deleteNovedadesById(id);
 res.redirect('/admin/novedades')
  
  
  }); //cierra el get de eliminar


//aca vemos vista de agregar.hbs (get)

router.get ('/agregar', (req, res, next) => {

  res.render('admin/agregar',{ //agregar.hbs (dentro del admin)
    layout: 'admin/layout'
  }); 
});


//insertar la novedad, se guarde en la base de datos y lo muestre en el listado

router.post ('/agregar',  async (req, res, next)=> {

try{

  if(req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo != ""){
    await novedadesModel.insertNovedad (req.body);
    res.redirect('/admin/novedades')
  } else{
    res.render('admin/agregar',{ 
      layout: 'admin/layout',
      error: true, 
      message: 'Todos los campos son requeridos '
    }); 
  }

}  catch{
  console.log(error)
  res.render('admin/agregar',{ 
    layout: 'admin/layout',
    error: true, 
    message: 'No se cargo la novedad '
});

}

});

/*creamos el controlador de ruta necesario para imprimir el formulario de modificación. Esta ruta tiene 
la particularidad, al igual que la de eliminar, de recibir como parámetro el id de la
novedad. Este id se utilizara para llamar a la función previamente creada y pasar la
novedad seleccionada al template*/

router.get ('/modificar/:id', async (req, res, next) => {

  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById (id);
  res.render('admin/modificar',{ 
    layout: 'admin/layout',
    novedad
  });
});


/*
En el archivo routes/admin/novedades.js creamos el controlador encargado de
recibir los datos del formulario y pasarlos a la función de model para efectuar la
modificación de la novedad en la base de datos.
En caso de éxito redirigimos al usuario al listado de novedades, de lo contrario
enviamos una variable de error y el mensaje describiendo el mismo

*/
router.post ('/modificar',  async (req, res, next)=> {

  try{
      let obj= {

          titulo: req.body.titulo,
          subtitulo: req.body.subtitulo,
          cuerpo: req.body.cuerpo
      }
      await novedadesModel.modificarNovedadById(obj, req.body.id);
      res.redirect('/admin/novedades');
  
  }  catch{
    console.log(error)
    res.render('admin/modificar',{ 
      layout: 'admin/layout',
      error: true, 
      message: 'No se modifico la novedad '
  });
  
  }
  
  });


module.exports = router;
