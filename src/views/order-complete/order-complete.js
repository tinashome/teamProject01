// 주문내역보기 버튼
const orderDetailButton = document.getElementById("orderDetailButton");

orderDetailButton.addEventListener("click", (e) => {
  window.location.href = "/orderlist";
});

// 홈으로 이동 버튼
const shoppingButton = document.getElementById("shoppingButton");
shoppingButton.addEventListener("click", (e) => {
  window.location.href = "/";
});
