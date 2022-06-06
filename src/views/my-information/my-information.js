import * as Api from "/api.js";

const fullNameInput = document.querySelector("#fullNameInput");
const phoneNumberInput = document.querySelector("#phoneNumberInput");
const passwordInput = document.querySelector("#passwordInput");
const newPasswordInput = document.querySelector("#newPasswordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const postalCodeInput = document.querySelector("#postalCodeInput");
const addressInput = document.querySelector("#addressInput");
const detailAddressInput = document.querySelector("#detailAddressInput");
const submitEdit = document.querySelector("#submitEdit");

// 주소 찾기 api
async function searchAddress(e) {
  e.preventDefault();
  new daum.Postcode({
    oncomplete: function (data) {
      postalCodeInput.value = data.zonecode;
      addressInput.value = data.address;
      detailAddressInput.value = null;
      detailAddressInput.focus();
    },
  }).open();
}

// 기존 정보 불러오기
const getUserId = sessionStorage.getItem("userId");
async function printInformation() {
  try {
    const userInfo = await Api.get(`/api/users/${getUserId}`);

    fullNameInput.value = userInfo.fullName;
    phoneNumberInput.value = userInfo.phoneNumber;
    postalCodeInput.value = userInfo.address.postalCode;
    addressInput.value = userInfo.address.address1;
    detailAddressInput.value = userInfo.address.address2;

    console.log(userInfo);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 정보 수정하기
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", searchAddress);

async function handleSubmit(e) {
  e.preventDefault();

  const phoneNumber = phoneNumberInput.value;
  const currentPassword = passwordInput.value;
  const password = newPasswordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = addressInput.value;
  const address2 = detailAddressInput.value;

  // 잘 입력했는지 확인
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isPasswordValid) {
    return alert("비밀번호는 4글자 이상이어야 합니다.");
  }

  if (!isPasswordSame) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  try {
    const data = {
      password,
      currentPassword,
      phoneNumber,
      address: {
        postalCode,
        address1,
        address2,
      },
    };

    const result = await Api.patch("/api/users/", getUserId, data);

    alert("정보가 수정되었습니다. ");
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

printInformation();
submitEdit.addEventListener("click", handleSubmit);
