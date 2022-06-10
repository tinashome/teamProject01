import * as Api from "../api.js";
import * as usefulFunc from "../useful-functions.js";

const tbody = document.querySelector(".tableBody");
const writeButton = document.querySelector("#addButton");

const userId = sessionStorage.getItem("userId");
console.log(userId);


async function getData() {
  try {
    // 게시글 목록 호출
    const posts = await Api.get("/boards/notice/posts");
    console.log(posts);
    
    for (let i = 0; i < posts.length; i++) {
      // html 요소 생성
      let tr = document.createElement("tr");
      let createDate = document.createElement("td");
      let title = document.createElement("td");
      let author = document.createElement("td");
      let content = document.createElement("td");

      let modifyBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      // 요소에 배열값 할당 + 요소에 class 추가
      createDate.textContent = usefulFunc.getCurrentDate(posts[i].createdAt);
      createDate.classList.add("createdAt");

      title.textContent = posts[i].title;
      title.classList.add("title");

      author.textContent = posts[i].author.fullName;
      author.classList.add("author");

      content.textContent = posts[i].content;
      content.classList.add("content");

      modifyBtn.textContent = "수정";
      modifyBtn.setAttribute("id", `modifyBtn${i}`);
      modifyBtn.addEventListener("click", e=>modiPost(posts[i]._id));
      deleteBtn.textContent = "삭제";
      deleteBtn.setAttribute("id", `deleteBtn${i}`);
      deleteBtn.addEventListener("click", e=>delPost(posts[i]._id));


      // 상세에 넘겨줄 게시글 하나의 id값
      // title.value = posts[i]._id;

      tr.appendChild(createDate);
      tr.appendChild(title);
      tr.appendChild(author);      
      tr.appendChild(content);
      content.appendChild(modifyBtn);
      content.appendChild(deleteBtn);
      tbody.insertBefore(tr, tbody.firstChild);


      // 세션 유저와 글쓴유저가 같으면 수정/삭제버튼이 보인다.
      if (userId != posts[i].author._id) {
        let targetModiBtn = document.querySelector(`#modifyBtn${i}`);
        targetModiBtn.hidden = true;

        let targetDelBtn = document.querySelector(`#deleteBtn${i}`);
        targetDelBtn.hidden = true;
      }
      // modifyBtn.style.visibility = hidden;
      // deleteBtn.style.visibility = hidden;
      
    }
    writeButton.addEventListener("click", writing);
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

function writing(item) {
  if (!userId) {
    alert("글쓰기는 로그인한 유저만 가능합니다.");
    return;
  }
  // console.log(item);
  // const thisId = item.path[0].parentElement.childNodes[0].value;
  window.location.href = `/boardlist/write`;
}

function modiPost(postId) {
  window.location.href = `/boardlist/${postId}`;
}

async function delPost(postId) {
  try {
    const deleteThis = await Api.delete(`/boards/notice/post/${postId}`);
  } catch(err) {
    console.error(err.stack);
  }
  location.reload();
}
// function deleteCategory(item) {
//   const thisId = item.path[0].parentElement.childNodes[0].value;
//   console.log(`/api/categories/${thisId}`);
//   const deleteThis = Api.delete(`/api/categories/${thisId}`);
//   // location.reload();
// }
