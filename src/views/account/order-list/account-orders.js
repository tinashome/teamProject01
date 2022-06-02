const list = document.getElementById("ordersContainer")
// 테스트용
const date = [{
    date: '2020',
    product_list: "dd",
    userStatus: "준비중",
},
]


// 날짜, 상품리스트, 준비상태 불러오기
document.addEventListener("DOMContentLoaded", await function() {
    //     const res = await fetch(`불러오기`)
    //     const data = await res.json()
    date.forEach(element=>{
                const date = element.date
                const product_list = element.product_list
                const userStatusData = element.userStatus
                const wrapper = document.createElement("div")
                wrapper.classList.add("columns orders-item")
                wrapper.setAttribute("id", "order-629428a0eb5d1ed00c61f51c")

                const orderDate = document.createElement("div")
                orderDate.classList.add("column is-2")
                orderDate.textContent = date

                const orderProduct = document.createElement("div")
                orderProduct.classList.add("column is-6 order-summary")
                orderProduct.textContent = product_list

                const userStatus = document.createElement("div")
                userStatus.classList.add("column is-2")
                userStatus.textContent = userStatusData

                const btnWrapper = document.createElement("div")
                btnWrapper.classList.add("column is-2")
                
                const btn = document.createElement("button")
                btn.classList.add("button")
                btn.setAttribute("id", "deleteButton-629428a0eb5d1ed00c61f51c")


                btnWrapper.appendChild(btn)
                wrapper.append(orderDate, orderProduct, userStatus, btnWrapper)
                

                list.innerHTML+=`
                    <div class="columns orders-item" id="order-629428a0eb5d1ed00c61f51c">
                        <div class="column is-2">${date}</div>
                        <div class="column is-6 order-summary">${product_list}</div>
                        <div class="column is-2">${userStatus}</div>
                        <div class="column is-2">
                            <button class="button" id="deleteButton-629428a0eb5d1ed00c61f51c">주문취소</button>
                        </div>
                    </div>
                `
            });

            // 버튼 여러개를 하나로 묶어야함
            const button = document.getElementById("deleteButton-629428a0eb5d1ed00c61f51c")
            button.addEventListener("click", (e)=>{
                e.preventDefault()
               
                const modal = document.getElementById("modal")
                modal.className="modal is-active"

                const deleteCancelButton = document.getElementById("deleteCancelButton")
                const deleteCompleteButton = document.getElementById("deleteCompleteButton")
                const modalCloseButton = document.getElementById("modalCloseButton")

                deleteCancelButton.addEventListener("click", (e)=>{
                    e.preventDefault()
                    modal.className = "modal" 
                })

            })

                deleteCompleteButton.addEventListener("click", (e)=>{
                    e.preventDefault()
                    alert("주문정보가 삭제되었습니다") 

                    modal.className = "modal"

                    const block_delete = document.getElementById("order-629428a0eb5d1ed00c61f51c")
                    block_delete.remove()
                 })


                 modalCloseButton.addEventListener("click", (e)=>{
                     e.preventDefault()
                     modal.className = "modal" 
                 })

                //  주문을 취소 했으니 서버에서도 취소를 알려야한다
           
  });




