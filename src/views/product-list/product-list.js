import { get } from "/api.js";
import { addCommas } from "/useful-functions.js";

async function getCategoryList() {
  try {
    const categoryData = await get("/api/categories");
    const categoryItems = document.querySelector(".categoryItems");

    categoryData.forEach((e) => {
      const liTag = document.createElement("li");
      liTag.setAttribute("class", "category");
      const categoryText = document.createTextNode(e.name);
      liTag.appendChild(categoryText);
      liTag.classList.add(e.name);
      categoryItems.appendChild(liTag);

      liTag.addEventListener("click", () => {
        const removeCheck = document.querySelector(".selectCategory");
        removeCheck.classList.remove("selectCategory");
        liTag.classList.add("selectCategory");

        // 기존 선택 상품 없애기
        for (var i = 0; i < cnt; i++) {
          const delDiv = document.querySelector(".productItem");
          productList.removeChild(delDiv);
        }
        cnt = 0;

        // 상품 목록 넣기
        printProduct.forEach((print) => {
          if (`productItem ${e.name}` === print.className) {
            productList.appendChild(print);
            cnt += 1;
          }
        });
      });
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 상품 목록 받아오기
async function getProductList() {
  try {
    const productData = await get("/api/products");

    printProduct = [];
    productData.forEach((e) => {
      const productItem = document.createElement("div");
      productItem.setAttribute("class", "productItem");
      productItem.classList.add(e.category.name);
      const aTag = document.createElement("a");
      aTag.setAttribute("href", `/detail/${e._id}`);

      const itemImg = document.createElement("img");
      const itemName = document.createElement("div");
      const itemPrice = document.createElement("div");
      itemImg.setAttribute("class", "itemImg");
      itemImg.setAttribute("src", `${e.img}`);
      itemName.setAttribute("class", "itemName");
      itemPrice.setAttribute("class", "itemPrice");

      const nameText = document.createTextNode(`${e.name}`);
      const priceText = document.createTextNode(`${addCommas(e.price)}원`);
      itemName.appendChild(nameText);
      itemPrice.appendChild(priceText);

      aTag.appendChild(itemImg);
      aTag.appendChild(itemName);
      aTag.appendChild(itemPrice);
      productItem.appendChild(aTag);
      printProduct.push(productItem);
    });

    if (clickCategory) {
      allBtn.classList.remove("selectCategory");
      const click = document.querySelector(`.${clickCategory}`);
      click.classList.add("selectCategory");

      // 기존 목록 없애기
      for (var i = 0; i < cnt; i++) {
        const delDiv = document.querySelector(".productItem");
        productList.removeChild(delDiv);
      }
      cnt = 0;
      printProduct.forEach((print) => {
        if (`productItem ${clickCategory}` === print.className) {
          cnt += 1;
          productList.appendChild(print);
        }
      });
      sessionStorage.removeItem("category");
    } else {
      printProduct.forEach((print) => {
        productList.appendChild(print);
        cnt += 1;
      });
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

const productList = document.querySelector(".productList");
const clickCategory = sessionStorage.getItem("category");
var printProduct = [];
var cnt = 0;
getProductList();
getCategoryList();

// 전체보기
const allBtn = document.querySelector(".allBtn");
allBtn.addEventListener("click", () => {
  const removeCheck = document.querySelector(".selectCategory");
  removeCheck.classList.remove("selectCategory");
  allBtn.classList.add("selectCategory");
  // 기존 목록 없애기
  for (var i = 0; i < cnt; i++) {
    const delDiv = document.querySelector(".productItem");
    productList.removeChild(delDiv);
  }
  cnt = 0;
  printProduct.forEach((e) => {
    productList.appendChild(e);
    cnt += 1;
  });
});
