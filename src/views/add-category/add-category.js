import * as Api from "../api.js";

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", async (e) => {
  e.preventDefault();
  alert("제품 정보가 저장되었습니다.");
  //데이터 백으로 넘기는 작업
  let name = document.querySelector("#categoryName").value;
  let info = document.querySelector("#descrption").value;

  let data = {
    name,
    info,
  };
  try {
    const sendData = await Api.post("/api/category", data);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }

  location.reload();
});
