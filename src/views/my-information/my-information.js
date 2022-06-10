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
const delMyInfoBtn = document.querySelector("#delMyInfoBtn");
const searchBtn = document.querySelector(".searchBtn");

const getUserId = sessionStorage.getItem("userId");

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
async function printInformation() {
  try {
    const userInfo = await Api.get(`/api/users/${getUserId}`);

    fullNameInput.value = userInfo.fullName;
    phoneNumberInput.value = userInfo.phoneNumber ? userInfo.phoneNumber : null;
    postalCodeInput.value = userInfo.address
      ? userInfo.address.postalCode
      : null;
    addressInput.value = userInfo.address ? userInfo.address.address1 : null;
    detailAddressInput.value = userInfo.address
      ? userInfo.address.address2
      : null;
    return userInfo.password;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 비밀번호 입력 모달창
async function modalOpen(e) {
  e.preventDefault();
  document.querySelector(".modal").classList.remove("hidden");
}

async function modalClose(e) {
  e.preventDefault();
  document.querySelector(".modal").classList.add("hidden");
}
document.querySelector(".background").addEventListener("click", modalClose);
document.querySelector(".closeBtn").addEventListener("click", modalClose);
document.querySelector(".closeBtn").addEventListener("click", handleSubmit);

document.querySelector(".closeBtnDelete").addEventListener("click", modalClose);
document
  .querySelector(".closeBtnDelete")
  .addEventListener("click", deleteMyInfo);

// 정보 수정하기
async function handleSubmit(e) {
  e.preventDefault();

  const currentPassword = passwordInput.value;
  const phoneNumber = phoneNumberInput.value;
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

    await Api.patch("/api/users/", getUserId, data);

    alert("정보가 수정되었습니다. ");
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 탈퇴하기 (회원 정보 삭제)
async function deleteMyInfo() {
  try {
    const currentPassword = passwordInput.value;
    const submitPassword = { currentPassword };

    const result = await Api.delete("/api/users", getUserId, submitPassword);

    window.location.href = "/";
    sessionStorage.clear();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

printInformation();
searchBtn.addEventListener("click", searchAddress);

submitEdit.addEventListener("click", modalOpen);
submitEdit.addEventListener("click", () => {
  document.querySelector(".closeBtn").classList.remove("hidden");
  document.querySelector(".closeBtnDelete").classList.add("hidden");
});
delMyInfoBtn.addEventListener("click", () => {
  document.querySelector(".closeBtn").classList.add("hidden");
  document.querySelector(".closeBtnDelete").classList.remove("hidden");
});
delMyInfoBtn.addEventListener("click", modalOpen);

const orderList = document.querySelector("#orderList");
const cart = document.querySelector("#cart");
const myPage = document.querySelector("#myPage");

orderList.addEventListener("click", () => {
  window.location.href = "/orderList";
});
cart.addEventListener("click", () => {
  window.location.href = "/cart";
});
myPage.addEventListener("click", () => {
  window.location.href = "/myPage";
});
