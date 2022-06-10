import * as Api from "../api.js";

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", async (e) => {
  alert("글이 등록되었습니다.");
  //데이터 백으로 넘기는 작업
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let content = document.querySelector("#content").value;

  let data = {
    title,
    author,
    content,
  };

  try {
    const sendData = await Api.post("/board/notice/post", data);
    console.log(sendData);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }

  location.reload();
});
