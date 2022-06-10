import * as Api from "../api.js";

const tbody = document.querySelector(".tableBody");

async function getData() {
  try {
    const data = await Api.get("/api/categories");

    for (let i = 0; i < data.length; i++) {
      const name = document.createElement("td");
      const description = document.createElement("td");
      const tr = document.createElement("tr");
      const modifyButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      name.textContent = data[i].name;
      name.classList.add("name");
      description.textContent = data[i].info;
      description.classList.add("description");
      name.value = data[i]._id;
      modifyButton.textContent = "수정";
      modifyButton.classList.add("modifyButton");
      modifyButton.addEventListener("click", modifying);

      deleteButton.textContent = "삭제";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", deleteCategory);

      tr.appendChild(name);
      tr.appendChild(description);
      tr.appendChild(modifyButton);
      tr.appendChild(deleteButton);
      tbody.appendChild(tr);
    }
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

function modifying(item) {
  const thisId = item.path[0].parentElement.childNodes[0].value;
  window.location.href = `/modifycategory/${thisId}`;
}
async function deleteCategory(item) {
  // 지우려는 카테고리
  const thisId = item.path[0].parentElement.childNodes[0].value;

  const allProducts = await Api.get(`/api/products`);
  // console.log(allProducts);

  let needDelete = 0;
  allProducts.forEach(element => {
    if(element.category._id == thisId) {
      alert("카테고리가 지정된 상품이 있습니다. 해당 상품을 모두 삭제 후 요청 하십시오.");
      needDelete += 1;
      return;
    }
  });

  if(needDelete == 0) {
    const isOk = confirm("정말로 삭제 하시겠습니까?");
    if(isOk) {
      const deleteThis = Api.delete(`/api/categories/${thisId}`);
      alert("삭제되었습니다.");
      location.reload();
    } else {
      return;
    }
  }
}
