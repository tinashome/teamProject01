const addCartBtn = document.getElementById("addCart");

//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", () => {

  alert('장바구니에 추가되었습니다.');

  //localStorage에 저장되는 정보입니다.
  //제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  //추후 수량기능도 추가하여 반영할 예정입니다.
  const productName = document.getElementById('productName').innerText;
  const price = document.getElementById('price').innerText;

  //데이터를 뿌릴때는 '/'을 기준으로 split하여 페이지에 나타낼 예정입니다.
  localStorage.setItem(`${productName}`, `${productName}/ ${price}` )
})

//Q. 나중에 API로 데이터를 받아올 때에도 이렇게 id와 id.value로 localStorage에 저장을해도 무방할까요?
//Q. 로컬스토리지를 처음 사용해봐서 이렇게 사용하는 것이 맞는지 잘 모르겠습니다....! 
//   특히, setItem을 하는 부분에 제품명, 가격, 수량을 저장해두고 장바구니 페이지에서 다시 페이지에 데이터를 펼쳐야하는데, 
//   split으로 나누어 뿌리는 방법이 적절한지, 아니면 데이터 베이스의 아이디값을 저장해두고 다시 받아오는 방식이 가능한지 궁금합니다!