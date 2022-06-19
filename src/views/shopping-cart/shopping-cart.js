import * as Api from "/api.js";
import { addCommas } from "/useful-functions.js";

const payProductQuantity = document.querySelector("#payProductQuantity");
const payProductPrice = document.querySelector("#payProductPrice");
const payShippingPrice = document.querySelector("#payShippingPrice");
const payTotalPrice = document.querySelector("#payTotalPrice");
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const deletePart = document.querySelector("#deletePart");



async function setPayBox () { 
  const items = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = localStorage.key(i)
    const item =  JSON.parse(localStorage.getItem(key));
    item.check===true && items.push(item);
  }
  const totalQuantityInPayBox = items.length;
  const totalPriceForPay = items.reduce((a,c) => a + c.price*c.quantity,0);
  const shippingPrice =  items.length===0 ? 0 : 3000;

  payProductQuantity.innerText = addCommas(totalQuantityInPayBox);
  payProductPrice.innerText = addCommas(totalPriceForPay);
  payShippingPrice.innerText = addCommas(shippingPrice);
  payTotalPrice.innerText = addCommas(shippingPrice + totalPriceForPay);
  
}
loadItems()
checkAllItem()

allSelectedCheckbox.addEventListener("click", (e) => {selectAll(e.target.checked)});
deletePart.addEventListener("click", removeSlectedItem);

async function decreaseQuantity (id) {
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = JSON.parse(myStorage.getItem(key));
    if(id===getStorage.id){
      if(Number(getStorage.quantity) === 1){return;}
      await changeCartQuantity(id, -1, getStorage.name, getStorage.img, getStorage.maxQuantity, getStorage.check)
      return await loadItems()
    }
  }
}

async function increaseQuantity (id) {
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = JSON.parse(myStorage.getItem(key));
    if(id===getStorage.id){
      await changeCartQuantity(id, 1, getStorage.name, getStorage.img, getStorage.maxQuantity, getStorage.check)
      return await loadItems()
    }
  }
}

async function checkAllItem(){
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = JSON.parse(myStorage.getItem(key));
    const {id, price, quantity, name, img, maxQuantity} = getStorage;
    await localStorage.setItem(key, JSON.stringify({
      id, price, quantity, name, img, maxQuantity, check:true
    }));
  }
  return await loadItems()
}

async function selectAll(checked){
  await checkItem(0,checked);
  // await loadItems()
}

async function checkItem(id,checked){
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = JSON.parse(myStorage.getItem(key));
    if (id === getStorage.id || id === 0) {
      const {id, price, quantity, name, img, maxQuantity, check} = getStorage;
			localStorage.setItem(key, JSON.stringify({
        id, price, quantity, name, img, maxQuantity, check:checked
      }));
      await loadItems()
		}
  }
}
// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
async function removeItem(id){
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = await JSON.parse(myStorage.getItem(key));
    if (id === getStorage.id) {
      await localStorage.removeItem(key);
      await loadItems()
      return
		}
  }
}

//선택 삭제 클릭하면 선택된 항목 삭제
async function removeSlectedItem(){
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
  for (let i = cartLen -1 ; i >= 0; i--) {
    const key = await localStorage.key(i)
		const getStorage = await JSON.parse(myStorage.getItem(key));
    console.log(getStorage)
    console.log(i,getStorage.check)
    if (getStorage.check === true) {
      await localStorage.removeItem(key);
		}
  }
  await loadItems()
}

const deleteChecked = document.querySelectorAll(".selectedCheckBox");


// 결제버튼 클릭시
const buyButton = document.querySelector("#buyButton");
buyButton.addEventListener("click", () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("상품 구매는 로그인한 유저만 가능합니다.");
    window.location.href = "/login";
    return;
  }
  let getLocal = JSON.parse(localStorage.getItem("cartList"));
  let setLocalStorage = [];
  getLocal.forEach((x) => {
    if (Number(x.quantity) !== 0) {
      setLocalStorage.push(x);
    }
  });
  if (setLocalStorage.length !== 0) {
    localStorage.setItem("cartList", JSON.stringify(setLocalStorage));
    window.location.href = "/order";
  } else {
    alert("상품수량을 확인하세요");
  }
});

