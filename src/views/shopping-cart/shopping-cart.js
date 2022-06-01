//localStorage의 데이터를 받아오기
for(let i = 1; i <= localStorage.length; i++){
  const print = JSON.parse(localStorage.getItem(i));

  const displaying = document.querySelector(".shoppingCartMainBox");
  displaying.innerHTML = `
        <div class="shoppingListBox">
              <!-- 전체삭제 | 선택삭제 -->
              <div class="shoppingListHeader">
                <label class="checkbox">
                  <input type="checkbox" id="allSelectedCheckbox" checked = "true">
                  <p>전체선택</p>
                </label>
                <label class="seperator">
                  <span>|</span>
                </label>
                <label id="deletePart">
                  <p>선택삭제</p>
                </label>
              </div>
              
              <!-- 장바구니 목록 -->
              <div id="selectedProduct">
                <input type="checkbox" class="selectedCheckBox" checked = "true">
                <img id="chocolateImg" src = ${print.img} alt="chocolate1">
                <div id="SelectedProductName">
                  ${print.name}
                </div>

                <div id="modifyProductQuantity">
                  <button id="minusProductQuantity">-</button>
                  <p class="productQuantity"></p>
                  <button id="plusProductQuantity">+</button>
                </div>
                <div id="selectedPrice">
                  <p><span id="productPrice">${print.price}</span>원</p>
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
modifyQuantity.forEach(i => i.innerText = orderedQuantity);
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
  if(modifying == 0){
    minus.disabled = true;
  } else if(modifying > 0){
    minus.disabled = false;
  }

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
