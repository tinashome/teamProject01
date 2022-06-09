import * as Api from "/api.js";
import { getCurrentDate } from "/useful-functions.js";

const body = document.getElementsByTagName("body")[0];
// 저거 만드는거 말고 이걸 쓰나?
let data = [];
// userId를 session에서 가져옴
const token = sessionStorage.getItem("userId");
async function getOrder() {
  try {
    // userId를 이용해서 주문정보르 가져옴
    const getORderInfo = await Api.get(`/api/orders/${token}`);

    datefnc(getORderInfo);
    buttonEvent();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
getOrder();

// 주문날짜, 상품이름, orderId, 주문상태 가져오기
function datefnc(orderDate) {
  for (let i = 0; i < orderDate.length; i++) {
    let dateInfo = orderDate[i].createdAt;
    let date = getCurrentDate(dateInfo);

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

    // 주문조회
    // 전체를 감싸줄 컨테이너
    const wrapper = document.createElement("div");
    wrapper.classList.add("creatOrderInquiryWrapper");

    const orderDate = document.createElement("div");
    orderDate.classList.add("orderInfo");
    orderDate.textContent = date;

    const orderProduct = document.createElement("div");
    orderProduct.classList.add("orderInfo");
    orderProduct.innerText = listProduct;

    const userStatus = document.createElement("div");
    userStatus.classList.add("orderInfo");
    userStatus.textContent = userStatusData;

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("orderInfo");

    const btn = document.createElement("button");
    // productId가 orderId인데 이게 필요한 이유는
    btn.setAttribute("id", `${productId}`);
    btn.setAttribute("class", "cencleOrder");
    btn.textContent = "주문 취소";

    btnWrapper.append(btn);
    wrapper.append(orderDate, orderProduct, userStatus, btnWrapper);

    const ordersContainer = document.getElementById("section");
    ordersContainer.append(wrapper);
  });
}

async function buttonEvent() {
  // 여러개의 클릭 버튼 구현
  const button = document.querySelectorAll(".cencleOrder");
  // 서버에서 id값 받아오면 사용할 id
  const cancleBtn = [];
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cancleBtn.push(btn.getAttribute("id"));

      console.log(body);
      // 숨겨둔 모달을 보이게
      const modal = document.getElementById("modal");
      modal.classList = "open";

      body.classList.add("scrollLock");
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
    console.log(body);
    modal.className = "hidden";
    body.classList.remove("scrollLock");
  });
  modalCloseButton.addEventListener("click", (e) => {
    // 모달안보이게
    e.preventDefault();
    modal.className = "hidden";
    body.classList.remove("scrollLock");
  });
  // 삭제 확인 버튼
  deleteCompleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("주문정보가 삭제되었습니다");

    //  **********주문을 취소 했으니 서버에 주문취소 알리기**********

    // 모달안보이게
    modal.className = "hidden";
    body.classList.remove("scrollLock");

    // id값에 맞는 버튼의 컨테이너 삭제
    const findOrderId = cancleBtn.shift();
    const deleteBlock = document.getElementById(findOrderId);

    const changeStatus = deleteBlock.parentNode.previousSibling;

    Api.patch(`/api/orders/${token}/${findOrderId}`)
      .then(() => {
        let getNewStatus = Api.get(`/api/orders/${token}`);
        return getNewStatus;
      })
      .then((res) => {
        console.log(res);
        let statusFliter = res.filter((x) => x.orderId == findOrderId);
        changeStatus.textContent = statusFliter[0].status;
      });
  });
}
