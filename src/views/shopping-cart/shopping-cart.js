const payProductQuantity = document.querySelector("#payProductQuantity");
const payProductPrice = document.querySelector("#payProductPrice");
const payShippingPrice = document.querySelector("#payShippingPrice");
const payTotalPrice = document.querySelector("#payTotalPrice");
const totalPriceArrForPay = [];

//localStorage의 데이터를 받아오기
//printArr에 배열로 데이터들을 저장하여 반복문을 돌면서 데이터 펴기
const printArr = [];
printArr.push(JSON.parse(localStorage.getItem("cartList")));

const displayData = () => {
  for(let i = 0; i<printArr[0].length; i++){
    const displaying = document.querySelector(".shoppingListBox");
    const productContainer = document.createElement("div");
    productContainer.classList.add("selectedProduct");

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.name = "check"
    inputCheck.checked = "true";
    inputCheck.classList.add("selectedCheckBox");
    inputCheck.onclick = checkSelectAll;
    //inputCheck.onclick = makingOrder;

    const pushProductImage = document.createElement("img");
    pushProductImage.src = `${printArr[0][i].img}`;
    pushProductImage.classList.add("chocolateImg");
    pushProductImage.alt = "chocolate1";

    const pushProductName = document.createElement("div");
    pushProductName.classList.add("SelectedProductName");
    pushProductName.textContent = `${printArr[0][i].name}`;

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

    const wonPrice = document.createElement("p");
    const priceUnit = document.createElement("span");
    priceUnit.textContent = "원";
    const priceSpan = document.createElement("span");
    priceSpan.classList.add("productPriceSpan");
    priceSpan.textContent = `${printArr[0][i].price}`;
    wonPrice.appendChild(priceSpan);
    wonPrice.appendChild(priceUnit);
    const xIcon = document.createElement("i");
    xIcon.classList.add("fas");
    xIcon.classList.add("fa-thin");
    xIcon.classList.add("fa-xmark");
    const equalIcon = document.createElement("i");
    equalIcon.classList.add("fas");
    equalIcon.classList.add("fa-thin");
    equalIcon.classList.add("fa-equals");

    const totalWonPrice = document.createElement("p");
    const totalPriceUnit = document.createElement("span");
    totalPriceUnit.textContent = "원";
    const totalPriceSpan = document.createElement("span");
    totalPriceSpan.classList.add("totalPrice");
    totalPriceSpan.textContent = `${printArr[0][i].price}`;
    totalWonPrice.appendChild(totalPriceSpan);
    totalWonPrice.appendChild(totalPriceUnit);
    

    const trashIconContiner = document.createElement("div");
    trashIconContiner.classList.add("deleteIcon");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.addEventListener("click", deleteData);
    trashIconContiner.appendChild(trashIcon);

    productContainer.appendChild(inputCheck);
    productContainer.appendChild(pushProductImage);
    productContainer.appendChild(pushProductName);
    modifynumb.appendChild(minusBtn);
    modifynumb.appendChild(changeQuantity);
    modifynumb.appendChild(plusBtn);
    priceBox.appendChild(wonPrice);
    priceBox.appendChild(xIcon);
    priceBox.appendChild(productQuantityNumb);
    priceBox.appendChild(equalIcon);
    priceBox.appendChild(totalWonPrice);
    

    productContainer.appendChild(modifynumb);
    productContainer.appendChild(priceBox);
    productContainer.appendChild(trashIconContiner);

    displaying.appendChild(productContainer);

    totalPriceArrForPay.push(Number(printArr[0][i].price));
  }
  
}

displayData();

//결제 정보창 초기 설정
const totalPriceForPay = totalPriceArrForPay.reduce((prev, next) => prev + next, 0);
const shippingPrice = 3000;
payProductQuantity.innerText = printArr[0].length;
payProductPrice.innerText = totalPriceForPay;
payShippingPrice.innerText = shippingPrice;
payTotalPrice.innerText = Number(payProductPrice.innerText) + Number(payShippingPrice.innerText);


