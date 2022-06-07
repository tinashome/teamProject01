import * as Api from '../api'

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("제품 정보가 저장되었습니다.");
  //데이터 백으로 넘기는 작업

  const formData = new FormData();
  
  //데이터 만들기
  for(const item of form.elements){
    switch(item.type){
      case 'text':
        data[item.name] = item.value;
        break;
      case 'file':
        data[item.name] = item.value;
        break;
    }
    switch(item.localName){
      case 'select':
        data[item.name] = item.value;
        break;
      case 'textarea':
        data[item.name] = item.value;
        break;
    }
  }
  Api.post("/api/product",data);
});