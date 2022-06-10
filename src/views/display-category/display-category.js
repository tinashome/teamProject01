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
function deleteCategory(item) {
  alert("삭제되었습니다.");
  const thisId = item.path[0].parentElement.childNodes[0].value;
  const deleteThis = Api.delete(`/api/categories/${thisId}`);
  location.reload();
}
