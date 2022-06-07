import * as Api from "../api.ㅓㄴ";

const addCartBtn = document.querySelector("#addCart");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const productImage = document.querySelector("#chocolate");

async function getData() {
  try {
    const data = await Api.get("/api/product/6295181a1c1e72fa67707a10");
    console.log(data);
    productName.textContent = data.name;
    price.textContent = data.price;
    productImage.src = `${data.img}`;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

//로컬스토리지 KEY

const KEY = "cart";

//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  //localStorage에 저장되는 정보입니다.
  //제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  //추후 수량기능도 추가하여 반영할 예정입니다.

  const data = await Api.get("/api/product/6295181a1c1e72fa67707a10");
  const productId = data._id;
  const name = data.name;
  const count = 1;
  const price = data.price;
  const img = data.img;
  const addCart = {
    [productId]: {
      name,
      count,
      price,
      img,
    },
  };
  console.log(addCart);
  const existedCart = localStorage.getItem(KEY);
  if (existedCart) {
    localStorage.setItem(KEY, {});
  }

  const includedItems = Object.keys(localStorage.key(KEY));
  console.log(includedItems);
  const isIncluded = includedItems.includes(productId);
  console.log(isIncluded);

  if (isIncluded) {
    alert("이미 추가된 상품입니다.");
  } else {
    localStorage.setItem(KEY, JSON.stringify(addCart));
    alert("장바구니에 추가되었습니다. ");
  }
});
