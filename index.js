const axios = require('axios');

//მაგალითები

fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => console.log(json))


axios.get('https://jsonplaceholder.typicode.com/todos/1')
.then((response) => {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});