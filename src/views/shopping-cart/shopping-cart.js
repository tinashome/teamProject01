const payProductQuantity = document.querySelector("#payProductQuantity");
const payProductPrice = document.querySelector("#payProductPrice");
const payShippingPrice = document.querySelector("#payShippingPrice");
const payTotalPrice = document.querySelector("#payTotalPrice");
const totalPriceArrForPay = [];
const totalQuantityArrForPay = [];

//localStorage의 데이터를 받아오기
//printArr에 배열로 데이터들을 저장하여 반복문을 돌면서 데이터 펴기
const printArr = [];
const localStorageItem = JSON.parse(localStorage.getItem("cartList"));
for (let i = 0; i < localStorageItem.length; i++) {
  printArr.push(localStorageItem[i]);
}
console.log(printArr);
const displayData = () => {
  for (let i = 0; i < printArr.length; i++) {
    // const data = JSON.parse(localStorage.getItem(printArr[0][i]));
    // console.log(data);
    const displaying = document.querySelector(".shoppingListBox");
    const productContainer = document.createElement("div");
    productContainer.classList.add("selectedProduct");

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.name = "check";
    inputCheck.checked = "true";
    inputCheck.classList.add("selectedCheckBox");
    inputCheck.onclick = checkSelectAll;
    //inputCheck.onclick = makingOrder;

    const pushProductImage = document.createElement("img");
    pushProductImage.src = printArr[i].img;
    pushProductImage.classList.add("chocolateImg");
    pushProductImage.alt = "chocolate1";

    const pushProductName = document.createElement("div");
    pushProductName.classList.add("SelectedProductName");
    pushProductName.textContent = printArr[i].name;
    const id = document.createElement("span");
    id.classList.add("id");
    id.textContent = printArr[i].id;
    id.style.display = "none";

    const modifynumb = document.createElement("div");
    modifynumb.classList.add("modifyProductQuantity");

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("minusProductQuantity");
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", minusQuantity);

    const productQuantityNumb = document.createElement("p");
    productQuantityNumb.classList.add("productQuantityNumb");
    productQuantityNumb.textContent = printArr[i].quantity;
    const changeQuantity = document.createElement("p");
    changeQuantity.classList.add("productQuantity");
    changeQuantity.textContent = printArr[i].quantity;

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
    priceSpan.textContent = printArr[i].price;
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
    totalPriceSpan.textContent = printArr[i].price * printArr[i].quantity;
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
    productContainer.appendChild(id);
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

    totalPriceArrForPay.push(
      Number(printArr[i].price) * Number(printArr[i].quantity)
    );
    totalQuantityArrForPay.push(Number(printArr[i].quantity));
  }
};

displayData();

//결제 정보창 초기 설정
const totalPriceForPay = totalPriceArrForPay.reduce(
  (prev, next) => prev + next,
  0
);
const totalQuantityInPayBox = totalQuantityArrForPay.reduce(
  (prev, next) => prev + next,
  0
);
const shippingPrice = 3000;
payProductQuantity.innerText = totalQuantityInPayBox;
payProductPrice.innerText = totalPriceForPay;
payShippingPrice.innerText = shippingPrice;
payTotalPrice.innerText =
  Number(payProductPrice.innerText) + Number(payShippingPrice.innerText);

// const plusButton = document.querySelectorAll(".plusProductQuantity");
// plusButton.forEach((btn) => {
//   btn.addEventListener("click", plusQuantity);
// });
// const minusButton = document.querySelectorAll(".minusProductQuantity");
// minusButton.forEach((btn) => {
//   btn.addEventListener("click", minusQuantity);
// });

//버튼을 누르면 증가, 감소
function plusQuantity(item) {
  const targetNumber = item.path[1].querySelector(".productQuantity");
  const targetQuantity = item.path[2].querySelector(".productQuantityNumb");
  const selectedPrice = item.path[2].querySelector(".productPriceSpan");

  const thisId = item.path[2].querySelector(".id").innerText;
  const newStorageItem = [];
  const findTarget = printArr.find((e) => e.id == thisId);
  findTarget.quantity += 1;
  newStorageItem.push(findTarget);
  const findNotTarget = printArr.find((e) => e.id !== thisId);
  // newStorageItem.push(findNotTarget);
  printArr.length !== 1 ? newStorageItem.push(findNotTarget) : 1;

  newStorageItem.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));
  targetNumber.textContent = findTarget.quantity;
  targetQuantity.textContent = findTarget.quantity;

  const totalPrice = item.path[2].querySelector(".totalPrice");
  //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
  totalPrice.innerText = selectedPrice.innerText * findTarget.quantity;

  //+ 버튼을 누르면 다시 활성화
  const minus = item.path[1].querySelector(".minusProductQuantity");
  minus.disabled = false;

  // 결제정보 창에 변경된 수량 반영
  const findQuantity = newStorageItem.map((e) => e.quantity);
  let totalQuantityForPay = 0;
  findQuantity.forEach((e) => (totalQuantityForPay += e));
  payProductQuantity.innerText = totalQuantityForPay;
  localStorage.setItem("totalQuantity", totalQuantityForPay);

  // const selectedProduct = document.querySelectorAll(".productQuantity");
  // const quantityArr = [];
  // for (let i = 0; i < selectedProduct.length; i++) {
  //   quantityArr.push(selectedProduct[i].innerText);
  // }
  // const sumOfQuantity = quantityArr.reduce(
  //   (prev, next) => Number(prev) + Number(next),
  //   0
  // );
  // console.log({ sumOfQuantity, quantityArr });
  // payProductQuantity.innerText = sumOfQuantity;

  //결제 정보 창에 총가격 표시
  const selectedProductPrice = document.querySelectorAll(".totalPrice");
  const totalPriceArr = [];
  for (let i = 0; i < selectedProductPrice.length; i++) {
    totalPriceArr.push(selectedProductPrice[i].innerText);
  }
  const sumOfTotalPrice = totalPriceArr.reduce(
    (prev, next) => Number(prev) + Number(next),
    0
  );
  payProductPrice.innerText = sumOfTotalPrice;
  payTotalPrice.innerText = sumOfTotalPrice + 3000;
}

