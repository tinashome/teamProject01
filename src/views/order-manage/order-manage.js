import * as Api from "/api.js";
import { getCurrentDate } from "/useful-functions.js";

const body = document.getElementsByTagName("body")[0];
const statusArr = ["결제완료", "배송준비중", "발송완료", "주문취소"];
async function getData() {
  const getData = await Api.get("/api/orders");

  dataArr(getData);
  Ordertotal();
  gettingReadyCnt();
  deliveringCnt();
  deliveryCompletedCnt();
  orderCancelCnt();
  getBtns();
}
async function deleteOrder(orderId) {
  const getData = await Api.patch("/api/orders", orderId);
  window.location.reload();
}

getData();

// 주문정보가 담긴 박스 생성
function dataArr(getData) {
  for (let i = 0; i < getData.length; i++) {
    const splitDate = getData[i].createdAt;
    const date = getCurrentDate(splitDate);
    const summaryTitle = getData[i].summaryTitle;
    const status = getData[i].status;
    const Id = getData[i].orderId;
    const totalPrice = getData[i].totalPrice;
    const statusArr = ["결제완료", "배송준비중", "발송완료", "주문취소"];

    // 전체감싸기
    const wrapper = document.createElement("div");
    wrapper.classList.add("creatOrderInquiryWrapper");
    wrapper.setAttribute("id", `order-${Id}`);

    // 날짜
    const orderDate = document.createElement("div");
    orderDate.classList.add("orderInfo");
    orderDate.textContent = date;

    // 주문번호
    const orderId = document.createElement("div");
    orderId.classList.add("orderInfo");
    orderId.textContent = Id;

    // 상품
    const orderProduct = document.createElement("div");
    orderProduct.classList.add("orderInfo");
    orderProduct.innerText = summaryTitle;

    // 총액
    const orderAmount = document.createElement("div");
    orderAmount.classList.add("orderInfo");
    orderAmount.textContent = totalPrice
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    // select
    const selectWrapper = document.createElement("div");
    selectWrapper.classList.add("orderInfo");

    const select = document.createElement("select");
    // select.classList.add("has-background-danger-light", "has-text-danger")
    select.setAttribute("id", `statusSelectBox-${Id}`);
    select.setAttribute("class", "select");

    // 옵션
    // 결제완료
    const readyOption = document.createElement("option");
    readyOption.classList.add("gettingReady");
    readyOption.setAttribute("value", statusArr[0]);
    readyOption.textContent = statusArr[0];
    // 배송준비중
    const shippingOption = document.createElement("option");
    shippingOption.classList.add("delivering");
    shippingOption.setAttribute("value", statusArr[1]);
    shippingOption.textContent = statusArr[1];
    //발송완료
    const completionOption = document.createElement("option");
    completionOption.classList.add("completion");
    completionOption.setAttribute("value", statusArr[2]);
    completionOption.textContent = statusArr[2];
    // console.log(completionOption)
    // 주문취소
    const cancelOption = document.createElement("option");
    cancelOption.classList.add("incomplete");
    cancelOption.setAttribute("value", statusArr[3]);
    cancelOption.textContent = statusArr[3];
    // console.log(cancelOption)

    // function setSelected(){
    //   completionOption.setAttribute("selected", "true");
    //   select.classList.add("clickSelect");
    // }
    //selected넣기
    // completionOption.setAttribute("selected", "true");
    // select.classList.add("clickSelect");
    // console.log(status);

    if (status === statusArr[0]) {
      // console.log("1",status === statusArr[0]);
      readyOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
      //setSelected();
    } else if (status === statusArr[1]) {
      // console.log("2",status === statusArr[1]);
      shippingOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
      //setSelected();
    } else if (status === statusArr[2]) {
      // console.log("3",status === statusArr[2]);
      completionOption.setAttribute("selected", "true");
      select.classList.add("clickSelect");
      //setSelected();
    } else if (status === statusArr[3]) {
      cancelOption.setAttribute("selected", "true");
      select.setAttribute("disabled", "true");
      // cencelbtn.setAttribute("disabled", "disabled");
      select.classList.add("clickSelect");
      //setSelected();
    }

    // 확인 버튼
    const checkBtnWrapper = document.createElement("div");
    checkBtnWrapper.classList.add("checkInfo");
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn", "save");
    checkBtn.setAttribute("id", `checkBtn - ${Id}`);

    checkBtn.textContent = "확인";
    // 주문취소 버튼
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("orderInfo");
    const btn = document.createElement("button");
    btn.classList.add("button", "cancleOrder");
    btn.setAttribute("id", Id);
    btn.textContent = "주문취소";
    // 화면에 보이기
    // console.log(select.value);
    // if(select.value === "주문취소" ){
    if (status === statusArr[3]) {
      btn.setAttribute("disabled", "disabled");
      checkBtn.setAttribute("disabled", "disabled");
    }
    checkBtnWrapper.append(checkBtn);
    btnWrapper.append(btn);
    select.append(readyOption, shippingOption, completionOption, cancelOption);

    selectWrapper.append(select);
    wrapper.append(
      orderDate,
      orderId,
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

// 결제완료 갯수
function gettingReadyCnt() {
  const gettingReadyArr = document.querySelectorAll(".clickSelect");
  let gettingReadyTotal = 0;
  gettingReadyArr.forEach((element) => {
    const gettingReady = element.options[element.selectedIndex].value;
    if (gettingReady === statusArr[0]) {
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
    if (deliveryStatus === statusArr[1]) {
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
    if (deliveryStatus === statusArr[2]) {
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

//  주문취소 갯수
function orderCancelCnt() {
  const checkSelet = document.querySelectorAll(".clickSelect");
  let orderCanceledTotal = 0;
  checkSelet.forEach((element) => {
    const deliveryStatus = element.options[element.selectedIndex].value;
    if (deliveryStatus === statusArr[3]) {
      orderCanceledTotal++;
    }
  });
  const cancledCount = document.getElementById("cancelCount");
  if (orderCanceledTotal === 0) {
    cancledCount.textContent = "-";
  } else {
    cancledCount.textContent = orderCanceledTotal;
  }
}

// 모든 버튼 들고오기, 이벤트 부여위해
async function getBtns() {
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

  async function setOrderStatus(orderId, status) {
    const data = { status };
    const setOrder = await Api.post(`/api/orders/${orderId}`, data);
    window.location.reload();
  }
  // 셀렉트를 바꾸게 되면 위에 갯수들이 들어가 있는 바 수정
  const clickSelect = document.querySelectorAll(".clickSelect");
  //const saveBtn = document.querySelectorAll(".save");
  clickSelect.forEach((btn) => {
    const orderId = btn.getAttribute("id").replace("statusSelectBox-", "");
    btn.addEventListener("change", () => {
      const status = btn.value;
      const saveBtn = document.getElementById(`checkBtn - ${orderId}`);
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // gettingReadyCnt();
        // deliveringCnt();
        // deliveryCompletedCnt();
        setOrderStatus(orderId, status);
      });
    });
  });

  // alert에 예
  const deleteCompleteButton = document.getElementById("deleteCompleteButton");

  const modalCloseButton = document.getElementById("modalCloseButton");

  deleteCompleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    // alert("주문정보가 삭제되었습니다");
    deleteOrder(cancleBtnId);
    modal.className = "hidden";
    body.classList.remove("scrollLock");
    // const deleteBlock = document.getElementById(cancleBtnId);

    // deleteBlock.parentNode.parentNode.remove();
    // gettingReadyCnt();
    // deliveringCnt();
    // deliveryCompletedCnt();
    // Ordertotal();
  });

  //  모달? x버튼
  modalCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.className = "hidden";
    body.classList.remove("scrollLock");
  });
}

// function getSlectText(){
//   const clickSelect = document.querySelectorAll("#clickSelect");
//   clickSelect.forEach((select) => {
//     console.log(select.value);
//     select.addEventListener("change", (e) => {
//       e.preventDefault();
//       console.log(select);

// })})}
