const addCartBtn = document.getElementById("addCart");
const productName = document.getElementById('productName').innerText;
const price = document.getElementById('price').innerText;
const productImage = document.getElementById("chocolate1").src;

const CARTLIST_KEY = "cartList";
//임시 장바구니
let addCartList = [];
//최종 장바구니
let uniqCartList = [];
function saveCartList(){
  localStorage.setItem(CARTLIST_KEY, JSON.stringify(uniqCartList));
}
//'장바구니 추가'버튼을 누르면 alert창이 뜨면서 localStorage에 담기게 됩니다.
addCartBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //localStorage에 저장되는 정보입니다.
  //제품명을 key 값으로 가지며, 제품명과 가격을 value로 가집니다.
  //추후 수량기능도 추가하여 반영할 예정입니다.

  const data = {};
  data.name = productName;
  data.price = price;
  data.img = productImage;

  addCartList.push(data);

  const isadded = uniqCartList.find(e => e.name === productName);
  if(isadded){
    alert("이미 추가된 상품입니다!")
  } else{
    alert("장바구니에 추가되었습니다.");
  }


  makeAddCartList();
  makeUniq();
  saveCartList();
})

function makeAddCartList(){
  let existedData = JSON.parse(localStorage.getItem(CARTLIST_KEY));
  if(existedData !== null){
    existedData.forEach(e => {
      addCartList.push(e)
    });
  }
}

function makeUniq(){
  const map = new Map();
  for(const item of addCartList){
    map.set(JSON.stringify(item), item);
  }
  uniqCartList = [...map.values()];
};