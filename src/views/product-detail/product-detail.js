import * as Api from "/api.js";
import { addCommas } from "/useful-functions.js";

const addCartBtn = document.querySelector("#addCart");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const productImage = document.querySelector("#chocolate");
const productDescription = document.querySelector("#productDescription");
const productSummary = document.querySelector("#productSummary");

const path = window.location.pathname.split("/");
const productId = path[path.length - 2];

async function getData() {
  try {
    const data = await Api.get(`/api/product/${productId}`);
    productName.textContent = data.name;
    price.textContent = addCommas(data.price);
    productImage.src = data.img;
    productDescription.textContent = data.detail;
    productSummary.textContent = data.summary;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

const CARTLIST_KEY = "cartList";
// //임시 장바구니
let addCartList = [];
// //최종 장바구니
let uniqCartList = [];
function saveCartList() {
  uniqCartList.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  if (uniqCartList.includes(null)) {
    const finalCart = uniqCartList.filter((e) => e !== null);
    localStorage.setItem(CARTLIST_KEY, JSON.stringify(finalCart));
  } else {
    localStorage.setItem(CARTLIST_KEY, JSON.stringify(uniqCartList));
  }
}
//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await Api.get(`/api/product/${productId}`);

  // localStorage에 저장되는 정보입니다.
  // 제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  // 추후 수량기능도 추가하여 반영할 예정입니다.

  const thisData = {};
  thisData.name = data.name;
  thisData.price = data.price;
  thisData.img = data.img;
  thisData.id = data._id;
  thisData.quantity = 1;

  makeAddCartList();
  makeUniq();
  addCartList.push(thisData);
  addCartList = addCartList.filter((e) => e != null);
  console.log(addCartList);

  const isadded = uniqCartList.find((e) => e.id === data._id);
  if (isadded) {
    alert("이미 추가된 상품입니다!");
  } else {
    alert("장바구니에 추가되었습니다.");
  }

  makeAddCartList();
  makeUniq();
  saveCartList();
});

function makeAddCartList() {
  let existedData = JSON.parse(localStorage.getItem(CARTLIST_KEY));
  if (existedData !== null) {
    existedData.forEach((e) => {
      addCartList.push(e);
    });
  }
}

function makeUniq() {
  const map = new Map();
  for (const item of addCartList) {
    map.set(JSON.stringify(item), item);
  }
  uniqCartList = [...map.values()];
}

const buyDirect = document.querySelector("#buyDirect");
buyDirect.addEventListener("click", async () => {
  const data = await Api.get(`/api/product/${productId}`);

  const thisData = {};
  thisData.name = data.name;
  thisData.price = data.price;
  thisData.img = data.img;
  thisData.id = data._id;
  thisData.quantity = 1;

  localStorage.setItem("buyDirect", JSON.stringify(thisData));

  window.location.href = "/order";
});
