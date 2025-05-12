"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/cidades', controllers_1.CidadesController.createBodyValidator, controllers_1.CidadesController.create, controllers_1.CidadesController.createValidation);
router.get('/', (req, res) => {
    return res.send('aoba');
});
