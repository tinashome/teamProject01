const order = document.querySelector(".managingOrder");
const users = document.querySelector(".managingUsers");
const category = document.querySelector(".addCategory");
const product = document.querySelector(".addProduct");
const modifyCategory = document.querySelector(".modifyCategory");
const modifyProduct = document.querySelector(".modifyProduct");

order.addEventListener("click", () => {
  window.location.href = "/ordermanage";
});
users.addEventListener("click", () => {
  window.location.href = "/users";
});
category.addEventListener("click", () => {
  window.location.href = "/addcategory";
});
product.addEventListener("click", () => {
  window.location.href = "/addproduct";
});
modifyCategory.addEventListener("click", () => {
  window.location.href = "/displaycategory";
});
modifyProduct.addEventListener("click", () => {
  window.location.href = "/displayproduct";
});
