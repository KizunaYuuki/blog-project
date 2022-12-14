const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const { title } = require('process')
const BlogPost = require('./models/BlogPost.js')

// bodyParser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose
const mongoose = require('mongoose');
const { error } = require('console')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(4000, () => {
    // console.log('App listening on port 4000')
    console.log(`http://localhost:4000/`)
})

// use engine ejs
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index', {
        blogposts: blogposts // ~ blogposts
    });
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    console.log(req.params)
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

// handler post
app.post('/posts/store', async (req, res) => {
    // model creates a new doc with browser data
    await BlogPost.create(req.body)
    console.log("Create completed\n" + req.body)
    res.redirect('/')
})
70