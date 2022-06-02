const orderDetailButton = document.getElementById("orderDetailButton")
orderDetailButton.addEventListener("click", (e)=>{

    window.location.href = "../order-list/account-orders.html";
    // 서버에 주문정보 보내야함
})

const shoppingButton = document.getElementById("shoppingButton")
shoppingButton.addEventListener("click", (e)=>{

    window.location.href = "../../home/home.html";
    // 서버에 주문정보 보내야함
})