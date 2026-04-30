// module.exports = (app)=>{
// }
const { index } = require('../controllers/index.controller');



const router = require('express').Router();


router.get('/' , index)

module.exports = router