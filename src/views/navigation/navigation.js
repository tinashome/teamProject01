const getToken = sessionStorage.getItem("token");
console.log(getToken);

const nav = document.querySelector(".nav");

// logo 부분
const navbarLogo = document.createElement("div");
navbarLogo.setAttribute("class", "navbarLogo");

const navbarBrand = document.createElement("a");
navbarBrand.setAttribute("class", "navbarBrand");
navbarBrand.setAttribute("href", "/");
navbarLogo.appendChild(navbarBrand);

const fontImg = document.createElement("i");
fontImg.setAttribute("class", "fas fa-cookie-bite");

const textLink = document.createElement("span");
textLink.setAttribute("class", "textLink");
const textNode = document.createTextNode(" 이상한 나라의 초콜릿");
textLink.appendChild(textNode);

navbarBrand.appendChild(fontImg);
navbarBrand.appendChild(textLink);

// item 부분
const navbar = document.createElement("div");
navbar.setAttribute("class", "navbar");

const navbarItems = document.createElement("ul");
navbarItems.setAttribute("class", "navbarItems");

const liLoginTag = document.createElement("li");
const aLoginTag = document.createElement("a");
const textLogin = document.createTextNode("로그인");
aLoginTag.setAttribute("href", "/login");
aLoginTag.appendChild(textLogin);

const aLogoutTag = document.createElement("a");
const textLogout = document.createTextNode("로그아웃");
aLogoutTag.setAttribute("href", "/");
aLogoutTag.appendChild(textLogout);

// 로그인 되었을 경우 (토큰 값 존재)
if (getToken !== null) {
  liLoginTag.appendChild(aLogoutTag);
} else {
  // 로그인이 되어 있지 않을 경우
  liLoginTag.appendChild(aLoginTag);
}

const liCartTag = document.createElement("li");
const aCartTag = document.createElement("a");
const textCart = document.createTextNode("장바구니");
liCartTag.appendChild(aCartTag);
aCartTag.appendChild(textCart);
aCartTag.setAttribute("href", "/cart");

const liMyPageTag = document.createElement("li");
const aMyPageTag = document.createElement("a");
const textMyPage = document.createTextNode("마이페이지");
liMyPageTag.appendChild(aMyPageTag);
aMyPageTag.appendChild(textMyPage);
aMyPageTag.setAttribute("href", "/mypage");

navbarItems.appendChild(liLoginTag);
navbarItems.appendChild(liCartTag);
navbarItems.appendChild(liMyPageTag);

const barsTag = document.createElement("div");
barsTag.setAttribute("class", "hamburger");
const fontBars = document.createElement("i");
fontBars.setAttribute("class", "fa-solid fa-bars fa-lg");
barsTag.appendChild(fontBars);
navbarItems.appendChild(barsTag);

// .nav에 넣기
nav.appendChild(navbarLogo);
nav.appendChild(navbarItems);

// 반응형 햄버거
const barMenu = document.createElement("ul");
barMenu.setAttribute("class", "barMenu");

const menu = document.querySelector(".menu");
menu.appendChild(barMenu);

// 토글 형식으로 메뉴 접었다 펴기
const menuToggle = document.querySelector(".hamburger");

function toggleClick() {
  barMenu.appendChild(liLoginTag);
  barMenu.appendChild(liCartTag);
  barMenu.appendChild(liMyPageTag);
  menu.classList.toggle("hidden");
}
menuToggle.addEventListener("click", toggleClick);