function minusQuantity(item) {
  // 값을 가져오는거
  // 위에 값을 1<값 if안에 실행
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  const selectedCheckBox = document.getElementsByClassName("selectedCheckBox");
  console.log(item.path[2].firstChild.checked);
  for (let i = 0; i < selectedCheckBox.length; i++) {}

  if (innerNumb > 1) {
    const targetNumber = item.path[1].querySelector(".productQuantity");
    const targetQuantity = item.path[2].querySelector(".productQuantityNumb");
    const selectedPrice = item.path[2].querySelector(".productPriceSpan");
    const thisId = item.path[2].querySelector(".id").innerText;
    const newStorageItem = [];
    const findTarget = printArr.find((e) => e.id == thisId);
    findTarget.quantity -= 1;
    newStorageItem.push(findTarget);

    const findNotTarget = printArr.find((e) => e.id !== thisId);
    printArr.length !== 1 ? newStorageItem.push(findNotTarget) : 1;
    newStorageItem.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    //localStorage.clear();
    localStorage.setItem("cartList", JSON.stringify(newStorageItem));

    targetNumber.textContent = findTarget.quantity;
    targetQuantity.textContent = findTarget.quantity;
    const totalPrice = item.path[2].querySelector(".totalPrice");
    //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
    totalPrice.innerText = selectedPrice.innerText * findTarget.quantity;

    // 결제정보 창에 변경된 수량 반영
    const findQuantity = newStorageItem.map((e) => e.quantity);
    let totalQuantityForPay = 0;
    findQuantity.forEach((e) => (totalQuantityForPay += e));
    payProductQuantity.innerText = totalQuantityForPay;
    localStorage.setItem("totalQuantity", totalQuantityForPay);
    const productQuantity =
      item.path[2].querySelector(".productQuantity").innerText;
    // 마이너스 수량으로 넘어가지 않도록 구현

    const minus = item.path[1].querySelector(".minusProductQuantity");
    console.log(innerNumb);
    if (innerNumb < 3) {
      minus.disabled = true;
    } else {
      minus.disabled = false;
    }

    //payProductQuantity.innerText = totalPrice.innerText;

    // const selectedProduct = document.querySelectorAll(".productQuantity");
    // const quantityArr = [];
    // for (let i = 0; i < selectedProduct.length; i++) {
    //   quantityArr.push(selectedProduct[i].innerText);
    // }
    // const sumOfQuantity = quantityArr.reduce(
    //   (prev, next) => Number(prev) + Number(next),
    //   0
    // );
    // payProductQuantity.innerText = sumOfQuantity;
    // console.log({ sumOfQuantity, quantityArr });

    const selectedProductPrice = document.querySelectorAll(".totalPrice");
    const totalPriceArr = [];
    for (let i = 0; i < selectedProductPrice.length; i++) {
      totalPriceArr.push(selectedProductPrice[i].innerText);
    }

    const sumOfTotalPrice = totalPriceArr.reduce(
      (prev, next) => Number(prev) + Number(next),
      0
    );
    payProductPrice.innerText = sumOfTotalPrice;
    payTotalPrice.innerText = sumOfTotalPrice + 3000;
  }
}

//전체선택 구현
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");
console.log(selectedCheckBox);
allSelectedCheckbox.addEventListener("click", selectAll);
function selectAll() {
  if (allSelectedCheckbox.checked == true) {
    selectedCheckBox.forEach((check) => (check.checked = true));
  }
  if (allSelectedCheckbox.checked == false) {
    selectedCheckBox.forEach((check) => (check.checked = false));
  }
}
function checkSelectAll() {
  for (let i = 0; i < selectedCheckBox.length; i++) {
    if (selectedCheckBox[i].checked == false) {
      allSelectedCheckbox.checked = false;
      return;
    } else {
      allSelectedCheckbox.checked = true;
    }
  }
}

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
function deleteData(item) {
  const targetid = item.path[2].querySelector(".id").innerText;
  const newStorageItem = [];
  const findNotDelete = printArr.find((e) => e.id !== targetid);
  newStorageItem.push(findNotDelete);
  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));
  location.reload();
}

//선택 삭제 클릭하면 선택된 항목 삭제
const deletePart = document.querySelector("#deletePart");
deletePart.addEventListener("click", deletePartFunc);

const deleteChecked = document.querySelectorAll(".selectedCheckBox:checked");
function deletePartFunc() {
  const checkedList = [];
  for (let i = 0; i < deleteChecked.length; i++) {
    if (deleteChecked[i].checked == true) {
      checkedList.push(
        deleteChecked[i].parentNode.querySelector(".id").innerText
      );
    }
  }
  const newStorageItem = [];
  for (let j = 0; j < checkedList.length; j++) {
    const findNotDelete = printArr.find((e) => e.id !== checkedList[j]);
    newStorageItem.push(findNotDelete);
  }

  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));

  alert("삭제되었습니다.");

  location.reload();
}

const buyButton = document.querySelector("#buyButton");
buyButton.addEventListener("click", () => {
  window.location.href = "/order";
});
