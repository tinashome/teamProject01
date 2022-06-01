const selectedProduct = document.getElementById("selectedProduct")
const selectedPrice = document.getElementById("productPrice");
const modifyQuantity = document.querySelectorAll(".productQuantity");
const chocolateImg = document.getElementById("chocolateImg");
const SelectedProductName = document.getElementById("SelectedProductName");

//localStorage의 데이터를 받아오기
for(let i = 1; i <= localStorage.length; i++){
  const print = JSON.parse(localStorage.getItem(i));
  //localStorage의 가격 입력
  selectedPrice.innerText = print.price;
  chocolateImg.src = print.img;
  SelectedProductName.innerText = print.name
}

//버튼을 누르면 증가, 감소
const plus = document.getElementById("plusProductQuantity");
const minus = document.getElementById("minusProductQuantity");
const totalPrice = document.getElementById("totalPrice");
const payProductQuantity = document.getElementById("payProductQuantity");
const payProductPrice = document.getElementById("payProductPrice");
const payShippingPrice = document.getElementById("payShippingPrice");
const payTotalPrice = document.getElementById("payTotalPrice");

//default값으로 1을 부여 
let orderedQuantity = 1;
modifyQuantity.forEach(i => i.innerText = orderedQuantity);
payProductQuantity.innerText = orderedQuantity;
//default 값으로 가격 * 수량을 보여줌
totalPrice.innerText = selectedPrice.innerText;
payProductPrice.innerText = selectedPrice.innerText;
payShippingPrice.innerText = 3000;
payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText);

// + 버튼을 클릭하면 수량 증가
plus.addEventListener("click", plusQuantity)
//- 버튼을 클릭하면 수량 감소
minus.addEventListener("click", minusQuantity)

function plusQuantity(){
  let modifying = ++orderedQuantity;

  //수량 입력
  modifyQuantity.forEach(i => i.innerText = modifying);

  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText =  selectedPrice.innerText * Number(modifying)

  //결제 정보창에도 반영
  payProductQuantity.innerText = modifying;
  payProductPrice.innerText = totalPrice.innerText;
  payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText)
}

function minusQuantity(){
  let modifying = --orderedQuantity;
  // if(modifying == 1){
  //   minus.disabled = true;
  // }

  //수량 입력
  modifyQuantity.forEach(i => i.innerText = modifying);

  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText = selectedPrice.innerText * modifying

  //결제 정보창에도 반영
  payProductQuantity.innerText = modifying;
  payProductPrice.innerText = totalPrice.innerText;
  payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText)
}

//전체선택 구현
const allSelectedCheckbox = document.getElementById("allSelectedCheckbox");


