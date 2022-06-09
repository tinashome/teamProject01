import { get } from "/api.js";

async function getProductList() {
  // API 요청
  try {
    const productData = await get("/api/products");

    productData.forEach((e) => {
      console.log(e);
      const productList = document.querySelector(".productList");
      const productItem = document.createElement("div");
      productItem.setAttribute("class", "productItem");
      const aTag = document.createElement("a");
      console.log(e._id);
      aTag.setAttribute("href", `/detail/${e._id}`);

      const itemImg = document.createElement("img");
      const itemName = document.createElement("div");
      const itemPrice = document.createElement("div");
      itemImg.setAttribute("class", "itemImg");
      itemImg.setAttribute("src", `${e.img}`);
      itemName.setAttribute("class", "itemName");
      itemPrice.setAttribute("class", "itemPrice");

      const nameText = document.createTextNode(`${e.name}`);
      const priceText = document.createTextNode(`${e.price}`);
      itemName.appendChild(nameText);
      itemPrice.appendChild(priceText);

      aTag.appendChild(itemImg);
      aTag.appendChild(itemName);
      aTag.appendChild(itemPrice);
      productItem.appendChild(aTag);
      productList.appendChild(productItem);
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

getProductList();
