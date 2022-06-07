import * as Api from "../api.js";

const fileInput = document.querySelector("#inputFile");
const fileName = document.querySelector("#fileName");
const form = document.querySelector("form");

fileInput.addEventListener("input", (e) => {
  e.preventDefault();
  fileName.textContent = " 사진 저장 성공! ";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("제품 정보가 저장되었습니다.");

  const formData = new FormData();

  //데이터 만들기

  for (const item of form.elements) {
    switch (item.type) {
      case "number":
        formData.append(item.name, item.value);
        break;
      case "text":
        formData.append(item.name, item.value);
        break;
      case "file":
        formData.append("upload", fileInput.files[0]);
        break;
    }
    switch (item.localName) {
      case "select":
        formData.append(item.name, item.value);
        break;
      case "textarea":
        formData.append(item.name, item.value);
        break;
    }
  }
  Api.postImg("/api/product", formData);
});
