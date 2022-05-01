const express = require("express");
const router = express.Router();
const {
  carritoGet,
  carritoPost,
  carritoPut,
  carritoPut2,
  carritoDelete,
} = require("../controllers/carrito");

router.get("/", carritoGet);
router.post("/", carritoPost);
router.put("/:id/productos", carritoPut);
router.put("/:id/productos/:id_prod", carritoPut2);
router.delete("/:id", carritoDelete);

module.exports = router;
