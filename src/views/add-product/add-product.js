import * as Api from '../../../api.js'


const form = document.querySelector("form");
const fileInput = document.querySelector('.inputFile') ;


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
      formData.append('upload', fileInput.files[0]);
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

for (let key of formData.keys()) {
  console.log(key);
}
for (let value of formData.values()) {
  console.log(value);
}

// console.log(formData);
Api.postImg("/api/product", formData);
});