import { get } from "/api.js";

async function getUsersList() {
  try {
    const userData = await get("/api/users");

    // 총 회원 수
    const userNum = document.createTextNode(userData.length);
    document.querySelector(".usersNum").appendChild(userNum);

    // 관리자 수
    var adminNum = userData.filter((item) => item.role === "admin");
    const adminNumText = document.createTextNode(adminNum.length);
    document.querySelector(".managerNum").appendChild(adminNumText);

    userData.forEach((e) => {
      console.log(e);
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

      select.appendChild(basicOption);
      select.appendChild(adminOption);
      selectTd.appendChild(select);

      // 회원 삭제 버튼 구현
      const deleteTd = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.setAttribute("class", "deleteBtn");
      const delText = document.createTextNode("회원정보 삭제");
      delBtn.appendChild(delText);
      deleteTd.appendChild(delBtn);

      // td 구성
      const date = document.createTextNode(e.createdAt.substr(0, 10));
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

      //////
      // 회원정보 삭제 기능 구현
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

getUsersList();
