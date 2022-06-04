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
liLoginTag.appendChild(aLoginTag);
aLoginTag.appendChild(textLogin);
aLoginTag.setAttribute("href", "/login");

const liCartTag = document.createElement("li");
const aCartTag = document.createElement("a");
const textCart = document.createTextNode("장바구니");
liCartTag.appendChild(aCartTag);
aCartTag.appendChild(textCart);
aCartTag.setAttribute("href", "/cart");

navbarItems.appendChild(liLoginTag);
navbarItems.appendChild(liCartTag);

// .nav에 넣기
nav.appendChild(navbarLogo);
nav.appendChild(navbarItems);
