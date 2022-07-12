// Dependencies

const express = require('express');

// Create a route object
const productRouter = express.Router();

const Product = require('../models/product');

// List the router actions

// SEED Route
const seedData = require('../models/productSeed');

productRouter.get('/seed', (req,res)=>{
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(seedData, (error, data) => {
        res.redirect('/products')
    })
})

// Index Route
productRouter.get('/', (req,res)=>{
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', { allProducts })
    })
})

// new route
productRouter.get("/new", (req, res) => {
    res.render("new.ejs");
});

// delete route
productRouter.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, deletedTweet) => {
        res.redirect("/products");
    });
});


// update route
productRouter.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`);
        }
    );
});


// create route
productRouter.post("/", (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect("/products");
    });
});


// edit route
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("edit.ejs", {foundProduct});
    });
});


// show route
productRouter.get("/:id", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("show.ejs", {foundProduct});
    });
});

// buy route
productRouter.post('/:id/buy',  (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) =>  {
        if(foundProduct.qty > 0) {
            foundProduct.qty--;
            foundProduct.save(() => {
                res.redirect(`/products/${foundProduct._id}`)
            });
        } else {
            res.redirect(`/products/${foundProduct._id}`)
        }
    })
})


// Export router object so that we can require it in server.js
module.exports = productRouter;
