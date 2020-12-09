const { Router } = require("express");
const router = Router();
// importar todas los enrutadores;
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

// cargar cada enrutador en una ruta
// i.e: router.use('/auth', authRouter);

router.use("/users", userRouter);    
router.use('/accounts', accountRouter);

module.exports = router;