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
document.addEventListener("DOMContentLoaded", async function () {
  // const res = await fetch("주소")
  // const data = await res.json()
  // 테스트용 객체
  try {
    const res = Api.get(`/api/users/`);
    console.log(res);
  } catch (e) {
    {
      console.log(e);
    }
  }

  const data = [
    {
      productsTitle: "2020",
      productsTotal: "dd",
      deliveryFee: "준비중",
      orderTotal: "주문취소",
    },
  ];

  data.forEach((element) => {
    const title = element.productsTitle;
    const total = element.productsTotal;
    const fee = element.deliveryFee;
    const order = element.orderTotal;

    productsTitle.textContent = title;
    productsTotal.textContent = title;
    deliveryFee.textContent = title;
    orderTotal.textContent = title;
  });
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
  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2)
    return alert("배송지 정보를 모두 입력해 주세요.");

  // 테스트용
  const data = {
    receiverName,
    receiverPhoneNumber,
    postalCode,
    address1,
    address2,
    request,
  };

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
  window.location.href = "../order-completion/order-complete.html";
}
button.addEventListener("click", doCheckout);
