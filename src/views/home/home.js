// 이미지 슬라이드
let slideIdx = 1;
imgSlide(slideIdx);

function nextSlides(n) {
  imgSlide((slideIdx += n));
}

function currentSlide(n) {
  imgSlide((slideIdx = n));
}

function imgSlide(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIdx = 1;
  }
  if (n < 1) {
    slideIdx = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIdx - 1].style.display = "block";
  dots[slideIdx - 1].className += " active";
}

const viewMore = document.querySelector(".viewMore");
viewMore.addEventListener("click", () => {
  window.location.href = "/productlist";
});

const allBtn = document.querySelector(".allBtn");
allBtn.addEventListener("click", () => {
  window.location.href = "/productlist";
});

const lotte = document.querySelector(".lotte");
lotte.addEventListener("click", () => {
  sessionStorage.setItem("category", "Lotte");
  window.location.href = "/productlist";
});

const mika = document.querySelector(".milka");
mika.addEventListener("click", () => {
  sessionStorage.setItem("category", "Milka");
  window.location.href = "/productlist";
});

const godiva = document.querySelector(".godiva");
godiva.addEventListener("click", () => {
  sessionStorage.setItem("category", "Godiva");
  window.location.href = "/productlist";
});

const guylian = document.querySelector(".guylian");
guylian.addEventListener("click", () => {
  sessionStorage.setItem("category", "Guylian");
  window.location.href = "/productlist";
});

// 자동 슬라이드 구현
setInterval("nextSlides(1)", 6000);
