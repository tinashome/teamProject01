import * as Api from "/api.js";
import { addCommas } from "/useful-functions.js";

const addCartBtn = document.querySelector("#addCart");
const buyDirectBtn = document.querySelector("#buyDirect");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const productImage = document.querySelector("#chocolate");
const productDescription = document.querySelector("#productDescription");
const numQuantity = document.querySelector("#numQuantity");
const decreaseBtn = document.querySelector("#decreaseBtn");
const increaseBtn = document.querySelector("#increaseBtn");
const numInput = document.querySelector("#numInput");

const cartDivCloseBtn = document.querySelector("#cartDivCloseBtn");
const cartDiv = document.querySelector("#cartDiv");
const modal = document.querySelector("#modal");
const goToCart = document.querySelector("#goToCart");
const closeCartDiv = document.querySelector("#closeCartDiv");

const path = window.location.pathname.split("/");
const productId = path[path.length - 2];

cartDivCloseBtn.addEventListener("click", cartDivToggle);
closeCartDiv.addEventListener("click", cartDivToggle);
goToCart.addEventListener("click", () => {
	window.location.href = "/buydirectorder";
});

//제품정보 저장
const reqProductInfo = await fetch(`/api/product/${productId}`, {
	headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
});
const productInfo = await reqProductInfo.json();

getData();
removeBuyDirect();
buyDirectBtn.addEventListener("click", buyDirect);
addCartBtn.addEventListener("click", () => {
	addCart(productInfo._id, productInfo.price, numInput.value);
});

async function getData() {
	try {
		const data = await Api.get(`/api/product/${productId}`);
		productName.textContent = data.name;
		price.textContent = addCommas(data.price);
		productImage.src = data.img;
		productDescription.textContent = data.detail;
		productSummary.textContent = data.summary;
		numQuantity.textContent = data.quantity;
	} catch (err) {
		console.error(err.stack);
	}
}

//바로구매하기
async function buyDirect() {
	await localStorage.setItem("buyDirect", JSON.stringify({ id: productInfo._id, price: productInfo.price, quantity: numInput.value }));
	window.location.href = "/buydirectorder";
}
//로컬저장소의 바로구매 비우기
async function removeBuyDirect() {
	await localStorage.removeItem("buyDirect");
}

decreaseBtn.addEventListener("click", () => {
	const curNumInput = Number(numInput.value);
	if (curNumInput !== 1) {
		numInput.value = curNumInput - 1;
		price.textContent = addCommas(productInfo.price * numInput.value);
	}
});
increaseBtn.addEventListener("click", () => {
	const curNumInput = Number(numInput.value);
	if (curNumInput !== Number(numQuantity.textContent)) {
		numInput.value = curNumInput + 1;
		price.textContent = addCommas(productInfo.price * numInput.value);
	}
});

async function addCart(id, price, quantity) {
	cartDivToggle();
	removeBuyDirect();
	const myStorage = await window.localStorage;
	const cartLen = myStorage.length;
	for (let i = 0; i < cartLen; i++) {
		const getStorage = JSON.parse(myStorage.getItem(i));
		const getStorageQuantity = getStorage.quantity;
		const setStorageQuantity = Number(getStorageQuantity) + Number(quantity);
		if (id === getStorage.id) {
			localStorage.setItem(i, JSON.stringify({ id, price, quantity: setStorageQuantity }));
			return;
		}
	}
	localStorage.setItem(cartLen, JSON.stringify({ id, price, quantity }));
}

async function cartDivToggle() {
	if (cartDiv.style.display === "none") {
		cartDiv.style.display = "block";
		modal.style.display = "block";
	} else {
		cartDiv.style.display = "none";
		modal.style.display = "none";
	}
};