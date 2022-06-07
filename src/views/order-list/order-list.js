import * as Api from "/api.js";
// 테스트용
let data = [];
const token = sessionStorage.getItem("userId");
async function getOrder() {
  try {
    const getORderInfo = await Api.get(`/api/orders/${token}`);

    datefnc(getORderInfo);
    buttonEvent();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
getOrder();

// 날짜, 상품리스트, 준비상태 불러오기

function datefnc(orderDate) {
  for (let i = 0; i < orderDate.length; i++) {
    let dateInfo = orderDate[i].createdAt;
    const date = dateInfo.substr(0, 10);
    const listProduct = orderDate[i].summaryTitle;
    const productId = orderDate[i].orderId;
    const userStatusData = orderDate[i].status;

    data.push({
      date,
      userStatusData,
      listProduct,
      productId,
    });
  }
  data.forEach((element) => {
    const date = element.date;
    const listProduct = element.listProduct;
    const userStatusData = element.userStatusData;
    const productId = element.productId;

    // 추가할 요소 생성

    // 전체를 감싸줄 컨테이너

    const wrapper = document.createElement("div");
    wrapper.classList.add("creatOrderInquiryWrapper");

    const orderDate = document.createElement("div");
    orderDate.classList.add("orderInfo");
    orderDate.textContent = date;

    const orderProduct = document.createElement("div");
    orderProduct.classList.add("orderInfo");
    orderProduct.textContent = listProduct;

    const userStatus = document.createElement("div");
    userStatus.classList.add("orderInfo");
    userStatus.textContent = userStatusData;

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("orderInfo");

    const btn = document.createElement("button");
    btn.setAttribute("id", `${productId}`);
    btn.setAttribute("class", "cencleOrder");
    btn.textContent = "주문 취소";

    btnWrapper.append(btn);
    wrapper.append(orderDate, orderProduct, userStatus, btnWrapper);

    const ordersContainer = document.getElementById("section");
    ordersContainer.append(wrapper);
  });
}

function buttonEvent() {
  // 여러개의 클릭 버튼 구현

  const button = document.querySelectorAll(".cencleOrder");

  // 서버에서 id값 받아오면 사용할 id
  const cancleBtn = [];
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cancleBtn.push(btn.getAttribute("id"));
      // 숨겨둔 모달을 보이게
      const modal = document.getElementById("modal");
      modal.classList = "open";
    });
  });
  // 모달 보이게 한 후
  // 삭제확인 취소 x버튼
  const deleteCompleteButton = document.getElementById("deleteCompleteButton");
  const modalCloseButton = document.getElementById("modalCloseButton");
  const deleteCancelButton = document.getElementById("deleteCancelButton");

  // 취소버튼 클릭
  deleteCancelButton.addEventListener("click", (e) => {
    e.preventDefault();

    // 모달안보이게

    modal.className = "hidden";
  });
  modalCloseButton.addEventListener("click", (e) => {
    // 모달안보이게
    e.preventDefault();
    modal.className = "hidden";
  });
  // 삭제 확인 버튼
  deleteCompleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("주문정보가 삭제되었습니다");

    //  **********주문을 취소 했으니 서버에 주문취소 알리기**********

    // 모달안보이게
    modal.className = "hidden";

    // id값에 맞는 버튼의 컨테이너 삭제
    const findOrderId = cancleBtn.shift();
    const deleteBlock = document.getElementById(findOrderId);

    const changeStatus = deleteBlock.parentNode.previousSibling;
    changeStatus.textContent = "주문취소";

    Api.patch(`/api/orders/${token}/${findOrderId}`);
  });
}
