import * as Api from "/api.js";

const path = window.location.pathname.split("/");
const categoryId = path[path.length - 2];

async function getData() {
  try {
    const data = await Api.get(`/api/category/${categoryId}`);
    console.log(data);
    const categoryName = document.querySelector("#categoryName");
    const description = document.querySelector("#descrption");

    categoryName.value = data.name;
    description.textContent = data.info;
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", async (e) => {
  e.preventDefault();
  alert("카테고리가 수정되었습니다.")
  const name = document.querySelector("#categoryName").value;
  const info = document.querySelector("#descrption").value;
  const patchData = {
    name,
    info,
  };

  try {
    const patching = await Api.patch(
      `/api/categories`,
      `${categoryId}`,
      patchData
    );
    console.log(patching);
  } catch (err) {
    console.error(err.stack);
  }
});