import * as Api from "/api.js";
const button = document.getElementById("buyButton");
const postalCodeInput = document.querySelector("#postalCode");
const searchAddressButton = document.querySelector("#searchAddressButton");

const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");

const productsTitle = document.getElementById("payProductQuantity");
const productsTotal = document.getElementById("payProductPrice");
const deliveryFee = document.getElementById("payShippingPrice");
const orderTotal = document.getElementById("payTotalPrice");
// 결제정보

const data = [
  {
    productId: "629929b4b4f1aba828940ce1",
    productsTitle: "초콜릿",
    productsTotal: "18000",
    productsPrice: "6000",
    productsCnt: "3",
    deliveryFee: "2000",
    orderTotal: "20000",
  },
];

data.forEach((element) => {
  const title = element.productsTitle;
  const total = element.productsTotal;
  const fee = element.deliveryFee;
  const order = element.orderTotal;

  productsTitle.textContent = title;
  productsTotal.textContent = total;
  deliveryFee.textContent = fee;
  orderTotal.textContent = order;
});

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
  const receiverName = document.getElementById("receiverName").value;
  const receiverPhoneNumber = document.getElementById(
    "receiverPhoneNumber"
  ).value;

  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = document.getElementById("requestSelectBox").value;
  // 입력이 안 되어 있을 시
  // if (!receiverName || !receiverPhoneNumber || !postalCode || !address2)
  //   return alert("배송지 정보를 모두 입력해 주세요.");
  // JSON 만듦
  // const dataJson = JSON.stringify(data)

  // const apiUrl = ``

  // POST 요청
  // const res = await fetch(apiUrl, {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: dataJson,
  // });
  alert("결제완료");

  let sendInfo = {
    shipAddress: {
      postalCode: postalCode,
      address1: address1,
      address2: address2,
      receiverName: receiverName,
      receiverPhoneNumber: receiverPhoneNumber,
    },
    request: request,
    orderItems: [
      {
        productId: "629929b4b4f1aba828940ce1",
        productName: data[0].productsTitle,
        price: Number(data[0].productsPrice),
        quantity: Number(data[0].productsCnt),
        totalPrice: Number(data[0].productsTotal),
      },
    ],
    totalPrice: Number(data[0].orderTotal),
    status: "결제완료",
  };

  // window.location.href = "../order-complete/order-comple.html";

  try {
    const fff = await Api.post("/api/orders", sendInfo);
    // displaying(fff);
    // 로그인 페이지 이동
    // 응답을 받으면 400 코드 등 뜬다 이걸 이용해서 만들기
    // window.location.href = "/order-complete";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
button.addEventListener("click", doCheckout);

// function displaying(data) {
//   button.innerText(data);
// }