async function displayItem (item) {
  // const data = await Api.get(`/api/product/${item.id}`);
  const displaying = document.querySelector(".shoppingListBox");
  const productContainer = document.createElement("div");
  productContainer.classList.add("selectedProduct");
  productContainer.setAttribute("_id",item.id);

  const inputCheck = document.createElement("input");
  inputCheck.type = "checkbox";
  inputCheck.name = "check";
  inputCheck.checked = item.check;
  inputCheck.classList.add("selectedCheckBox");
  inputCheck.setAttribute("_id",item.id);
  inputCheck.addEventListener("click", (e)=>{checkItem(item.id,e.target.checked)});

  const pushProductImage = document.createElement("img");
  pushProductImage.src = item.img;
  pushProductImage.classList.add("chocolateImg");
  pushProductImage.alt = "chocolate1";

  const pushProductName = document.createElement("div");
  pushProductName.classList.add("SelectedProductName");
  pushProductName.textContent = item.name;
  const id = document.createElement("span");
  id.classList.add("id");
  id.textContent = item.id;
  id.style.display = "none";

  const modifynumb = document.createElement("div");
  modifynumb.classList.add("modifyProductQuantity");

  const minusBtn = document.createElement("button");
  minusBtn.classList.add("decreaseBtn");
  minusBtn.textContent = "-";
  minusBtn.setAttribute("_id",item.id)
  minusBtn.addEventListener("click", ()=>{ decreaseQuantity(plusBtn.getAttribute("_id"))});

  const productQuantity = document.createElement("p");
  productQuantity.classList.add("productQuantityNumb");
  productQuantity.textContent = item.quantity;
  productQuantity.setAttribute("_id",item.id)
  const changeQuantity = document.createElement("p");
  changeQuantity.classList.add("productQuantity");
  changeQuantity.setAttribute("_id",item.id);
  changeQuantity.textContent = item.quantity;

  const plusBtn = document.createElement("button");
  plusBtn.classList.add("increaseBtn");
  plusBtn.textContent = "+";
  plusBtn.setAttribute("_id",item.id);
  plusBtn.addEventListener("click", ()=>{ increaseQuantity(plusBtn.getAttribute("_id"))});

  const priceBox = document.createElement("div");
  priceBox.classList.add("selectedPrice");

  const itemPrice = document.createElement("p");
  const priceSpan = document.createElement("span");
  priceSpan.classList.add("productPriceSpan");
  priceSpan.textContent = `${addCommas(item.price)}원`;
  itemPrice.appendChild(priceSpan);

  const xIcon = document.createElement("i");
  xIcon.classList.add("fas");
  xIcon.classList.add("fa-thin");
  xIcon.classList.add("fa-xmark");
  const equalIcon = document.createElement("i");
  equalIcon.classList.add("fas");
  equalIcon.classList.add("fa-thin");
  equalIcon.classList.add("fa-equals");

  const totalPrice = document.createElement("p");
  const totalPriceSpan = document.createElement("span");
  totalPriceSpan.classList.add("totalPrice");
  totalPriceSpan.textContent = `${addCommas(item.price * item.quantity)}원`;

  totalPrice.appendChild(totalPriceSpan);

  const trashIconContiner = document.createElement("div");
  trashIconContiner.classList.add("deleteIcon");
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fas");
  trashIcon.setAttribute("_id",item.id);
  trashIcon.classList.add("fa-trash-can");
  trashIcon.addEventListener("click", ()=>{ removeItem(trashIcon.getAttribute("_id"))});
  trashIconContiner.appendChild(trashIcon);

  productContainer.appendChild(inputCheck);
  productContainer.appendChild(pushProductImage);
  productContainer.appendChild(pushProductName);
  productContainer.appendChild(id);
  modifynumb.appendChild(minusBtn);
  modifynumb.appendChild(changeQuantity);
  modifynumb.appendChild(plusBtn);
  priceBox.appendChild(itemPrice);
  priceBox.appendChild(xIcon);
  priceBox.appendChild(productQuantity);
  priceBox.appendChild(equalIcon);
  priceBox.appendChild(totalPrice);

  productContainer.appendChild(modifynumb);
  productContainer.appendChild(priceBox);
  productContainer.appendChild(trashIconContiner);
  displaying.appendChild(productContainer);
}

async function loadItems () {
  const displaying = document.querySelector(".shoppingListBox");
  while (displaying.hasChildNodes()){displaying.removeChild( displaying.firstChild )};
  const items = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = localStorage.key(i)
    const item =  JSON.parse(localStorage.getItem(key));
    items.push(item);
    await displayItem (item)
  }
  setPayBox () 

  // const totalQuantityInPayBox = items.length;
  // const totalPriceForPay = items.reduce((a,c) => a + c.price*c.quantity,0);
  // const shippingPrice =  items.length===0 ? 0 : 3000;

  // payProductQuantity.innerText = addCommas(totalQuantityInPayBox);
  // payProductPrice.innerText = addCommas(totalPriceForPay);
  // payShippingPrice.innerText = addCommas(shippingPrice);
  // payTotalPrice.innerText = addCommas(shippingPrice + totalPriceForPay);
}

async function changeCartQuantity(id, quantity, name, img, maxQuantity, check) {
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
	for (let i = 0; i < cartLen; i++) {
    const key = localStorage.key(i)
		const getStorage = JSON.parse(myStorage.getItem(key));
		const getStorageQuantity = getStorage.quantity;
    const getStoragePrice = getStorage.price;
		const setStorageQuantity = Number(getStorageQuantity) + Number(quantity);
		if (id === getStorage.id) {
			localStorage.setItem(key, JSON.stringify({ 
        id, price:getStoragePrice, quantity: setStorageQuantity, name, img, maxQuantity, check
      }));
			return ;
		}
	}
}