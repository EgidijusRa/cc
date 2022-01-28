const express = require('express')
const res = require('express/lib/response')

const router = express.Router()


const Post = require('../models/post')


// POST (Create data)
router.post('/', async(req,res)=>{
    //console.log(req.body)

    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url,
    })

    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }

})


// GET(Read All) const getPosts = await Post.find().limit(10) for a limited pages
router.get('/', async(req,res)=>{
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 2 (Read by ID)
router.get('/:postId', async(req,res)=>{
    try{
        const getPostsById = await Post.findById(req.params.postId)
        res.send(getPostsById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update by ID)
router.patch('/:postId', async(req,res) =>{
    try{
        const updatepostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url,
                }
            })
        res.send(updatepostById)
    }catch(err){
        res.send({message:err})
    }
})


//Delete data
router.delete('/:postId', async(req,res)=>{
    try{
        const deletepostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletepostById)
    }catch(err){
        res.send({message:err})
    }
})



module.exports = router