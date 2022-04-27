const knex = require("knex");

class Productos {
  constructor(dbOptions, table) {
    this.knex = knex(dbOptions);
    this.table = table;
  }

  async isExist(id) {
    const listaProductos = await this.getAll();
    const resultado = listaProductos.find(
      (idBuscado) => idBuscado.id == parseInt(id)
    );
    if (resultado === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async getAll() {
    try {
      const contenido = await this.knex(this.table);
      return contenido;
    } catch (err) {
      return `Error: ${err} ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async getById(id) {
    try {
      let contenido = await this.knex
        .from(this.table)
        .select("*")
        .where("id", parseInt(id));
      return contenido.length === 0
        ? (contenido = `No existe el producto con id: ${id}`)
        : contenido;
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async save(producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      try {
        const contenido = await this.knex(this.table).insert(producto);
        return contenido;
      } catch (err) {
        return `Error: ${err.sqlMessage}\n${err.sql}`;
      }
    }
  }

  async updateById(id, producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      try {
        const contenido = await this.knex
          .from(this.table)
          .where("id", parseInt(id))
          .update(producto);
        return contenido === 0
          ? `Producto con id: ${id} no existe`
          : `Producto con id: ${id} actualizado`;
      } catch (err) {
        return `Error: ${err.sqlMessage}\n${err.sql}`;
      }
    } else {
      return "Error con los campos del producto";
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.knex
        .from(this.table)
        .where("id", parseInt(id))
        .del();
      return contenido === 0
        ? `Producto con id: ${id} no existe`
        : `Producto con id: ${id} borrado`;
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }
}

module.exports = { Productos };
