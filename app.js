//This is the main backend file for our Travelblog. Ckeck out the comments for more info.

// We created a server with Express and stored all the methods in the variable called app
// Then installed the modules/packages: fs, pug, body-parser, cookie-parser in the appropriate constant variables
const express = require('express');
const app = express();
const fs = require('fs');
const pug = require('pug');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//To set the template engine that we are going to use
app.set('view engine', 'pug');

// Variable for the server to listen to a port
const port = 8080;

// TODO_:We want to store the posts in a dbase but will do that after covering dbases with Gabor
// For now we created an object
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

// GET request for mainpage/route that renders the index pug from the view directory and sends it as html to the client
app.get('/', (req, res) => {
    res.render('index');
});

// GET requeest for allblogpage/route that renders the allblogs pug from the view directory and sends it as html to the client
app.get('/allblogs', (req, res) => {
    res.render('allblogs', {posts: Object.values(blogDatabase)});   // in between curly braces is the optional parameter to pass local variables to the view through an object
});

// GET requeest for 1blogpage/route that renders the blog pug from the view directory and sends it as html to the client
app.get('/allblogs/:id', (req, res) => {
    const post = blogDatabase[req.params.id];
    console.log(post);
    if(!post) {           //is the following maybe a stricter solution: if (typeof post === 'undefined' || post === null) {
        res.redirect('/allblogs');
        return;
    }
    res.render('blog', post);
});


// We did this with an HTML file, to exercise with both variations, but maybe it's better to do everything in PUG?
// app.get('/bloggers', (req, res) => {
//     // renders html file with fs, eventually needs to be moved to a pug template as well
//     res.render('./bloggersteampage.html', 'utf-8', (err, data) => {
//         if (err) {
//           res.status(500); // Internal Server Error
//           console.error('Error was: ', err.stack);  // Or maybe log-it somewhere?
//         }
//
//         res
//           .status(200)
//           .type('text/html')
//           .end(data)
//
//     });
// });

// Listen to port 8080
app.listen(port, () => console.log(`Server listening to port ${port}!`));
