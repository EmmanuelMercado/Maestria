<template>
  <div v-if="isLogin == true">
    <div class="container my-5">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <button type="button" class="btn btn-primary" @click="home">Home</button>
          <button type="button" class="btn btn-primary" @click="crearUsuario">Crear usuario</button>
          <button type="button" class="btn btn-primary" @click="modificarUsuario">Modificar usuario</button>
          <button type="button" class="btn btn-danger" @click="cerrarSesion">Cerrar sesión</button>

        </div>
      </nav>
      <div v-if="route == 'home'">
        <h1 class="mb-5">Bienvenido {{ usuario }}</h1>
        <h2 class="mb-5">Gestión de Productos</h2>



        <!-- Formulario para crear un nuevo producto -->
        <div class="card mb-5">
          <div class="card-body">
            <h2 class="card-title">Crear Nuevo Producto</h2>
            <form @submit.prevent="crearProducto">
              <div class="mb-3">
                <label for="nombreProducto" class="form-label">Nombre</label>
                <input id="nombreProducto" v-model="nuevoProducto.nombre" type="text"
                  placeholder="Introduce el nombre del producto" class="form-control">
              </div>
              <div class="mb-3">
                <label for="descripcionProducto" class="form-label">Descripción</label>
                <input id="descripcionProducto" v-model="nuevoProducto.descripcion" type="text"
                  placeholder="Introduce una descripción" class="form-control">
              </div>
              <div class="mb-3">
                <label for="precioProducto" class="form-label">Precio</label>
                <input id="precioProducto" v-model="nuevoProducto.precio" type="number" placeholder="Precio en dólares"
                  class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>

        <!-- Tabla de listado de productos -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.descripcion }}</td>
              <td>${{ producto.precio }}</td>
              <td>
                <button @click="editarProducto(producto)" class="btn btn-sm btn-info mr-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="eliminarProducto(producto.id)" class="btn btn-sm btn-danger">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal para editar un producto existente -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
          aria-hidden="true" v-if="productoEditando">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar" @click="cancelarEdicion">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="guardarProducto">
                  <div class="mb-3">
                    <label for="editNombre" class="form-label">Nombre</label>
                    <input id="editNombre" v-model="productoEditando.nombre" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="editDescripcion" class="form-label">Descripción</label>
                    <input id="editDescripcion" v-model="productoEditando.descripcion" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="editPrecio" class="form-label">Precio</label>
                    <input id="editPrecio" v-model="productoEditando.precio" type="number" class="form-control">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                  @click="cancelarEdicion">Cerrar</button>
                <button type="submit" class="btn btn-success" @click="guardarProducto">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="route=='agregarUsuario'" class="containerCrearUsuario">
        <div class="formLogin">
          <div class="mb-3">
            <label for="Usuario" class="form-label">Nuevo Usuario</label>
            <input id="Usuario" type="text" class="form-control" placeholder="Ingrese su usuario" v-model="newUsuario">
          </div>
          <div class="mb-3">
            <label for="Password" class="form-label">Password</label>
            <input id="Password" type="password" class="form-control" placeholder="Ingrese su contraseña"
              v-model="newPassword">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="agregarUsuario">Ingresar</button>
          </div>

        </div>
      </div>
      <div v-if="route=='modificarUsuario'">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown" aria-expanded="false">
            Selecciona usuario a modificar
          </button>
          <template>
            <div>
              <select v-model="usuarioSeleccionado">
                <option disabled value="">Seleccione un usuario</option>
                <option v-for="user in listaUsuarios.data" :key="user.id" :value="user.id">
                  
                </option>
              </select>
              
            </div>
          </template>
        </div>
        <!-- <p>{{ listaUsuarios.data[0].usuario }}</p> -->
      </div>

    </div>

  </div>
  <div v-if="isLogin == false" class="containerLogin">
    <div class="formLogin">
      <div class="mb-3">
        <label for="Usuario" class="form-label">Usuario</label>
        <input id="Usuario" type="text" class="form-control" placeholder="Ingrese su usuario" v-model="usuario">
      </div>
      <div class="mb-3">
        <label for="Password" class="form-label">Contraseña</label>
        <input id="Password" type="password" class="form-control" placeholder="Ingrese su contraseña"
          v-model="password">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="iniciarSesion">Ingresar</button>
      </div>

    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap';


