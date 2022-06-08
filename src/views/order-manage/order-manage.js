import * as Api from "/api.js";
const body = document.getElementsByTagName("body")[0];
async function getDate() {
  const getData = await Api.get("/api/orders");

  dataArr(getData);
  Ordertotal();
  gettingReadyCnt();
  deliveringCnt();
  deliveryCompletedCnt();
  a();
}
getDate();

// 주문정보가 담긴 박스 생성
function dataArr(getData) {
  for (let i = 0; i < getData.length; i++) {
    const splitDate = getData[i].createdAt;
    const date = splitDate.substr(0, 10);
    const listProduct = getData[i].summaryTitle;
    const userStatus = getData[i].status;
    const productId = getData[i].orderId;
    const totalAmount = getData[i].totalPrice;

    // 전체감싸기
    const wrapper = document.createElement("dev");
    wrapper.classList.add("creatOrderInquiryWrapper");
    wrapper.setAttribute("id", "order-629428a0eb5d1ed00c61f51c");

    // 날짜
    const orderDate = document.createElement("dev");
    orderDate.classList.add("orderInfo");
    orderDate.textContent = date;

    // 상품
    const orderProduct = document.createElement("div");
    orderProduct.classList.add("orderInfo");
    orderProduct.textContent = listProduct;

    // 총액
    const orderAmount = document.createElement("div");
    orderAmount.classList.add("orderInfo");
    orderAmount.textContent = totalAmount;

    // select
    const selectWrapper = document.createElement("div");
    selectWrapper.classList.add("orderInfo");

    const select = document.createElement("select");
    // select.classList.add("has-background-danger-light", "has-text-danger")
    select.setAttribute("id", "statusSelectBox-628c85a9ae629ef7dc9d7dfe");
    select.setAttribute("class", "select");

    // 옵션
    // 준비중
    const readyOption = document.createElement("option");
    readyOption.classList.add("gettingReady");
    readyOption.setAttribute("value", "상품 준비중");
    readyOption.textContent = "상품 준비중";
    // 배송중
    const shippingOption = document.createElement("option");
    shippingOption.classList.add("delivering");
    shippingOption.setAttribute("value", "상품 배송중");
    shippingOption.textContent = "상품 배송중";
    // 완료
    const completionOption = document.createElement("option");
    completionOption.classList.add("completion");
    completionOption.setAttribute("value", "배송완료");
    completionOption.textContent = "배송완료";

    // selected넣기
    if (userStatus === "배송완료") {
      completionOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
    } else if (userStatus === "상품 준비중") {
      readyOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
    } else {
      shippingOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
    }

    // 확인 버튼
    const checkBtnWrapper = document.createElement("div");
    checkBtnWrapper.classList.add("checkInfo");
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn", "save");

    checkBtn.textContent = "확인";
    // 버튼
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("orderInfo");
    const btn = document.createElement("button");
    btn.classList.add("button", "cancleOrder");
    btn.setAttribute("id", productId);
    btn.textContent = "주문취소";
    // 화면에 보이기
    checkBtnWrapper.append(checkBtn);
    btnWrapper.append(btn);
    select.append(readyOption, shippingOption, completionOption);

    selectWrapper.append(select);
    wrapper.append(
      orderDate,
      orderProduct,
      orderAmount,
      selectWrapper,
      checkBtnWrapper,
      btnWrapper
    );
    const list = document.getElementById("section");
    list.append(wrapper);
  }
}

// 총주문 갯수
function Ordertotal() {
  const ordersCount = document.getElementById("ordersCount");
  const btnCnt = document.querySelectorAll(".cancleOrder");
  const ordercnt = btnCnt.length;
  if (ordercnt === 0) {
    ordersCount.textContent = "-";
  } else {
    ordersCount.textContent = ordercnt;
  }
}

// 준비중 갯수
function gettingReadyCnt() {
  const gettingReadyArr = document.querySelectorAll(".clickSelect");
  let gettingReadyTotal = 0;
  gettingReadyArr.forEach((element) => {
    const gettingReady = element.options[element.selectedIndex].value;
    if (gettingReady === "상품 준비중") {
      gettingReadyTotal++;
    }
  });
  const prepareCount = document.getElementById("prepareCount");
  if (gettingReadyTotal === 0) {
    prepareCount.textContent = "-";
  } else {
    prepareCount.textContent = gettingReadyTotal;
  }
}

// 배송중 갯수
function deliveringCnt() {
  const delivering = document.querySelectorAll(".clickSelect");
  let deliveringTotal = 0;
  delivering.forEach((element) => {
    const deliveryStatus = element.options[element.selectedIndex].value;
    if (deliveryStatus === "상품 배송중") {
      deliveringTotal++;
    }
  });
  const deliveryCount = document.getElementById("deliveryCount");
  if (deliveringTotal === 0) {
    deliveryCount.textContent = "-";
  } else {
    deliveryCount.textContent = deliveringTotal;
  }
}

//  배송완료 갯수
function deliveryCompletedCnt() {
  const checkSelet = document.querySelectorAll(".clickSelect");
  let deliveryCompletedTotal = 0;
  checkSelet.forEach((element) => {
    const deliveryStatus = element.options[element.selectedIndex].value;
    if (deliveryStatus === "배송완료") {
      deliveryCompletedTotal++;
    }
  });
  const completeCount = document.getElementById("completeCount");
  if (deliveryCompletedTotal === 0) {
    completeCount.textContent = "-";
  } else {
    completeCount.textContent = deliveryCompletedTotal;
  }
}

// 모든 버튼 들고오기, 이벤트 부여위해
function a() {
  const button = document.querySelectorAll(".cancleOrder");
  let cancleBtnId = "";
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cancleBtnId = btn.getAttribute("id");

      const modal = document.getElementById("modal");
      modal.className = "open";

      body.classList.add("scrollLock");
      const deleteCancelButton = document.getElementById("deleteCancelButton");

      deleteCancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.className = "hidden";
        body.classList.remove("scrollLock");
      });
    });
  });

  // 셀렉트를 바꾸게 되면 위에 갯수들이 들어가 있는 바 수정
  const clickSelect = document.querySelectorAll(".clickSelect");
  const saveBtn = document.querySelectorAll(".save");
  clickSelect.forEach((btn) => {
    btn.addEventListener("change", () => {
      saveBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          gettingReadyCnt();
          deliveringCnt();
          deliveryCompletedCnt();
        });
      });
    });
  });

  // alert에 예
  const deleteCompleteButton = document.getElementById("deleteCompleteButton");
  const modalCloseButton = document.getElementById("modalCloseButton");

  deleteCompleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("주문정보가 삭제되었습니다");

    modal.className = "hidden";
    body.classList.remove("scrollLock");
    const deleteBlock = document.getElementById(cancleBtnId);

    deleteBlock.parentNode.parentNode.remove();
    gettingReadyCnt();
    deliveringCnt();
    deliveryCompletedCnt();
    Ordertotal();
  });

  //  모달? x버튼
  modalCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.className = "hidden";
    body.classList.remove("scrollLock");
  });
}
