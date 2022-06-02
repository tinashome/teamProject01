//localStorage의 데이터를 받아오기
//printArr에 배열로 데이터들을 저장하여 반복문을 돌면서 데이터 펴기
const printArr = [];
for(let i = 1; i <= localStorage.length; i++){
  printArr.push(JSON.parse(localStorage.getItem(i)));
};
for(let j = 0; j < printArr.length; j++){
    const displaying = document.querySelector(".shoppingListBox");
    displaying.innerHTML = `              
            <div id="selectedProduct">
              <input type="checkbox" class="selectedCheckBox" checked = "true">
              <img id="chocolateImg" src = ${printArr[j].img} alt="chocolate1">
              <div id="SelectedProductName">
                ${printArr[j].name}
              </div>
  
              <div id="modifyProductQuantity">
                <button id="minusProductQuantity">-</button>
                <p class="productQuantity"></p>
                <button id="plusProductQuantity">+</button>
              </div>
              <div id="selectedPrice">
                <p><span id="productPrice">${printArr[j].price}</span>원</p>
                <i class="fas fa-thin fa-xmark"></i>
                <p class="productQuantity"></p>
                <i class="fas fa-thin fa-equals"></i>
                <p><span id="totalPrice"></span>원</p>
              </div>
              <div id="deleteIcon">
                <i class="fas fa-trash-can"></i>
              </div>
            </div>          
          </div>
  `
}



const selectedPrice = document.getElementById("productPrice");
const modifyQuantity = document.querySelectorAll(".productQuantity");

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
modifyQuantity.forEach( modify => modify.innerText = orderedQuantity);
payProductQuantity.innerText = orderedQuantity;
//default 값으로 가격 * 수량을 보여줌
totalPrice.innerText = selectedPrice.innerText;
payProductPrice.innerText = selectedPrice.innerText;
payShippingPrice.innerText = 3000;
payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText);

// + 버튼을 클릭하면 수량 증가, - 버튼을 클릭하면 수량 감소
plus.addEventListener("click", plusQuantity)
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
//error1: 수량이 0이되면 - 버튼 disabled, 다시 1이 되면 disabled=false
  if(modifying == 0){
    minus.disabled = true;
  } else if(modifying > 0){
    minus.disabled = false;
  }

  //수량 입력
  modifyQuantity.forEach(quantity => quantity.innerText = modifying);

  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText = selectedPrice.innerText * modifying

  //결제 정보창에도 반영
  payProductQuantity.innerText = modifying;
  payProductPrice.innerText = totalPrice.innerText;
  payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText)
}


//전체선택 구현
const allSelectedCheckbox = document.getElementById("allSelectedCheckbox");
allSelectedCheckbox.addEventListener("click", selectAll)
function selectAll(){
  const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");
  if(allSelectedCheckbox.checked == true){
    selectedCheckBox.forEach((check) => check.checked = true)
  }
  if(allSelectedCheckbox.checked == false){
    selectedCheckBox.forEach((check) => check.checked = false)
  }
}

//fake data
localStorage.setItem(2, JSON.stringify({name: "loyal chocolate", price: 4000, img:"http://127.0.0.1:5500/src/views/elice-rabbit.png"}))

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
const deleteIcon = document.getElementById("deleteIcon");

deleteIcon.addEventListener("click", () => {
  const productName = document.getElementById("SelectedProductName").innerText;
  for(let i = 1; i <= localStorage.length; i++){
    const foundArr = []
    const findKeyNumber = foundArr.push(JSON.parse(localStorage.getItem(i)));
    console.log(foundArr);
  }
  //localStorage.removeItem()
})