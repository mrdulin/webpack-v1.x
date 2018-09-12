/**
 * Created by elsa on 2017/3/26.
 */
import React, {Component} from 'react';
import {render} from 'react-dom';

const movies = require('./movie').getMovies();

const App = () => {
  const handleClick = () => {
    const books = require('./book').getBooks();
    console.log(books);
    console.log(movies);
  };

  return (
    <div>
      <p>This is a App Component</p>
      <button type="button" onClick={handleClick}>按钮</button>
    </div>
  )
};

render(
  <App/>,
  document.getElementById('app')
);
