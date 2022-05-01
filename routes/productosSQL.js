const express = require("express");
const router = express.Router();

const {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
} = require("../controllers/productos");

router.get("/", productosGet);
router.post("/", productosPost);
router.put("/:id", productosPut);
router.delete("/:id", productosDelete);

module.exports = router;
