// 테스트용
const date = [
  {
    date: "2020",
    listProduct: "dd",
    userStatus: "준비중",
    productId: 1,
  },
  {
    date: "2020",
    listProduct: "1",
    userStatus: "준비중",
    productId: 2,
  },
  {
    date: "2020",
    listProduct: "2",
    userStatus: "준비중",
    productId: 3,
  },
  {
    date: "2020",
    listProduct: "3",
    userStatus: "준비중",
    productId: 4,
  },
  {
    date: "2020",
    listProduct: "4",
    userStatus: "준비중",
    productId: 7,
  },
  {
    date: "2020",
    listProduct: "5",
    userStatus: "준비중",
    productId: 5,
  },
  {
    date: "2020",
    listProduct: "6",
    userStatus: "준비중",
    productId: 6,
  },
];

// 날짜, 상품리스트, 준비상태 불러오기

//  **********get으로 서버 데이터 받아오기**********
date.forEach((element) => {
  // 임시 데이터 받아오기
  const date = element.date;
  const listProduct = element.listProduct;
  const userStatusData = element.userStatus;
  const productId = element.productId;

  // 추가할 요소 생성

  //전체를 감싸줄 컨테이너
  const wrapper = document.createElement("div");
  wrapper.classList.add("creatOrderInquiryWrapper");
  // 백에서 받아온 id
  // wrapper.setAttribute("id", "ssss")

  // 주문날짜
  const orderDate = document.createElement("div");
  orderDate.classList.add("orderInfo");
  orderDate.textContent = date;

  // 상품정보
  const orderProduct = document.createElement("div");
  orderProduct.classList.add("orderInfo");
  orderProduct.textContent = listProduct;

  // 상태정보
  const userStatus = document.createElement("div");
  userStatus.classList.add("orderInfo");
  userStatus.textContent = userStatusData;

  // 버튼 컨테이너
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("orderInfo");

  // 버튼
  // id값 가져와서 버튼에 id값 넣기
  const btn = document.createElement("button");
  btn.setAttribute("id", `${productId}`);
  btn.setAttribute("class", "cencleOrder");
  btn.textContent = "주문 취소";

  //화면에 보이게 할려고
  btnWrapper.append(btn);
  wrapper.append(orderDate, orderProduct, userStatus, btnWrapper);

  const ordersContainer = document.getElementById("section");
  ordersContainer.append(wrapper);
});

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
// 삭제 확인 버튼
deleteCompleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  alert("주문정보가 삭제되었습니다");

  //  **********주문을 취소 했으니 서버에 주문취소 알리기**********

  // 모달안보이게
  modal.className = "hidden";

  // id값에 맞는 버튼의 컨테이너 삭제
  const deleteBlock = document.getElementById(`${cancleBtn.shift()}`);
  deleteBlock.parentNode.parentNode.remove();
});

modalCloseButton.addEventListener("click", (e) => {
  // 모달안보이게
  e.preventDefault();
  modal.className = "hidden";
});
