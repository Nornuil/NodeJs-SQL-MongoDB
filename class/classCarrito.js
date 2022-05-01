const { Productos } = require("../class/classProductos");
const knex = require("knex");

const dbOptions2 = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    database: "ecommerce",
    user: "root",
    password: "cejudo2868",
    port: 3306,
  },
  pool: { min: 0, max: 7 },
};

const manejadorProductos = new Productos();

class Carrito {
  constructor() {
    this.knex = knex(dbOptions2);
    this.table = "carrito";
  }

  async getAll() {
    try {
      const contenido = await this.knex(this.table);
      return contenido;
    } catch (err) {
      return `Error: ${err} ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async new() {
    try {
      const contenido = await this.knex(this.table).insert({
        productos: "",
      });
      return contenido[0];
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.knex
        .from(this.table)
        .where("id", parseInt(id))
        .del();
      return contenido === 0
        ? `Carrito con id: ${id} no existe`
        : `Carrito con id: ${id} borrado`;
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async addProduct(idCarrito, producto) {
    if (await manejadorProductos.isExist(producto.id)) {
      const listaCarritos = await this.getAll();
      let index = listaCarritos.findIndex((carrito) => carrito.id == idCarrito);
      if (index == -1) {
        return false;
      } else {
        await this.knex
          .from(this.table)
          .where("id", parseInt(idCarrito))
          .update("productos", producto);
        return true;
      }
    } else {
      return false;
    }
  }

  async lessProduct(idCarrito, idProducto) {
    const listaCarritos = await this.getAll();
    let indexCarrito = listaCarritos.findIndex(
      (carrito) => carrito.id == idCarrito
    );
    if (indexCarrito == -1) {
      return false;
    } else {
      if (
        listaCarritos[indexCarrito].productos != "" &&
        JSON.parse(listaCarritos[indexCarrito].productos).id != idProducto
      ) {
        await this.knex
          .from(this.table)
          .where("id", parseInt(idCarrito))
          .update("productos", "");
        return true;
      } else {
        return false;
      }
    }
  }
}

module.exports = { Carrito };
