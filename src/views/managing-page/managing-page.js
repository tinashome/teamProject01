const order = document.querySelector(".managingOrder");
const users = document.querySelector(".managingUsers");
const category = document.querySelector(".addCategory");
const product = document.querySelector(".addProduct");

order.addEventListener("click", () => {
  window.location.href = "/addproduct";
});
users.addEventListener("click", () => {
  window.location.href = "/addproduct";
});
category.addEventListener("click", () => {
  window.location.href = "/addcategory";
});
product.addEventListener("click", () => {
  window.location.href = "/addproduct";
});