export default {
  data() {
    return {
      isLogin: false,
      usuario: "",
      password: "",
      newUsuario: "",
      newPassword: "",
      listaUsuarios: [],
      usuarioSeleccionado:"",
      idUsuarioSeleccionado:"",
      route: "home",
      productos: [],
      nuevoProducto: {
        nombre: '',
        descripcion: '',
        precio: '',
      },
      productoEditando: null,
      modalInstance: null,  // Referencia al objeto Modal
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    home(){
      this.route = "home"
    },
    async modificarUsuario(){
      try {
        
        this.listaUsuarios = await this.$http.get('http://localhost:3000/api/usuarios')
        this.route = "modificarUsuario"
        console.log(this.listaUsuarios);
      } catch (error) {
        console.log(error);
      }
     
    },
    crearUsuario(){
      this.route= "agregarUsuario"
    },
    async iniciarSesion() {
      const usuario = this.usuario
      const password = this.password
      let bodyUsuario = { usuario, contraseña: password }
      console.log(bodyUsuario);
      try {
        const respuesta = await this.$http.post('http://localhost:3000/api/usuarios/iniciarSesion', bodyUsuario)
        if (respuesta.data.acceso == true) {
          this.isLogin = true
          this.route = "home"
        }
        else {
          alert("Credenciales incorrectas")
        }
      } catch (error) {
        console.log(error);
      }
    },
    async agregarUsuario() {
      const usuario = this.newUsuario
      const password = this.newPassword
      let bodyUsuario = { usuario, contraseña: password }
      
      try {
        await this.$http.post('http://localhost:3000/api/usuarios', bodyUsuario)
        alert("Usuario Agregado")

      } catch (error) {
        console.log(error);
      }
    },
    cerrarSesion() {
      this.isLogin = false
    },
    async obtenerProductos() {
      try {
        const respuesta = await this.$http.get('http://localhost:3000/api/productos');
        this.productos = respuesta.data;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    async crearProducto() {
      try {
        const respuesta = await this.$http.post('http://localhost:3000/api/productos', this.nuevoProducto);
        this.productos.push(respuesta.data);
        this.nuevoProducto = { nombre: '', descripcion: '', precio: '' };
      } catch (error) {
        console.error('Error al crear producto:', error);
      }
    },
    editarProducto(producto) {

      this.productoEditando = null;
      this.productoEditando = producto;
      this.modalInstance = null;

      this.$nextTick(() => {
        if (!this.modalInstance) {
          const modalElement = document.getElementById('editModal');
          if (modalElement) {
            this.modalInstance = new Modal(modalElement);
          }
        }
        if (this.modalInstance) {
          this.modalInstance.show();
        }
      });
    },
    async guardarProducto() {
      try {
        const respuesta = await this.$http.put(`http://localhost:3000/api/productos/${this.productoEditando.id}`, this.productoEditando);
        const index = this.productos.findIndex(p => p.id === respuesta.data.id);
        this.productos.splice(index, 1, respuesta.data);
        this.productoEditando = null;
        this.modalInstance.hide();

      } catch (error) {
        console.error('Error al guardar cambios:', error);
      }
    },
    cancelarEdicion() {
      this.productoEditando = null;
      this.modalInstance.hide();
    },
    async eliminarProducto(id) {
      try {
        await this.$http.delete(`http://localhost:3000/api/productos/${id}`);
        this.productos = this.productos.filter(p => p.id !== id);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    },
  },
};
</script>

<style scoped>
.modal-header {
  justify-content: space-between !important;
}

.container {
  max-width: 800px;
  /* Limita el ancho para una lectura más cómoda */
}

.card {
  background: #f8f9fa;
  border: 1px solid #e1e4e8;
}

.form-label {
  font-weight: bold;
}

.modal-backdrop.show {
  /* Este estilo asegura que el fondo se difumine cuando el modal esté activo */
  opacity: 0.5 !important;
}

.containerLogin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.formLogin {
  width: 20vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10%;
  flex-direction: column;
  text-align: center;

}

.containerCrearUsuario{
  display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 70vh;
}
</style>
