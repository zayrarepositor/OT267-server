const { check } = require('express-validator');

const { Category } = require('../models/index');

const { News } = require('../models/index');

const { handleResult } = require('../middlewares/validateFields');

const validateNewsFields = [
  check('name', 'Ingrese el nombre de la novedad')
    .exists()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('content', 'Ingrese contenido')
    .exists()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('image', 'Ingrese una URL de imagen')
    .exists()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('categoryId', 'Ingrese el id de categoría')
    .exists()
    .trim()
    .custom(async (value) => {
      const category = await Category.findOne({ where: { id: value } });
      if (!category) {
        throw new Error('La categoría no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateUpdate = [
  check('id', 'Ingrese el id de la novedad')
    .exists()
    .withMessage('El id de la novedad es requerido')
    .isNumeric()
    .withMessage('El id de la novedad debe ser un número')
    .trim()
    .custom(async (value) => {
      const matchedId = await News.findOne({ where: { id: value } });
      if (!matchedId) {
        throw new Error('La novedad no existe');
      } else {
        return true;
      }
    }),

  check('categoryId', 'Ingrese un id de categoría')
    .custom(async (value) => {
      if (!value) return true;
      const category = await Category.findOne({ where: { id: value } });
      if (!category) {
        throw new Error('La categoria no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateId = [
  check('id', 'Ingrese el id de la novedad')
    .exists()
    .withMessage('El id de la novedad es requerido')
    .isNumeric()
    .withMessage('El id de la novedad debe ser un número')
    .trim()
    .custom(async (value) => {
      const matchedId = await News.findOne({ where: { id: value } });
      if (!matchedId) {
        throw new Error('La novedad no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateNewsFields, validateUpdate, validateId };