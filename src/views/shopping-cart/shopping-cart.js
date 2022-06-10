import { addCommas } from "/useful-functions.js";

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

// 로딩시 페이지 구현
const displayData = () => {
  for (let i = 0; i < printArr.length; i++) {
    const displaying = document.querySelector(".shoppingListBox");
    const productContainer = document.createElement("div");
    productContainer.classList.add("selectedProduct");

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.name = "check";
    inputCheck.checked = "true";
    inputCheck.classList.add("selectedCheckBox");
    inputCheck.addEventListener("click", checkSelectAll);

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

payTotalPrice.innerText = shippingPrice + totalPriceForPay;

//버튼을 누르면 증가, 감소
function plusQuantity(item) {
  // 체크박스에 체크확인
  if (item.path[2].firstChild.checked) {
    let targetNumber = item.path[1].querySelector(".productQuantity");
    let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
    let selectedPrice = item.path[2].querySelector(".productPriceSpan");

    const thisId = item.path[2].querySelector(".id").innerText;

    //로컬스토리지 설정
    let getLocal = JSON.parse(localStorage.getItem("cartList"));

    let findTarget;
    getLocal.forEach((x) => {
      if (x.id == thisId) {
        x.quantity = Number(x.quantity) + 1;
        findTarget = x.quantity;
      }
    });

    localStorage.setItem("cartList", JSON.stringify(getLocal));
    targetNumber.textContent = findTarget;
    targetQuantity.textContent = findTarget;

    const totalPrice = item.path[2].querySelector(".totalPrice");
    //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
    totalPrice.innerText = Number(selectedPrice.innerText) * Number(findTarget);

    //+ 버튼을 누르면 다시 활성화
    const minus = item.path[1].querySelector(".minusProductQuantity");
    minus.disabled = false;

    let getPayProductQuantity = document.getElementById("payProductQuantity");
    getPayProductQuantity.textContent =
      Number(getPayProductQuantity.textContent) + 1;
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
  } else {
    let targetNumber = item.path[1].querySelector(".productQuantity");
    targetNumber.textContent = Number(targetNumber.innerText) + 1;
    let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
    targetQuantity.textContent = Number(targetQuantity.innerText) + 1;
    let totalPrice = item.path[2].querySelector(".totalPrice");
    let selectedPrice = item.path[2].querySelector(".productPriceSpan");
    totalPrice.innerText =
      Number(totalPrice.innerText) + Number(selectedPrice.innerText);
  }
}

function minusQuantity(item) {
  let innerNumb = item.path[1].querySelector(".productQuantity").innerText;
  // 1보다 작을시 버튼 클릭 금지
  if (innerNumb > 1) {
    if (item.path[2].firstChild.checked) {
      let targetNumber = item.path[1].querySelector(".productQuantity");
      let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
      let selectedPrice = item.path[2].querySelector(".productPriceSpan");

      const thisId = item.path[2].querySelector(".id").innerText;

      // 로컬스토리지에서 박스랑 id같은걸 찾기
      let getLocal = JSON.parse(localStorage.getItem("cartList"));

      let findTarget;
      getLocal.forEach((x) => {
        if (x.id == thisId) {
          x.quantity = Number(x.quantity) - 1;
          findTarget = x.quantity;
        }
      });

      localStorage.setItem("cartList", JSON.stringify(getLocal));
      targetNumber.textContent = findTarget;
      targetQuantity.textContent = findTarget;

      const totalPrice = item.path[2].querySelector(".totalPrice");
      //주문 수량과 가격을 곱하여 해당 상품의 총 금액을 보여줌
      totalPrice.innerText =
        Number(selectedPrice.innerText) * Number(findTarget);

      //+ 버튼을 누르면 다시 활성화
      const minus = item.path[1].querySelector(".minusProductQuantity");
      minus.disabled = false;

      let getPayProductQuantity = document.getElementById("payProductQuantity");
      getPayProductQuantity.textContent =
        Number(getPayProductQuantity.textContent) - 1;
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
    } else {
      let targetNumber = item.path[1].querySelector(".productQuantity");
      targetNumber.textContent = targetNumber.innerText - 1;
      let targetQuantity = item.path[2].querySelector(".productQuantityNumb");
      targetQuantity.textContent = targetQuantity.innerText - 1;
      let totalPrice = item.path[2].querySelector(".totalPrice");
      let selectedPrice = item.path[2].querySelector(".productPriceSpan");
      totalPrice.innerText =
        Number(totalPrice.innerText) - Number(selectedPrice.innerText);
    }
  }
}

//전체선택 구현
const allSelectedCheckbox = document.querySelector("#allSelectedCheckbox");
const selectedCheckBox = document.querySelectorAll(".selectedCheckBox");

allSelectedCheckbox.addEventListener("click", selectAll);
function selectAll(item) {
  let getLocal = JSON.parse(localStorage.getItem("cartList"));
  let getLocalTotal = JSON.parse(localStorage.getItem("totalQuantity"));
  let getPayQuantity = document.getElementById("payProductQuantity");
  let getPay = document.getElementById("payProductPrice");
  let getPayTotal = document.getElementById("payTotalPrice");

  if (allSelectedCheckbox.checked == true) {
    selectedCheckBox.forEach((x) => {
      // 체크박스중에 false일때만
      if (x.checked == false) {
        const id = x.parentNode.querySelector(".id").innerText;

        getLocal.forEach((y) => {
          if (y.id === id) {
            y.quantity =
              Number(y.quantity) +
              Number(x.parentNode.querySelector(".productQuantity").innerText);
            getLocalTotal += Number(
              x.parentNode.querySelector(".productQuantity").innerText
            );
            getPayQuantity.innerText =
              Number(getPayQuantity.innerText) +
              Number(x.parentNode.querySelector(".productQuantity").innerText);

            getPay.innerText =
              Number(getPay.innerText) +
              Number(x.parentNode.querySelector(".totalPrice").innerText);
            getPayTotal.innerText =
              Number(getPayTotal.innerText) +
              Number(x.parentNode.querySelector(".totalPrice").innerText);
          }
        });
      }
      x.checked = true;
    });
    localStorage.setItem("cartList", JSON.stringify(getLocal));
    localStorage.setItem("totalQuantity", JSON.stringify(getLocalTotal));
  } else if (allSelectedCheckbox.checked == false) {
    selectedCheckBox.forEach((x) => {
      if (x.checked == true) {
        const id = x.parentNode.querySelector(".id").innerText;
        getLocal.forEach((y) => {
          if (y.id === id) {
            y.quantity =
              Number(y.quantity) -
              Number(x.parentNode.querySelector(".productQuantity").innerText);
            getLocalTotal -= Number(
              x.parentNode.querySelector(".productQuantity").innerText
            );
            getPayQuantity.innerText =
              Number(getPayQuantity.innerText) -
              Number(x.parentNode.querySelector(".productQuantity").innerText);
            getPay.innerText =
              Number(getPay.innerText) -
              Number(x.parentNode.querySelector(".totalPrice").innerText);
            getPayTotal.innerText =
              Number(getPayTotal.innerText) -
              Number(x.parentNode.querySelector(".totalPrice").innerText);
          }
        });
      }
      x.checked = false;
    });
    localStorage.setItem("cartList", JSON.stringify(getLocal));
    localStorage.setItem("totalQuantity", JSON.stringify(getLocalTotal));
  }
}

// 전체말고 선택창
function checkSelectAll(item) {
  let getLocal = JSON.parse(localStorage.getItem("cartList"));
  let id = item.path[1].querySelector(".id").innerText;
  if (item.path[0].checked == false) {
    allSelectedCheckbox.checked = false;

    payProductQuantity.innerText -=
      item.path[1].childNodes[4].childNodes[1].innerText;

    payProductPrice.innerText -=
      item.path[1].childNodes[5].childNodes[4].childNodes[0].innerText;
    payTotalPrice.innerText -=
      item.path[1].childNodes[5].childNodes[4].childNodes[0].innerText;
    getLocal.forEach((x) => {
      if (x.id == id) {
        x.quantity =
          Number(x.quantity) -
          Number(item.path[1].childNodes[4].childNodes[1].innerText);
      }
    });
    localStorage.setItem("cartList", JSON.stringify(getLocal));
  } else {
    let trueCnt = 0;
    for (let i = 0; i < selectedCheckBox.length; i++) {
      if (selectedCheckBox[i].checked === true) {
        trueCnt += 1;
      }
    }
    if (trueCnt == selectedCheckBox.length) {
      allSelectedCheckbox.checked = true;
    }

    payProductQuantity.innerText =
      Number(payProductQuantity.innerText) +
      Number(item.path[1].childNodes[4].childNodes[1].innerText);
    payProductPrice.innerText =
      Number(payProductPrice.innerText) +
      Number(item.path[1].childNodes[5].childNodes[4].childNodes[0].innerText);
    payTotalPrice.innerText =
      Number(payTotalPrice.innerText) +
      Number(item.path[1].childNodes[5].childNodes[4].childNodes[0].innerText);

    getLocal.forEach((x) => {
      if (x.id == id) {
        x.quantity =
          Number(x.quantity) +
          Number(item.path[1].childNodes[4].childNodes[1].innerText);
      }
    });

    localStorage.setItem("cartList", JSON.stringify(getLocal));
  }
}

// 휴지통 버튼을 누르면 localStorage에서 데이터 삭제
function deleteData(item) {
  const targetid = item.path[2].querySelector(".id").innerText;

  let getLocal = JSON.parse(localStorage.getItem("cartList"));
  let newStorageItem;
  const findNotDelete = getLocal.filter((e) => e.id !== targetid);
  newStorageItem = findNotDelete;
  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(newStorageItem));
  location.reload();
}

//선택 삭제 클릭하면 선택된 항목 삭제
const deletePart = document.querySelector("#deletePart");

deletePart.addEventListener("click", deletePartFunc);

const deleteChecked = document.querySelectorAll(".selectedCheckBox");

function deletePartFunc() {
  let getLocal = JSON.parse(localStorage.getItem("cartList"));
  // 체크가 되어있는 id값
  let checkedList = [];

  for (let i = 0; i < deleteChecked.length; i++) {
    if (deleteChecked[i].checked == true) {
      checkedList.push(
        deleteChecked[i].parentNode.querySelector(".id").innerText
      );

      deleteChecked[i].parentNode.remove();
    }
  }
  let ffff = [];
  let payInfoChange = [];
  getLocal.forEach((x) => {
    if (!checkedList.includes(x.id)) {
      ffff.push(x);
    } else {
      payInfoChange.push(x);
    }
  });

  localStorage.clear();
  localStorage.setItem("cartList", JSON.stringify(ffff));

  alert("삭제되었습니다.");
}

// 결제버튼 클릭시
const buyButton = document.querySelector("#buyButton");
buyButton.addEventListener("click", () => {
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
