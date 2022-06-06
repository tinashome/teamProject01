import * as Api from '../api.js'

const addCartBtn = document.querySelector("#addCart");
const productName = document.querySelector('#productName');
const price = document.querySelector('#price');
const productImage = document.querySelector("#chocolate");


async function getData(){
  try{
    const data = await Api.get("/api/product/629c75975c58dece265330f9");
    console.log(data);

    productName.textContent = data.name;
    price.textContent = data.price;
    productImage.src = data.img;

    // const container = document.querySelector(".productContainer");
    // const img = document.createElement("img");
    // img.setAttribute("id", "chocolate");
    // img.src = data.img;
    // container.appendChild(img)

    // const detailContainer = document.createElement("div");
    // detailContainer.classList.add("detailedInfo");
    // const productDetailContainer = document.createElement("div");
    // productDetailContainer.setAttribute("id", "productDetail");
    // const name = document.createElement("p");
    // name.setAttribute("id", "productName");
    // name.textContent = data.name;
    // const priceContainer = document.createElement("p");
    // const productPrice = document.createElement("span");
    // productPrice.classList.add("price");
    // productPrice.textContent = data.price;
    // const wonContainer = document.createElement("span");
    // wonContainer.textContent = "원";
    // priceContainer.appendChild(productPrice);
    // priceContainer.appendChild(wonContainer);
    // const descriptContainer = document.createElement("p");
    // descriptContainer.setAttribute("id", "productDescription");
    // descriptContainer.textContent = data.detail;
    // productDetailContainer.appendChild(name);
    // productDetailContainer.appendChild(priceContainer);
    // productDetailContainer.appendChild(descriptContainer);
    // detailContainer.appendChild(productDetailContainer);


    // const buttonGroup = document.createElement("div");
    // buttonGroup.classList.add("buttonGroup");
    // const addCartButton = document.createElement("button");
    // addCartButton.setAttribute("id", "addCart");
    // addCartButton.textContent = "장바구니 추가하기";
    // const buyDirectButton = document.createElement("button");
    // buyDirectButton.setAttribute("id", "buyDirect");
    // buyDirectButton.textContent = "바로 구매하기";
    // buttonGroup.appendChild(addCartButton);
    // buttonGroup.appendChild(buyDirectButton);

    // container.appendChild(detailContainer);
    // container.appendChild(buttonGroup);


  } catch(err){
    console.error(err.stack);
  }
  
}

getData();


const CARTLIST_KEY = "cartList";
  //임시 장바구니
  let addCartList = [];
  //최종 장바구니
  let uniqCartList = [];
  function saveCartList(){
    localStorage.setItem(CARTLIST_KEY, JSON.stringify(uniqCartList));
  }
  //'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
  addCartBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //localStorage에 저장되는 정보입니다.
    //제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
    //추후 수량기능도 추가하여 반영할 예정입니다.

    const thisData = {};
    thisData.name = productName.innerText;
    thisData.price = price.innerText;
    thisData.img = productImage;

    addCartList.push(thisData);

    const isadded = uniqCartList.find(e => e.name === productName);
    if(isadded){
      alert("이미 추가된 상품입니다!")
    } else{
      alert("장바구니에 추가되었습니다.");
    }


    makeAddCartList();
    makeUniq();
    saveCartList();
  })

function makeAddCartList(){
  let existedData = JSON.parse(localStorage.getItem(CARTLIST_KEY));
  if(existedData !== null){
    existedData.forEach(e => {
      addCartList.push(e)
    });
  }
}

function makeUniq(){
  const map = new Map();
  for(const item of addCartList){
    map.set(JSON.stringify(item), item);
  }
  uniqCartList = [...map.values()];
};