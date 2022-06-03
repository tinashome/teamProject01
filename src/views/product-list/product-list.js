import * as Api from "/api.js";

async function getProductList() {
  // API 요청
  try {
    const productData = await Api.get("/api/productlist");
    console.log(productData);
    productData.map((e) => {
      console.log(e);

      // innerHTML 쓰지 말기!!!! -> 수정해야함
      const productList = document.querySelector(".productList");
      // productList.appendChild();

      const item = `
      <div class="productItem">
        <a href="#">
          <img class="itemImg" src="img.jpg" />
          <div class="itemName">${e.name}</div>
          <div class="itemPrice">${e.price}원</div>
        </a>
      </div>`;
      productList.innerHTML += item;
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

getProductList();
