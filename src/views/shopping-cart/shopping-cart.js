
//localStorage의 데이터를 받아오기
//printArr에 배열로 데이터들을 저장하여 반복문을 돌면서 데이터 펴기
const printArr = [];
for(let i = 1; i <= localStorage.length; i++){
  printArr.push(JSON.parse(localStorage.getItem(i)));
};
const displayData = () => {
  for(let j = 0; j < printArr.length; j++){
    const displaying = document.querySelector(".shoppingListBox");
    const productContainer = document.createElement("div");
    productContainer.setAttribute("id", "selectedProduct");

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.checked = "true";
    inputCheck.classList.add("selectedCheckBox");
    inputCheck.onclick = checkSelectAll;

    const pushProductImage = document.createElement("img");
    pushProductImage.src = `${printArr[j].img}`;
    pushProductImage.classList.add("chocolateImg");
    pushProductImage.alt = "chocolate1";

    const pushProductName = document.createElement("div");
    pushProductName.classList.add("SelectedProductName");
    pushProductName.textContent = `${printArr[j].name}`;

    const modifynumb = document.createElement("div");
    modifynumb.classList.add("modifyProductQuantity");
    

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("minusProductQuantity");
    minusBtn.textContent = "-";
    minusBtn.onclick = minusQuantity;

    const productQuantityNumb = document.createElement("p");
    productQuantityNumb.classList.add("productQuantityNumb");
    productQuantityNumb.textContent = 1;
    const changeQuantity = document.createElement("p");
    changeQuantity.classList.add("productQuantity");
    changeQuantity.textContent = 1;

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("plusProductQuantity");
    plusBtn.textContent = "+";
    plusBtn.onclick = plusQuantity;

    const priceBox = document.createElement("div");
    priceBox.classList.add("selectedPrice");

    const wonP = document.createElement("p");
    const won = document.createElement("span");
    won.textContent = "원";
    const priceSpan = document.createElement("span");
    priceSpan.classList.add("productPriceSpan");
    priceSpan.textContent = `${printArr[j].price}`;
    wonP.appendChild(priceSpan);
    wonP.appendChild(won);
    const xIcon = document.createElement("i");
    xIcon.classList.add("fas");
    xIcon.classList.add("fa-thin");
    xIcon.classList.add("fa-xmark");
    const equalIcon = document.createElement("i");
    equalIcon.classList.add("fas");
    equalIcon.classList.add("fa-thin");
    equalIcon.classList.add("fa-equals");

    const totalWonP = document.createElement("p");
    const totalWon = document.createElement("span");
    totalWon.textContent = "원";
    const totalPriceSpan = document.createElement("span");
    totalPriceSpan.classList.add("totalPrice");
    totalPriceSpan.textContent = `${printArr[j].price}`;
    totalWonP.appendChild(totalPriceSpan);
    totalWonP.appendChild(totalWon);
   

    const trashIconContiner = document.createElement("div");
    trashIconContiner.classList.add("deleteIcon");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.onclick = deleteData;
    trashIconContiner.appendChild(trashIcon);

    productContainer.appendChild(inputCheck);
    productContainer.appendChild(pushProductImage);
    productContainer.appendChild(pushProductName);
    modifynumb.appendChild(minusBtn);
    modifynumb.appendChild(changeQuantity);
    modifynumb.appendChild(plusBtn);
    priceBox.appendChild(wonP);
    priceBox.appendChild(xIcon);
    priceBox.appendChild(productQuantityNumb);
    priceBox.appendChild(equalIcon);
    priceBox.appendChild(totalWonP);
    

    productContainer.appendChild(modifynumb);
    productContainer.appendChild(priceBox);
    productContainer.appendChild(trashIconContiner);

    displaying.appendChild(productContainer);
}}
displayData();



const selectedPrice = document.querySelector(".productPriceSpan");
// const modifyQuantity = document.querySelectorAll(".productQuantity");

//버튼을 누르면 증가, 감소
const payProductQuantity = document.querySelector("#payProductQuantity");
const payProductPrice = document.querySelector("#payProductPrice");
const payShippingPrice = document.querySelector("#payShippingPrice");
const payTotalPrice = document.querySelector("#payTotalPrice");

//default 값으로 가격 * 수량을 보여줌
payProductPrice.innerText = selectedPrice.innerText;
payShippingPrice.innerText = 3000;
payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText);

let modifying = 1;
function plusQuantity(item){
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  let targetNumber = item.path[1].querySelector(".productQuantity");
  let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
  innerNumb++;

  targetNumber.textContent = innerNumb;
  targetQuantity.textContent = innerNumb;

  const totalPrice = item.path[2].querySelector(".totalPrice");
  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText =  selectedPrice.innerText * innerNumb;

  //+ 버튼을 누르면 다시 활성화
  const minus = item.path[1].querySelector(".minusProductQuantity");
  minus.disabled = false;
}

function minusQuantity(item){
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  let targetNumber = item.path[1].querySelector(".productQuantity");
  let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
  innerNumb--;

  targetNumber.textContent = innerNumb;
  targetQuantity.textContent = innerNumb

  const totalPrice = item.path[2].querySelector(".totalPrice");
  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText =  selectedPrice.innerText * innerNumb;

  // 마이너스 수량으로 넘어가지 않도록 구현
  const minus = item.path[1].querySelector(".minusProductQuantity");
  if(innerNumb<1){
    minus.disabled = true;
    return;
  } else{
    minus.disabled = false;
  }

  // 주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  //totalPrice.innerText = selectedPrice.innerText * modifying
}


  // //결제 정보창에도 반영
  // payProductQuantity.innerText = modifying;
  // payProductPrice.innerText = totalPrice.innerText;
  // payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText)

//전체선택 구현
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");
allSelectedCheckbox.addEventListener("click", selectAll);
function selectAll(){
  if(allSelectedCheckbox.checked == true){
    selectedCheckBox.forEach((check) => check.checked = true)
  }
  if(allSelectedCheckbox.checked == false){
    selectedCheckBox.forEach((check) => check.checked = false);
  }
}
function checkSelectAll(){
  for(let i = 0; i< selectedCheckBox.length; i++){
    if(selectedCheckBox[i].checked == false){
      allSelectedCheckbox.checked = false;
      return;
    } else{
      allSelectedCheckbox.checked = true;
    }
  }
}


//fake data
localStorage.setItem(2, JSON.stringify({name: "loyal chocolate", price: 4000, img:"http://127.0.0.1:5500/src/views/elice-rabbit.png"}))

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
const deleteIcon = document.querySelector(".deleteIcon");
function deleteData(item){
  alert("삭제되었습니다.");
  item.path[2].style.display = "none";
}

