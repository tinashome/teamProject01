import * as Api from "/api.js";

// url에서 productId 받아오기
const path = window.location.pathname.split("/");
const productId = path[path.length - 2];
console.log(productId);

// html 요소 선택
const inputName = document.querySelector("#name");
const selectCategory = document.querySelector("#selectCategory");
const inputCompany = document.querySelector("#company");
const inputSummary = document.querySelector("#summary");
const inputDetail = document.querySelector("#detail");
const inputImg = document.querySelector("#img");
const inputQuantity = document.querySelector("#quantity");
const inputPrice = document.querySelector("#price");

async function getData() {
  try {
    // 수정 전 기존 상품데이터 호출
    const pastProduct = await Api.get(`/api/product/${productId}`);
    console.log(pastProduct);

    // 카테고리 목록 호출
    const categories = await Api.get("/api/categories");
    console.log(categories);

    // 폼에 기존값 할당
    inputName.value = pastProduct.name;

    inputCompany.value = pastProduct.company;
    inputSummary.value = pastProduct.summary;
    inputDetail.value = pastProduct.detail;
    inputImg.src = pastProduct.img;
    inputQuantity.value = pastProduct.quantity;
    inputPrice.value = pastProduct.price;

    // 폼에 카테고리 목록 주입, 기존값은 selected
    categories.forEach((category) => {
      let option = document.createElement("option");

      if (pastProduct.category == category._id) {
        option.selected = true;
      }
      option.textContent = category.name;
      option.value = category._id;

      selectCategory.append(option);
    });

    // 다음페이지에 넘겨줄 product의 id를 value로 할당
    // name.value = data[i]._id;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

////////////////////////////////////////////////////////////
// 상품 추가에서 없는값은 넘겨주지 않기때문에, 그 경우는 다루지 않음
// 상품이 항상 있는 상태를 가정
// => 상품이 수정될때와 안될때 분기가 필요

const form = document.querySelector("form");
const fileName = document.querySelector("#fileName");

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
        // 사진 추가가 있다면
        if(fileName.textContent == " 사진 저장 성공! ") {
          formData.append("upload", inputFile.files[0]);
        } 
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
    const patching = await Api.patch(`/api/products`, `${productId}`, formData);

  } catch (err) {
    console.error(err.stack);
  }
  location.reload();
});
