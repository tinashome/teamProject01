import * as Api from "../api.js";

const tbody = document.querySelector(".tableBody");

async function getData() {
  try {
    const data = await Api.get("/api/categories");
    // const data = await Api.get("/board/notice/posts");

    for (let i = 0; i < data.length; i++) {
    //   console.log(data[i].name, data[i].info);
      let tr = document.createElement("tr");
      let numId = document.createElement("td");
      let title = document.createElement("td");
      let content = document.createElement("td");
      let author = document.createElement("td");
      let views = document.createElement("td");
      
      let modifyBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      numId.textContent = data[i].numId;
      numId.classList.add("numId");

      title.textContent = data[i].title;
      title.classList.add("title");

      content.textContent = data[i].content;
      content.classList.add("content");

      author.textContent = data[i].author;
      author.classList.add("author");
      
      views.textContent = data[i].views;
      views.classList.add("views");

      // 상세로 넘기기 위한 게시글 하나의 id값
      name.value = data[i]._id;

      modifyButton.textContent = "수정";
      modifyButton.classList.add("modifyButton");
      modifyButton.addEventListener("click", modifying);

      deleteButton.textContent = "삭제";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", deleteCategory);

      tr.appendChild(name);
      tr.appendChild(description);
      tr.appendChild(modifyButton);
      tr.appendChild(deleteButton);
      tbody.appendChild(tr);
    }
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

function modifying() {
  window.location.href = "/modifycategory";
}
function deleteCategory(item) {
  const thisId = item.path[0].parentElement.childNodes[0].value;
  console.log(`/api/categories/${thisId}`);
  const deleteThis = Api.delete(`/api/categories/${thisId}`);
  // location.reload();
}
