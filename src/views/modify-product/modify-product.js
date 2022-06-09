import * as Api from "/api.js";

const path = window.location.pathname.split("/");
const productId = path[path.length - 2];

const findCategory = [];
// const matchingCategory = findCategory.concat("", productId);

const productName = document.querySelector("#productName");
const company = document.querySelector("#company");
const summary = document.querySelector("#summary");
const detail = document.querySelector("#detail");
const inputFile = document.querySelector("#inputFile");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");

const selectCategory = document.querySelector("#category");

async function getData() {
  try {
    const data = await Api.get(`/api/product/${productId}`);
    console.log(data);
    productName.value = data.name;
    findCategory.push(data.category);
    company.value = data.company;
    summary.textContent = data.summary;
    detail.textContent = data.detail;
    inputFile.textContent = data.inputFile;
    quantity.value = data.quantity;
    price.value = data.price;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

async function makeCategory() {
  try {
    const data = await Api.get("/api/categories");

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name, data[i]._id);
      let category = document.createElement("option");
      if (data[i]._id === findCategory[0]) {
        selectCategory.textContent = data[i].name;
      }
      category.textContent = data[i].name;
      category.value = data[i]._id;
      selectCategory.after(category);
    }
  } catch (err) {
    console.error(err.stack);
  }
}
makeCategory();

const form = document.querySelector("form");

inputFile.addEventListener("input", (e) => {
  e.preventDefault();
  fileName.textContent = " 사진 저장 성공! ";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("제품 정보가 수정되었습니다.");

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
        formData.append("upload", inputFile.files[0]);
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

  try {
    //patch 가능한 api로 바꾸기
    //const patching = await Api.patch(`/api/products`, `${productId}`, formData);
  } catch (err) {
    console.error(err.stack);
  }
});
