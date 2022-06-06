import * as Api from "/api.js";

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
      detailAddressInput.focus();
    },
  }).open();
}
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", searchAddress);

async function handleSubmit(e) {
  e.preventDefault();

  const phoneNumber = phoneNumberInput.value;
  const currentPassword = passwordInput.value;
  const newPassword = newPasswordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = addressInput.value;
  const address2 = detailAddressInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = newPassword.length >= 4;
  const isPasswordSame = newPassword === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
  }

  if (!isPasswordSame) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  try {
    const data = {
      currentPassword,
      phoneNumber,
      postalCode,
      address1,
      address2,
    };

    const getUserId = sessionStorage.getItem("userId");
    await Api.post(`/api/users/${getUserId}`, data);
    alert("정보가 수정되었습니다. ");
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

submitEdit.addEventListener("click", handleSubmit);
