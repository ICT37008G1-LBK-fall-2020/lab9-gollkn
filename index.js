const axios = require('axios');

//მაგალითები
let postsTable = document.querySelector('#posts-table');
let commentsTable = document.querySelector('#comments-table');
let getPostsButton = document.querySelector('#get-posts');

fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => console.log(json))
getPostsButton.addEventListener('click', () => {
  getPosts();
})

function getPosts() {
  let userId = document.getElementById('user-id').value;
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(json => displayPosts(json));
}



axios.get('https://jsonplaceholder.typicode.com/todos/1')
.then((response) => {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
function displayPosts(posts) {
  document.querySelectorAll('table').forEach(table => table.classList.remove('active'));
  commentsTable.querySelector('tbody').innerHTML = '';
  postsTable.querySelector('tbody').innerHTML = '';
  posts.forEach(post => {
    let tr = document.createElement('tr');
    let rowSingle = `
      <td>${post.title}</td>
      <td>${post.body}</td>
      <td>
        <button id='${post.id}' class="get-comments">See Comments</button>
      </td>
    `
    tr.innerHTML = rowSingle;
    postsTable.querySelector('tbody').appendChild(tr);
  })
  document.querySelectorAll('.get-comments').forEach(button => button.addEventListener('click', (e) => {
    getComments(e.target);
  }));
  document.querySelector('#posts-table').classList.add('active');
}

function getComments(btn) {
  let id = btn.getAttribute('id');
  axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then((response) => {
      displayComments(response.data);
      document.querySelectorAll('#posts-table tr').forEach(tr => tr.classList.remove('active'));
      btn.closest('tr').classList.add('active');
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayComments(comments) {
  commentsTable.classList.add('active');
  commentsTable.querySelector('tbody').innerHTML = '';
  comments.forEach(comment => {
    let tr = document.createElement('tr');
    let rowSingle = `
      <td>${comment.body}</td>
    `
    tr.innerHTML = rowSingle;
    commentsTable.querySelector('tbody').appendChild(tr);
  })
} 
