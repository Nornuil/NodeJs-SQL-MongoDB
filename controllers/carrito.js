const { Carrito } = require("../class/classCarrito");
const manejadorCarrito = new Carrito();

const carritoGet = async (req, res) => {
  const carritos = await manejadorCarrito.getAll();
  res.status(200).json(carritos);
};

const carritoPost = async (req, res) => {
  const carrito = await manejadorCarrito.new();
  res
    .status(200)
    .json(`Se creó el carrito con el id: ${JSON.stringify(carrito)}`);
};

const carritoPut = async (req, res) => {
  let idCarrito = parseInt(req.params.id);
  let Producto = { ...req.body };
  (await manejadorCarrito.addProduct(idCarrito, Producto))
    ? res.status(200).json({
        status: `Producto con id ${Producto.id} ha sido agregado al carrito con id ${idCarrito}`,
      })
    : res.status(406).json({ Error: `Carrito o Producto inexistente` });
};

const carritoPut2 = async (req, res) => {
  let idCarrito = parseInt(req.params.id);
  let idProducto = parseInt(req.params.id_prod);
  (await manejadorCarrito.lessProduct(idCarrito, idProducto))
    ? res.status(200).json({
        status: `Producto con id ${idProducto} se a quitado del carrito con id ${idCarrito}`,
      })
    : res.status(406).json({ Error: `Carrito o Producto inexistente` });
};

const carritoDelete = async (req, res) => {
  const carrito = await manejadorCarrito.deleteById(req.params.id);
  res.status(200).json(carrito);
};

module.exports = {
  carritoGet,
  carritoPost,
  carritoPut,
  carritoPut2,
  carritoDelete,
};
