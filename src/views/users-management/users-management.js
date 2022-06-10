import * as Api from "/api.js";
import { getCurrentDate } from "/useful-functions.js";

async function getUsersList() {
  try {
    const userData = await Api.get("/api/users");

    // 총 회원 수
    const userNum = document.createTextNode(userData.length);
    document.querySelector(".usersNum").appendChild(userNum);

    // 관리자 수
    var adminNum = userData.filter((item) => item.role === "admin");
    const adminNumText = document.createTextNode(adminNum.length);
    document.querySelector(".managerNum").appendChild(adminNumText);

    userData.forEach((e) => {
      const userList = document.querySelector(".usersList");

      const userTr = document.createElement("tr");
      userTr.setAttribute("class", "userTr");
      const dateTd = document.createElement("td");
      dateTd.setAttribute("class", "dateTd");
      const emailTd = document.createElement("td");
      emailTd.setAttribute("class", "emailTd");
      const roleTd = document.createElement("td");
      roleTd.setAttribute("class", "roleTd");
      const nameTd = document.createElement("td");
      nameTd.setAttribute("class", "nameTd");

      // 권한 선택 select 구현
      const selectTd = document.createElement("td");
      const select = document.createElement("select");

      const basicOption = document.createElement("option");
      const basicText = document.createTextNode("일반 사용자");
      basicOption.setAttribute("value", "basic");
      basicOption.appendChild(basicText);
      const adminOption = document.createElement("option");
      const adminText = document.createTextNode("관리자");
      adminOption.setAttribute("value", "admin");
      adminOption.appendChild(adminText);

      if (e.role === "admin") {
        select.appendChild(adminOption);
        select.appendChild(basicOption);
        select.style.backgroundColor = "#EAAC7F";
      } else {
        select.appendChild(basicOption);
        select.appendChild(adminOption);
      }
      selectTd.appendChild(select);
      selectTd.setAttribute("class", `select-${e._id}`);

      // 회원 삭제 버튼 구현
      const deleteTd = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.setAttribute("class", `deleteBtn-${e._id}`);
      delBtn.classList.add("deleteBtn");
      const delText = document.createTextNode("회원정보 삭제");
      delBtn.appendChild(delText);
      deleteTd.appendChild(delBtn);

      // td 구성
      const currnetCreateAt = getCurrentDate(e.createdAt);
      const date = document.createTextNode(currnetCreateAt.substr(0, 10));
      const email = document.createTextNode(e.email);
      const role = document.createTextNode(e.role);
      const name = document.createTextNode(e.fullName);

      dateTd.appendChild(date);
      emailTd.appendChild(email);
      roleTd.appendChild(role);
      nameTd.appendChild(name);

      // tr에 넣기
      userTr.appendChild(dateTd);
      userTr.appendChild(emailTd);
      userTr.appendChild(roleTd);
      userTr.appendChild(nameTd);
      userTr.appendChild(selectTd);
      userTr.appendChild(deleteTd);
      userList.appendChild(userTr);

      // 회원 정보 삭제
      const btn = document.querySelector(`.deleteBtn-${e._id}`);
      sessionStorage.setItem("delUser", e._id);
      btn.addEventListener("click", modalOpen);
      btn.addEventListener("click", () => {
        sessionStorage.setItem("delUser", e._id);
      });
      sessionStorage.removeItem("delUser");

      // 일반 등급 -> 관리자 권한 변경 기능
      var roleBtn = document.querySelector(`.select-${e._id}`);
      roleBtn.addEventListener("change", () => {
        // sessionStorage.removeItem("userRole");
        sessionStorage.setItem("userRole", e.email);
        select.style.backgroundColor = "#EAAC7F";
      });
      roleBtn.addEventListener("change", changeRole);
      sessionStorage.removeItem("userRole");
    });
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
document.querySelector(".closeBtn").addEventListener("click", deleteUser);

// 회원 정보 삭제 기능
async function deleteUser() {
  try {
    const inputPassword = document.querySelector(".inputPassword");
    const currentPassword = inputPassword.value;
    const submitPassword = { currentPassword };

    const id = sessionStorage.getItem("delUser");
    const result = await Api.delete("/api/users", id, submitPassword);
    window.location.href = "/users";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function changeRole() {
  try {
    const email = sessionStorage.getItem("userRole");
    const submitEmail = { email };
    const result = await Api.post("/api/users/role", submitEmail);

    window.location.href = "/users";
    // sessionStorage.removeItem("userRole");
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

getUsersList();
