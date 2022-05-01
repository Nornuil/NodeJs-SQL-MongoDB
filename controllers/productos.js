const { Productos } = require("../class/classProductos");
const manejadorProductos = new Productos();

const productosGet = async (req, res) => {
  const productos = await manejadorProductos.getAll();
  res.send(productos);
  console.log(productos);
};

const productosPost = async (req, res) => {
  const producto = await manejadorProductos.save(req.body);
  res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
  console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
};

const productosPut = async (req, res) => {
  const producto = await manejadorProductos.updateById(req.params.id, req.body);
  res.send(
    producto === undefined
      ? `Se actualizó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
  console.log(
    producto === undefined
      ? `Se actualizó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
};

const productosDelete = async (req, res) => {
  const producto = await manejadorProductos.deleteById(req.params.id);
  res.send(
    producto === undefined
      ? `Se eliminó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
  console.log(
    producto === undefined
      ? `Se eliminó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
};

module.exports = {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
};
