const express = require('express');
const cors = require('cors');
const { sequelize, Producto, Usuario } = require('./src/database');
const md5 = require('md5');
const { where } = require('sequelize');
const { error, each } = require('jquery');

const app = express();
app.use(express.json());
app.use(cors());

// Crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.create({ nombre, descripcion, precio });
  res.json(producto);
});

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
});

// Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.findByPk(req.params.id);
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  await producto.save();
  res.json(producto);
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  await producto.destroy();
  res.json({ message: 'Producto eliminado' });
});


app.post('/api/usuarios', async (req, res) => {
  const { usuario,contraseña } = req.body;
  const hashPassword = md5(contraseña)
  const newUsuario = await Usuario.create({usuario,contraseña:hashPassword });
  res.json(newUsuario);
});

app.post('/api/usuarios/iniciarSesion', async (req, res) => {
  const { usuario,contraseña } = req.body;
  const hashPassword = md5(contraseña)
  const usuarioLogin = await Usuario.findAll({
    where:{
      usuario:usuario,
      contraseña:hashPassword
    }
  });
  if(usuarioLogin[0]!=undefined){
    res.json({acceso:true,data:usuarioLogin})
  }
  else{
    res.json({acceso:false,data:usuarioLogin})
  }
});

app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes:['id','usuario']
  })
  res.json(usuarios);
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});


