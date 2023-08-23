var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


//lista novedades
router.get('/', async function(req, res, next) {

//var novedades = await novedadesModel.getNovedades();



var novedades 

if (req.query.q === undefined) {

  novedades = await novedadesModel.getNovedades ();

}
else {
  novedades = await novedadesModel.buscarNovedades(req.query.q);
}


novedades = novedades.map (novedad =>{

  if(novedad.img_id){

      const imagen = cloudinary.image (novedad.img_id, {
          width:50,
          height: 50,
          crop: 'fill'

      });
      return {
        ...novedad, //trae titulo, subtitulo y cuerpo
        imagen //trae imagen
      }
  } else {
    return {
      ...novedad, //trae titulo, subtitulo y cuerpo
      imagen:``
    }
  }

});


//imprime en el hbs estos datos
  res.render('admin/novedades',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades,
    is_search: req.query.q !== undefined,
    q: req.query.q

  }); 
});


//para eliminar novedades

router.get('/eliminar/:id', async (req, res, next) => {

 const id = req.params.id; //2

 let novedad = await novedadesModel.getNovedadById(id);
        if (novedad.img_id) {
          await(destroy(novedad.img_id));
        }


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

  var img_id = '';
  if (req.files && Object.keys (req.files).length>0){
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
  }


  if(req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo != "") {
  
    await novedadesModel.insertNovedad ({

        ...req.body, //trae titulo, subtitulo y cuerpo
        img_id

    });

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

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if( req.body.img_delete === "1") {
      img_id="null";
      borrar_img_vieja = "true";

    }
      else{
        if (req.files && Object.keys (req.files).length>0){
          imagen = req.files.imagen;
          img_id = (await uploader(imagen.tempFilePath)).public_id;
          borrar_img_vieja = "true";
    }
  
      }
      if (borrar_img_vieja && req.body.img_original) {
      await (destroy (req.body.img_original));
      
  
    }


      let obj= {

          titulo: req.body.titulo,
          subtitulo: req.body.subtitulo,
          cuerpo: req.body.cuerpo,
          img_id
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
