import * as Api from "../api.js";

const addCartBtn = document.querySelector("#addCart");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const productImage = document.querySelector("#chocolate");

async function getData() {
  try {
    const data = await Api.get("/api/product/629fdc63e121b3f756ad9c1f");
    console.log(data);
    productName.textContent = data.name;
    price.textContent = data.price;
    productImage.src = `/${data.img}`;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

const CARTLIST_KEY = "cartList";
// //임시 장바구니
const addCartList = [];
// //최종 장바구니
let uniqCartList = [];
function saveCartList() {
  localStorage.setItem(CARTLIST_KEY, JSON.stringify(uniqCartList));
}
//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await Api.get("/api/product/629fdc63e121b3f756ad9c1f");

  // localStorage에 저장되는 정보입니다.
  // 제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  // 추후 수량기능도 추가하여 반영할 예정입니다.
  //

  const thisData = {};
  thisData.name = data.name;
  thisData.price = data.price;
  thisData.img = data.img;
  thisData.id = data._id;
  thisData.quantity = 1;

  makeAddCartList();
  makeUniq();
  addCartList.push(thisData);

  const isadded = uniqCartList.find((e) => e.id === data._id);
  if (isadded) {
    alert("이미 추가된 상품입니다!");
  } else {
    alert("장바구니에 추가되었습니다.");
  }

  makeAddCartList();
  makeUniq();

  // if (uniqCartList.length == 0 || ) {
  //   addCartList.push(thisData);
  //   alert("장바구니에 추가되었습니다.");
  // }
  // console.log(uniqCartList);
  // for (let i = 0; i < uniqCartList.length; i++) {
  //   if (uniqCartList[i].id == data._id) {
  //     alert("이미 추가된 상품입니다!");
  //   }
  // }

  // makeAddCartList();
  // makeUniq();
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
