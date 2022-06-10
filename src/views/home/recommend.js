import { get } from "/api.js";
import { addCommas } from "/useful-functions.js";

// 상품 목록 받아오기
async function getProductList() {
  try {
    const productData = await get("/api/products");
    const productList = document.querySelector(".productList");

    productData.forEach((e) => {
      if (e._id === recommend[q]) {
        console.log(e);
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
        productList.appendChild(productItem);

        q += 1;
      }
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

const recommend = [
  "62a1a4e722d988ddbbe58d27",
  "62a2cf61ba1727d03dbd61b7",
  "62a2dc9543b7ffa5da32ebf9",
  "62a2de3343b7ffa5da32ec0d",
];
var q = 0;
getProductList();
