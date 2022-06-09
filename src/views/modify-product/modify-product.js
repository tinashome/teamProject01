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
    categories.forEach(category => {
      let option = document.createElement("option");
      
      if(pastProduct.category == category._id) {
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