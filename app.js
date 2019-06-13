const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const books = require('./book.js');
const plays = require('./playstore.js')

app.get('/books', (req, res) => {
    const { search = "", sort } = req.query;
  
    if(sort) {
      if(!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
  
    let results = books
          .filter(book => 
              book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if(sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      }); 
    }  
  
    res
      .json(results);
  });

  app.get('/apps', (req, res) => {
    const { search = "", sort, genres = "" } = req.query;
  
    if(sort) {
      if(!['rating', 'app'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of rating or app');
      }
    }
  
    let results = plays
          .filter(play => 
              play
                .App
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if(sort) {
        const sortCap = sort.charAt(0).toUpperCase() + sort.slice(1);
        results
         .sort((a, b) => {
            return a[sortCap] > b[sortCap] ? 1 : a[sortCap] < b[sortCap] ? -1 : 0;
      }); 
    }
    
    if(genres) {
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)){
            return res 
                .status(400)
                .send(`Genres must be default, action, puzzle, strategy, casual, arcade, or card `)
        }
    }

    if(genres) {
        const genreCap = genres.charAt(0).toUpperCase() + genres.slice(1);
        results
            .filter(result => result.Genres = genreCap);
    }
  
    res
      .json(results);
  });


  app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });