import * as Api from "/api.js";

const btn = document.querySelector(".submitEdit");

btn.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const getUserId = sessionStorage.getItem("userId");
    const userr = await Api.get(`/api/users/${getUserId}`);
    console.log(userr);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
