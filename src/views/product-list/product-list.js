import * as Api from "../api.js";

async function getProductList() {
  // API 요청
  try {
    const productData = await Api.get("/api/productlist");
    console.log({ productData });
    productData.map((e) => {
      console.log(e);

      // const productList = document.querySelector(".productList");
      // productList.appendChild();

      // const item = `
      //   <div class="productItem">
      //     <a href="#">
      //       <img class="itemImg" src="img.jpg" />
      //       <div class="itemName">${e.name}</div>
      //       <div class="itemPrice">${e.price}원</div>
      //     </a>
      //   </div>`;
      // productList.innerHTML += item;
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// const productData = [
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "다크초콜릿",
//       cateS: "96% 함유",
//     },
//     _id: "62987419d83d4486fde2aad5",
//     name: "드림카카오",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:26:01.216Z",
//     updatedAt: "2022-06-02T08:26:01.216Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "페레로로쉐",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "밀카",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "킨더초콜릿",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "다크초콜릿",
//       cateS: "96% 함유",
//     },
//     _id: "62987419d83d4486fde2aad5",
//     name: "드림카카오",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:26:01.216Z",
//     updatedAt: "2022-06-02T08:26:01.216Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "페레로로쉐",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "밀카",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
//   {
//     category: {
//       cateL: "공정무역",
//       cateM: "밀크초콜릿",
//       cateS: "72% 함유",
//     },
//     _id: "62987484d83d4486fde2aae1",
//     name: "킨더초콜릿",
//     price: 10000,
//     info: "제품 설명 입니다.",
//     company: "제조 회사 입니다.",
//     createdAt: "2022-06-02T08:27:48.533Z",
//     updatedAt: "2022-06-02T08:27:48.533Z",
//     __v: 0,
//   },
// ];

getProductList();
