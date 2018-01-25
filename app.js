// Created a server with Express and stored all the methods in the variable called app
// Then loaded the file system module fs

const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;
const pug = require('pug');
let blogDatabase = {
    1: {
        id: 1,
        name: "firstPost",
        text: "firstPostText"
    },

    2: {
        id: 2,
        name: "secondPost",
        text: "secondPostText"
    }
}

// Created a route for the bloggersteampage. Its working local on my computer.
// This is a static page/route to that's why it's made in an html and not in a templating engine
// Since we also have a dynamic page (the blogposts) we can use PUG there to practive with two different ways of RESpons in Node.js

app.set('view engine', 'pug');

// main route that also renders a pug template
app.get('/', function(req, res) {
    res.render('index');
})

app.get('/bloggers', (req, res) => {
    // renders html file with fs, eventually needs to be moved to a pug template as well
    res.render('./bloggersteampage.html', 'utf-8', (err, data) => {
        if (err) {
          res.status(500); // Internal Server Error
          console.error('Error was: ', err.stack);  // Or maybe log-it somewhere?
        }

        res
          .status(200)
          .type('text/html')
          .end(data)

    });
});


app.get('/allblogs/:id', function(req, res) {
    const post = blogDatabase[req.params.id];
    console.log(post);
    if(!post) {
        res.redirect('/allblogs');
        return
    }
    res.render('blog', post);
})

app.get('/allblogs', function(req, res) {
    res.render('allblogs', {posts: Object.values(blogDatabase)});
})

// Listen to port 8080
app.listen(port, () => console.log(`Server listening to port ${port}!`));
