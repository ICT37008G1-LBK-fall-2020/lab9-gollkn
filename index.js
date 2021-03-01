const axios = require('axios');

let ID = document.createElement("input");
ID.setAttribute("type", "text");
document.body.appendChild(ID);

let button = document.createElement("input");
button.setAttribute("type", "button");
button.setAttribute("value", "search")
document.body.appendChild(button);

let table = document.createElement("table");
document.body.appendChild(table);
table.setAttribute("border", "1");
table.style.borderCollapse = "collapse";
table.style.textAlign = "center";

button.onclick = function () {
  let input = ID.value
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + input)
    .then(response => response.json())
    .then(json => {
      table.innerHTML = "";
      var headers = ["title", "body", ""];
      for (var i = 0; i < 3; i++) {
        var td = document.createElement("td");
        td.innerHTML = headers[i];
        table.appendChild(td);
      }

      json.forEach((post) => {
        var postData = [post.title, post.body, "", " "]
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (var j = 0; j < 4; j++) {
          if (j < 2) {
            var td = document.createElement("td");
            td.innerHTML = postData[j];
            tr.appendChild(td);
          } else if (j == 2) {
            var td = document.createElement("td");
            var btn = document.createElement("input");
            btn.setAttribute("type", "button");
            btn.setAttribute("value", "view comments");
            btn.setAttribute("id", post.id);
            btn.setAttribute("class", "commentButton");
            td.appendChild(btn);
            tr.appendChild(td);
          } else {
            var td = document.createElement("td");
            td.setAttribute("class", "commentSpace");
            td.style.border = "none";
            td.innerHTML = postData[j];
            tr.appendChild(td);
          }
        }
      })

      document.querySelectorAll('.commentButton').forEach(btn => {
        btn.addEventListener("click", function (e) {
          axios.get("https://jsonplaceholder.typicode.com/comments?postId=" + btn.id)
            .then(response => {
              document.querySelectorAll(".commentSpace").forEach(element => {
                element.innerHTML = ""
              })
              var newTable = document.createElement("table");
              response.data.forEach(element => {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerText = element.body;
                newTable.appendChild(tr);
              })
              e.target.parentNode.parentNode.querySelector(".commentSpace").appendChild(newTable);
              newTable.setAttribute("border", "1");
            })

          document.querySelectorAll("tr").forEach(element => element.style.background = "")
          e.target.closest("tr").style.background = "green";
          e.target.parentNode.parentNode.querySelector(".commentSpace").style.background = "white"
        });
      })
    })
}
