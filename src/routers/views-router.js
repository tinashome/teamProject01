import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/sample", serveStatic("temp"));
viewsRouter.use("/mypage", serveStatic("my-information"));
viewsRouter.use("/cart", serveStatic("shopping-cart"));

viewsRouter.use("/detail/:id", serveStatic("product-detail"));
viewsRouter.use("/productlist", serveStatic("product-list"));
viewsRouter.use("/addproduct", serveStatic("add-product"));
viewsRouter.use("/addcategory", serveStatic("add-category"));
viewsRouter.use("/displaycategory", serveStatic("display-category"));
viewsRouter.use("/displayproduct", serveStatic("display-product"));

viewsRouter.use("/modifyproduct/:productId", serveStatic("modify-product"));
viewsRouter.use("/modifycategory/:id", serveStatic("modify-category"));

viewsRouter.use("/boardlist", serveStatic("board-list"));
viewsRouter.use("/boardlist/write", serveStatic("add-board-post"));
viewsRouter.use("/boardlist/:postId", serveStatic("update-board-post"));

viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/ordercomplete", serveStatic("order-complete"));
viewsRouter.use("/orderlist", serveStatic("order-list"));
viewsRouter.use("/ordermanage", serveStatic("order-manage"));
viewsRouter.use("/managingpage", serveStatic("managing-page"));
viewsRouter.use("/users", serveStatic("users-management"));
viewsRouter.use("/:id/navigation", serveStatic("navigation"));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
