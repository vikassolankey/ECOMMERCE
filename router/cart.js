const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const User = require('../model/user');

router.get('/users/cart/add/:productId',async (req,res)=>{
    const {productId} = req.params;
    const product = await Product.findById(productId);

    const userId = req.user._id;

    const user = await User.findById(userId);
    let index =-1;
    let x = user.cart.find((item,ind)=>{
        if(item.productId==productId){
            index=ind;
            return item
        }
    })
    if(x){
        user.cart[index].qantity +=1
    }
    else{
        user.cart.push({productId})
    }
    await user.save();

    res.redirect('back');
})

router.get('/users/:userId/cart', async (req, res) => {
    const { id } = req.params;
    const userCart = await Cart.findOne({id }).populate('card.productId'); 
    res.render('cart/show', { userCart });
});



module.exports = router;