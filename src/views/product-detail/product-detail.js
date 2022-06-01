const addCartBtn = document.getElementById("addCart");



//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", () => {
  //localStorage에 저장되는 정보입니다.
  //제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  //추후 수량기능도 추가하여 반영할 예정입니다.
  const productName = document.getElementById('productName').innerText;
  const price = document.getElementById('price').innerText;
  const productImage = document.getElementById("chocolate1").src;
  const data = {};
  data.name = productName;
  data.price = price;
  data.img = productImage;

  //localStorage에 같은 이름의 KEY 값이 있다면 이미 추가된 물품임을 알려줌.
  for(let i = 0; i <= localStorage.length; i++){
    const matchingItem = JSON.parse(localStorage.getItem(i));
    console.log(matchingItem);
    if(localStorage.length<=0){
      alert('장바구니에 추가되었습니다.');
      localStorage.setItem( localStorage.length + 1, JSON.stringify(data) );
      break;
    } else if(matchingItem == `${productName}`){
      alert('이미 추가된 물품 입니다.')
    }
  }
  
})


