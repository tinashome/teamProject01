import * as Api from "/api.js";

const button = document.getElementById("buyButton");
const postalCodeInput = document.querySelector("#postalCode");
const searchAddressButton = document.querySelector("#searchAddressButton");
const postalCode = document.getElementById("postalCode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const productsTitle = document.getElementById("payProductQuantity");
const productsTotal = document.getElementById("payProductPrice");
const deliveryFee = document.getElementById("payShippingPrice");
const orderTotal = document.getElementById("payTotalPrice");
const receiverName = document.getElementById("receiverName");
const receiverPhoneNumber = document.getElementById("receiverPhoneNumber");
// 결제정보
const token = sessionStorage.getItem("userId");

async function getUserInfo() {
  const getORderInfo = await Api.get(`/api/users/${token}`);
  console.log(getORderInfo);
  receiverName.value = getORderInfo.fullName;

  receiverPhoneNumber.value = getORderInfo.phoneNumber;
  address1Input.value = getORderInfo.address.address1;
  address2Input.value = getORderInfo.address.address2;
  postalCode.value = getORderInfo.address.postalCode;
}
getUserInfo();

const data = {
  productId: [],
  productsTitle: "",
  productsTotal: 0,
  productsPrice: 0,
  productsCnt: 0,
  deliveryFee: "2000",
  orderTotal: 2000,
};

// 로컬스토리지에서 장바구니 정보 가져오기
const getLocalStorage = localStorage.getItem("cartList");
const orderItems = [];

JSON.parse(getLocalStorage).forEach((product) => {
  orderItems.push({
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: product.quantity,
    totalPrice: Number(product.price * product.quantity),
  });
});

JSON.parse(getLocalStorage).forEach((producet) => {
  data.productsTitle += producet.name + producet.quantity + "개" + "<br>";
  data.productsTotal += producet.price;
  data.orderTotal += producet.price;
  data.productsPrice = producet.price;
  data.productsCnt = producet.quantity;
  data.productId.push(producet.id);
});

const total = data.productsTotal;
const fee = data.deliveryFee;
const order = data.orderTotal;

productsTitle.innerHTML = data.productsTitle;

productsTotal.textContent = `${total} 개`;
deliveryFee.textContent = `${fee} 원`;
orderTotal.textContent = `${order} 원`;

// 주소찾기

function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let extraAddr = "";
      const addr =
        data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}
searchAddressButton.addEventListener("click", searchAddress);

// select클릭시
const ClickSelectBox = document.getElementById("requestSelectBox");
ClickSelectBox.addEventListener("change", () => {
  const selectValue =
    ClickSelectBox.options[ClickSelectBox.selectedIndex].value;

  if (selectValue == 0) {
    ClickSelectBox.style.color = "rgba(0, 0, 0, 0.3)";
  } else {
    ClickSelectBox.style.color = "rgb(0, 0, 0)";
  }
});
// 결제 버튼 클릭

async function doCheckout() {
  // 각 입력값 가져옴

  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = document.getElementById("requestSelectBox");

  alert("결제완료");

  let sendInfo = {
    shipAddress: {
      postalCode: postalCode,
      address1: address1,
      address2: address2,
      receiverName: receiverName.value,
      receiverPhoneNumber: receiverPhoneNumber.value,
    },
    request: request.options[request.selectedIndex].text,
    orderItems: orderItems,
    totalPrice: Number(data.orderTotal),
    status: "결제완료",
  };

  // window.location.href = "../order-complete/order-complete.html";

  try {
    const fff = await Api.post("/api/orders", sendInfo);
    console.log(fff);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
button.addEventListener("click", doCheckout);
