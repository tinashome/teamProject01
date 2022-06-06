// 테스트용
const date = [
  {
    date: "2020",
    listProduct: "1",
    totalAmount: "100",
    userStatus: "상품 준비중",
    productId: 1,
  },
  {
    date: "2020",
    listProduct: "2",
    totalAmount: "100",
    userStatus: "상품 준비중",
    productId: 2,
  },
  {
    date: "2020",
    listProduct: "3",
    totalAmount: "100",
    userStatus: "상품 준비중",
    productId: 3,
  },
  {
    date: "2020",
    listProduct: "4",
    totalAmount: "100",
    userStatus: "상품 배송중",
    productId: 4,
  },
  {
    date: "2020",
    listProduct: "5",
    totalAmount: "100",
    userStatus: "배송완료",
    productId: 5,
  },
];

// 실행시 바로 실행
document.addEventListener(
  "DOMContentLoaded",
  await function () {
    // ************서버에서 select 버튼 상태 받아와서 selec에 selected추가
    // ***********
    // **********서버에 주문 취소 했다고 id값으로 보내주야
    // ************메뉴바 구현
    // 서버에서 데이터를 받아온다
    date.forEach((element) => {
      const date = element.date;
      const listProduct = element.listProduct;
      const totalAmount = element.totalAmount;
      const userStatusData = element.userStatus;
      const productId = element.productId;

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
      if (userStatusData === "배송완료") {
        completionOption.setAttribute("selected", "true");
        select.classList.add("completionColor", "clickSelect");
      } else if (userStatusData === "상품 준비중") {
        readyOption.setAttribute("selected", "true");
        select.classList.add("gettingReadyColor", "clickSelect");
      } else {
        shippingOption.setAttribute("selected", "true");
        select.classList.add("deliveringColor", "clickSelect");
      }

      // 버튼
      const btnWrapper = document.createElement("div");
      btnWrapper.classList.add("orderInfo");
      const btn = document.createElement("button");
      btn.classList.add("button", "cencleOrder");
      btn.setAttribute("id", productId);
      btn.textContent = "주문취소";
      // 화면에 보이기
      btnWrapper.append(btn);
      select.append(readyOption, shippingOption, completionOption);

      selectWrapper.append(select);
      wrapper.append(
        orderDate,
        orderProduct,
        orderAmount,
        selectWrapper,
        btnWrapper
      );
      const list = document.getElementById("ordersContainer");
      list.append(wrapper);
    });

    // 상태관리 메뉴
    // 충 주문
    Ordertotal();
    function Ordertotal() {
      const ordersCount = document.getElementById("ordersCount");
      const btnCnt = document.querySelectorAll(".orderCancel");
      const ordercnt = btnCnt.length;
      if (ordercnt === 0) {
        ordersCount.textContent = "-";
      } else {
        ordersCount.textContent = ordercnt;
      }
    }
    // 준비중 갯수
    gettingReadyCnt();
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
    deliveringCnt();
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
    //  배송완료
    deliveryCompletedCnt();
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
    const button = document.querySelectorAll(".orderCancel");
    let cancleBtnId = "";
    button.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cancleBtnId = btn.getAttribute("id");

        const modal = document.getElementById("modal");
        modal.className = "modal is-active";

        const deleteCancelButton =
          document.getElementById("deleteCancelButton");

        deleteCancelButton.addEventListener("click", (e) => {
          e.preventDefault();
          modal.className = "modal";
        });
      });
    });

    // selected버튼 텍스트 백그라운드 텍스트컬러변경
    function removeSelectClass(splitBtnClass, btn) {
      for (let i = 0; i < splitBtnClass.length; i++) {
        const btnClassOne = splitBtnClass[i];
        btn.classList.remove(btnClassOne);
      }
    }

    const clickSelect = document.querySelectorAll(".clickSelect");
    clickSelect.forEach((btn) => {
      btn.addEventListener("change", () => {
        const selectValue = btn.options[btn.selectedIndex].value;
        console.log(selectValue);
        const btnClass = btn.getAttribute("class");
        const splitBtnClass = btnClass.split(" ");

        if (selectValue === "상품 준비중") {
          removeSelectClass(splitBtnClass, btn);
          btn.classList.add(
            "has-background-danger-light",
            "has-text-danger",
            "clickSelect"
          );
          gettingReadyCnt();
          deliveringCnt();
          deliveryCompletedCnt();
        } else if (selectValue === "상품 배송중") {
          removeSelectClass(splitBtnClass, btn);
          btn.classList.add(
            "has-background-primary-light",
            "has-text-primary",
            "clickSelect"
          );
          gettingReadyCnt();
          deliveringCnt();
          deliveryCompletedCnt();
        } else {
          removeSelectClass(splitBtnClass, btn);
          btn.classList.add("has-background-grey-light", "clickSelect");
          gettingReadyCnt();
          deliveringCnt();
          deliveryCompletedCnt();
        }
      });
    });

    // alert에 예
    const deleteCompleteButton = document.getElementById(
      "deleteCompleteButton"
    );
    const modalCloseButton = document.getElementById("modalCloseButton");

    deleteCompleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert("주문정보가 삭제되었습니다");

      modal.className = "modal";

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
      modal.className = "modal";
    });
  }
);
