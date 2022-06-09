import * as Api from "../api.js";

const tbody = document.querySelector(".tableBody");

async function getData() {
  try {
    const data = await Api.get("/api/products");

    for (let i = 0; i < data.length; i++) {
      let name = document.createElement("td");
      let category = document.createElement("td");
      let price = document.createElement("td");
      let description = document.createElement("td");
      let tr = document.createElement("tr");
      let modifyButton = document.createElement("button");
      let deleteButton = document.createElement("button");
      name.textContent = data[i].name;
      name.classList.add("name");
      category.textContent = data[i].category;
      category.classList.add("category");
      price.textContent = data[i].price;
      price.classList.add("price");
      description.textContent = data[i].summary;
      description.classList.add("description");
      name.value = data[i]._id;
      modifyButton.textContent = "수정";
      modifyButton.classList.add("modifyButton");
      modifyButton.addEventListener("click", modifying);
      deleteButton.textContent = "삭제";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", deleteProduct);
      tr.appendChild(name);
      tr.appendChild(category);
      tr.appendChild(price);
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
  window.location.href = `/modifyproduct/${thisId}`;
}
function deleteProduct(item) {
  const thisId = item.path[0].parentElement.childNodes[0].value;
  const deleteThis = Api.delete(`/api/products/${thisId}`);
  location.reload();
}
