import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/users/users/register로 요청해야 함.)
userRouter.post("/register", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const { fullName, email, password } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({ fullName, email, password });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 로그인 api (아래는 / 이지만, 실제로는 /api/users 요청해야 함.)
userRouter.post("/", async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { email, password } = req.body;

    // 로그인 진행 성공시 userId(문자열) 와 jwt 토큰(문자열)을 프론트에 보냄
    const token = await userService.getUserToken({ email, password });
    const userId = await userService.getUserId(email);

    res.status(200).json({ userId, token });
  } catch (error) {
    next(error);
  }
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get("/", loginRequired, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const userRole = await req.currentUserRole;
    if (userRole !== "admin") {
      console.log(`${userRole}의  회원목록조회 요청이 거부됨`);
      throw new Error("권한이 없습니다.");
    }
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch("/:userId", loginRequired, async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.params.userId;
    const { fullName, password, address, phoneNumber, role, currentPassword } =
      req.body;

    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

//사용자 정보 삭제(탈퇴)
userRouter.delete("/:userId", loginRequired, async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.params.userId;
    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const currentPassword = req.body.currentPassword;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error("회원정보 삭제를 위해, 현재의 비밀번호가 필요합니다.");
    }

    const userInfoRequired = { userId, currentPassword };

    const deleteUser = await userService.deleteUser(userInfoRequired);

    res.status(200).json("OK");
  } catch (error) {
    next(error);
  }
});

// 현재 유저 정보을 가져옴
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get("/:userId", loginRequired, async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const users = await userService.getUserInfo(userId);

    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 주문서 작성시 사용자 주소 입력
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.put("/:userId", loginRequired, async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.params.userId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { address, phoneNumber } = req.body;
    const userInfoRequired = { userId };

    const toUpdate = {
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUserAddress(
      userInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

// 권한정보 수정 관리등급이 회원등급에게 권한 부여가능.
userRouter.post("/role", loginRequired, async function (req, res, next) {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userRole = await req.currentUserRole;
    if (userRole !== "admin") {
      console.log(`${userRole}의 전체 권한 부여 요청이 거부됨`);
      throw new Error("권한이 없습니다.");
    }
    const email = await req.body.email;

    // 사용자 정보를 업데이트함.
    const setRoleInfo = await userService.setRole(email);

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(setRoleInfo);
  } catch (error) {
    next(error);
  }
});

//유저 id값을 받아서 이름을 반환(게시판에서 사용)
userRouter.get("/:userId/name", loginRequired, async function (req, res, next) {
  try {
    const currentUserId = req.currentUserId;
    const userRole = await req.currentUserRole;
    const userId = req.params.userId;

    if (userId !== currentUserId && userRole !== "admin") {
      console.log(`${userRole}의 userId로 이름조회 요청이 거부됨`);
      throw new Error("권한이 없습니다.");
    }

    const userName = await userService.getUserInfo(userId);
    const { fullName } = userName;
    res.status(200).json({ fullName });
  } catch (error) {
    next(error);
  }
});

// 아이디값가져오는 api (아래는 /id 이지만, 실제로는 /api/users/id 요청해야 함.)
userRouter.get("/id", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    // id를 프론트에 보냄 (id는, object ID임)
    res.status(200).json({ userId });
  } catch (error) {
    next(error);
  }
});
export { userRouter };