//버튼을 누르면 증가, 감소
function plusQuantity(item){
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  let targetNumber = item.path[1].querySelector(".productQuantity");
  let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
  let selectedPrice = item.path[2].querySelector(".productPriceSpan");
  innerNumb++;

  targetNumber.textContent = innerNumb;
  targetQuantity.textContent = innerNumb;

  const totalPrice = item.path[2].querySelector(".totalPrice");
  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText =  selectedPrice.innerText * innerNumb;

  //+ 버튼을 누르면 다시 활성화
  const minus = item.path[1].querySelector(".minusProductQuantity");
  minus.disabled = false;

  // 결제정보 창에 변경된 수량 반영
  const selectedProduct = document.querySelectorAll(".productQuantity");
  const quantityArr = [];
  for(let i = 0; i<selectedProduct.length;i++){
    quantityArr.push(selectedProduct[i].innerText);
  }
  const sumOfQuantity = quantityArr.reduce( (prev, next) => Number(prev)+ Number(next), 0);
  payProductQuantity.innerText = sumOfQuantity;

  //결제 정보 창에 총가격 표시
  const selectedProductPrice = document.querySelectorAll(".totalPrice");
  const totalPriceArr = [];
  for(let i = 0; i<selectedProductPrice.length;i++){
    totalPriceArr.push(selectedProductPrice[i].innerText);
  }
  const sumOfTotalPrice = totalPriceArr.reduce( (prev, next) => Number(prev)+ Number(next), 0);
  payProductPrice.innerText = sumOfTotalPrice;
  payTotalPrice.innerText = sumOfTotalPrice + 3000;
}

function minusQuantity(item){
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  let targetNumber = item.path[1].querySelector(".productQuantity");
  let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
  let selectedPrice = item.path[2].querySelector(".productPriceSpan");
  innerNumb--;

  targetNumber.textContent = innerNumb;
  targetQuantity.textContent = innerNumb

  const totalPrice = item.path[2].querySelector(".totalPrice");
  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText =  selectedPrice.innerText * innerNumb;

  // 마이너스 수량으로 넘어가지 않도록 구현
  const minus = item.path[1].querySelector(".minusProductQuantity");
  if(innerNumb < 1){
    minus.disabled = true;
    return;
  } else{
    minus.disabled = false;
  }
  payProductQuantity.innerText = totalPrice.innerText;

  // 결제정보 창에 변경된 수량 반영
  const selectedProduct = document.querySelectorAll(".productQuantity");
  const quantityArr = [];
  for(let i = 0; i<selectedProduct.length;i++){
    quantityArr.push(selectedProduct[i].innerText);
  }
  const sumOfQuantity = quantityArr.reduce( (prev, next) => Number(prev)+ Number(next), 0);
  payProductQuantity.innerText = sumOfQuantity;
    
  const selectedProductPrice = document.querySelectorAll(".totalPrice");
  const totalPriceArr = [];
  for(let i = 0; i<selectedProductPrice.length;i++){
    totalPriceArr.push(selectedProductPrice[i].innerText);
  }
  const sumOfTotalPrice = totalPriceArr.reduce( (prev, next) => Number(prev)+ Number(next), 0);
  payProductPrice.innerText = sumOfTotalPrice;
  payTotalPrice.innerText = sumOfTotalPrice + 3000;
}


//전체선택 구현
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");
allSelectedCheckbox.addEventListener("click", selectAll);
function selectAll(){
  if(allSelectedCheckbox.checked == true){
    selectedCheckBox.forEach((check) => check.checked = true);
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

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
function deleteData(item){
  const  targetName = item.path[2].querySelector(".SelectedProductName").innerText;
  const newStorageItem = [];
  const findNotDelete = printArr[0].find(e => e.name !== targetName);
  newStorageItem.push(findNotDelete);

  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));
  
  alert("삭제되었습니다.");

  location.reload();
}

//선택 삭제 클릭하면 선택된 항목 삭제
const deletePart = document.querySelector("#deletePart");
deletePart.addEventListener("click", deletePartFunc);

const deleteChecked = document.querySelectorAll(".selectedCheckBox:checked");
function deletePartFunc(){
  const checkedList = [];
  for(let i = 0; i<deleteChecked.length;i++){
    checkedList.push(deleteChecked[i].parentNode.querySelector(".SelectedProductName").innerText)
  }
  const newStorageItem = [];
  const findNotDelete = printArr[0].find(e => {
    for(let j = 0; j<checkedList.length; j++){
      e.name !== checkedList[j]
    }
  })
  newStorageItem.push(findNotDelete);

  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));
  
  alert("삭제되었습니다.");

  location.reload();
}
