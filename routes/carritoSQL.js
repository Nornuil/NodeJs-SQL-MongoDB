const express = require("express");
const router = express.Router();
const { Carrito } = require("../class/classCarrito");

const manejadorCarrito = new Carrito(
  {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "ecommerce",
      user: "root",
      password: "cejudo2868",
      port: 3306,
    },
    pool: { min: 0, max: 7 },
  },
  "carrito"
);

router.get("/", async (req, res) => {
  const carritos = await manejadorCarrito.getAll();
  res.status(200).json(carritos);
});

router.post("/", async (req, res) => {
  const carrito = await manejadorCarrito.new();
  res
    .status(200)
    .json(`Se creó el carrito con el id: ${JSON.stringify(carrito)}`);
});

router.delete("/:id", async (req, res) => {
  const carrito = await manejadorCarrito.deleteById(req.params.id);
  res.status(200).json(carrito);
});

router.put("/:id/productos", async (req, res) => {
  let idCarrito = parseInt(req.params.id);
  let Producto = { ...req.body };
  (await manejadorCarrito.addProduct(idCarrito, Producto))
    ? res.status(200).json({
        status: `Producto con id ${Producto.id} ha sido agregado al carrito con id ${idCarrito}`,
      })
    : res.status(406).json({ Error: `Carrito o Producto inexistente` });
});

router.put("/:id/productos/:id_prod", async (req, res) => {
  let idCarrito = parseInt(req.params.id);
  let idProducto = parseInt(req.params.id_prod);
  (await manejadorCarrito.lessProduct(idCarrito, idProducto))
    ? res.status(200).json({
        status: `Producto con id ${idProducto} se a quitado del carrito con id ${idCarrito}`,
      })
    : res.status(406).json({ Error: `Carrito o Producto inexistente` });
});

module.exports = router;
