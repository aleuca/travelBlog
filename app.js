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
        name: "Something about Vienna",
        text: "Vienna is a really cool city.",
        image: "http://www.realclearlife.com/wp-content/uploads/2016/11/GettyImages-158534835-1600x1068.jpg"
    },

    2: {
        id: 2,
        name: "Some post about Paris",
        text: "Paris baguette croissant",
        image: "https://media.architecturaldigest.com/photos/5931758bf368f9234dedb534/master/pass/Paris_Personalities_GettyImages-546896176-2.jpg"
    },

    3: {
        id: 3,
        name: "What's up in Amsterdam",
        text: "Dutch people smoke tulips",
        image: "https://www.wallpaperink.co.uk/gallery/shutterstock/cities/Amsterdam_Tulips.jpg"
    }
}

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
