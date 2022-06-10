import * as Api from "../api.js";
import { addCommas } from "/useful-functions.js";

const tbody = document.querySelector(".tableBody");

async function getData() {
  try {
    const data = await Api.get("/api/products");

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      // html 요소 생성
      let name = document.createElement("td");
      let category = document.createElement("td");
      let price = document.createElement("td");
      let description = document.createElement("td");
      let tr = document.createElement("tr");
      let modifyButton = document.createElement("button");
      let deleteButton = document.createElement("button");

      // 요소에 배열값 할당 + 요소에 class 추가
      name.textContent = data[i].name;
      name.classList.add("name");

      category.textContent = data[i].category.name;
      category.classList.add("category");

      price.textContent = addCommas(data[i].price);
      price.classList.add("price");

      description.textContent = data[i].summary;
      description.classList.add("description");

      // 다음페이지에 넘겨줄 product의 id를 value로 할당
      name.value = data[i]._id;

      // 수정, 삭제버튼 생성 및 이벤트 추가
      modifyButton.textContent = "수정";
      modifyButton.classList.add("modifyButton");
      modifyButton.addEventListener("click", function () {
        const productId = data[i]._id;

        modifying(productId);
      });
      deleteButton.textContent = "삭제";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", deleteProduct);

      // 한줄에 들어갈 자식으로 td들을 넣어줌
      tr.appendChild(name);
      tr.appendChild(category);
      tr.appendChild(price);
      tr.appendChild(description);
      tr.appendChild(modifyButton);
      tr.appendChild(deleteButton);
      // 줄 또한 tbody 자식으로 추가
      tbody.appendChild(tr);
    }
  } catch (err) {
    console.error(err.stack);
  }
}

getData();

function modifying(productId) {
  window.location.href = `/modifyproduct/${productId}`;
}
function deleteProduct(item) {
  const thisId = item.path[0].parentElement.childNodes[0].value;
  const isOk = confirm("정말로 삭제 하시겠습니까?");
  if(isOk) {
    const deleteThis = Api.delete(`/api/products/${thisId}`);
    alert("삭제되었습니다.");
    location.reload();
  }
}