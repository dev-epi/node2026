const { create, getAll, getByRole, getById, update, remove, login } = require('../controllers/users.controller');

const router = require('express').Router();

router.post('/create' , create)
router.post('/login' , login)
router.get('/' , getAll)
router.get('/role/:role' , getByRole)
router.get('/:id' , getById)
router.put('/:id' , update)
router.delete('/:id' , remove)
module.exports = router