const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/products/cakes/{ingredient}:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *       - name: ingredient
 *         in: path
 *         required: true
 *       - name: design
 *         in: query
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 * /api/products/order:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 * /api/products/order/detail/:productId:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

module.exports = router;
