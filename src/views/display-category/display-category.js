import * as Api from "../api.js";

const tbody = document.querySelector(".tableBody");

async function getData() {
  try {
    const data = await Api.get("/api/categories");

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name, data[i].info);
      let name = document.createElement("td");
      let description = document.createElement("td");
      let tr = document.createElement("tr");
      let modifyButton = document.createElement("button");
      let deleteButton = document.createElement("button");
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

function modifying() {
  window.location.href = "/modifycategory";
}
function deleteCategory(item) {
  const thisId = item.path[0].parentElement.childNodes[0].value;
  console.log(`/api/categories/${thisId}`);
  const deleteThis = Api.delete(`/api/categories/${thisId}`);
  // location.reload();
}
