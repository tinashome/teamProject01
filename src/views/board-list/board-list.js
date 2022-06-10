import * as Api from "../api.js";

const tbody = document.querySelector(".tableBody");
const writeButton = document.querySelector("#addButton");

async function getData() {
  try {
    // 게시글 목록 호출
    const posts = await Api.get("/boards/notice/posts");
    console.log(posts);
    
    for (let i = 0; i < posts.length; i++) {
      // html 요소 생성
      let tr = document.createElement("tr");
      let numId = document.createElement("td");
      let title = document.createElement("td");
      let author = document.createElement("td");
      let views = document.createElement("td");
      let createDate = document.createElement("td");

      // 요소에 배열값 할당 + 요소에 class 추가
      numId.textContent = posts[i].numId;
      numId.classList.add("numId");

      title.textContent = posts[i].title;
      title.classList.add("title");

      // content.textContent = posts[i].content;
      // content.classList.add("content");

      author.textContent = posts[i].author;
      author.classList.add("author");
      
      createDate.textContent = posts[i].createdAt;
      createDate.classList.add("createdAt");

      views.textContent = posts[i].views;
      views.classList.add("views");

      // 상세에 넘겨줄 게시글 하나의 id값
      numId.value = posts[i]._id;

      tr.appendChild(numId);
      tr.appendChild(title);
      tr.appendChild(author);      
      tr.appendChild(createDate);
      tr.appendChild(views);
      tbody.appendChild(tr);
    }
    writeButton.addEventListener("click", writing);
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

function writing() {
  window.location.href = "/boardlist/write";
}
// function deleteCategory(item) {
//   const thisId = item.path[0].parentElement.childNodes[0].value;
//   console.log(`/api/categories/${thisId}`);
//   const deleteThis = Api.delete(`/api/categories/${thisId}`);
//   // location.reload();
// }
