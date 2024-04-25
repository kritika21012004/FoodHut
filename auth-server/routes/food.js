const express = require('express');
const protect = require('../middleware/authMiddleware');
const { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCategory, getTopRatings } = require('../controller/food');
router = express.Router();


router.post("/addfood", protect,createFood);
router.get("/getAllFoods",getAllFoods);
router.get("/getNewFoods",getNewFoods); 
router.get("/getTopRated",getTopRatings); 
router.get("/specialFoods",getFoodsFromDistinctCategory); 
router.get("/getFood/:id",getFoodById);
module.exports = router;