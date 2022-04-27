const express = require("express");
const cors = require("cors");
const mdwRoute = require("../middlewares/mdw_url");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.productosPath = "/api/productos";
    this.carritoPath = "/api/carrito";

    //Conectar la base de datos para
    this.conexDB();
    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conexDB() {
    await dbConnection(process.env.DB);
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.productosPath, require("../routes/productosSQL"));
    this.app.use(this.carritoPath, require("../routes/carritoSQL"));
    this.app.use(mdwRoute.ruta_invalida);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
