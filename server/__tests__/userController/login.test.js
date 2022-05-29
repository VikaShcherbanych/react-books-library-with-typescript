const user = require("../../controlles/user-controller");
const userService = require("../../service/user-service");
const ApiError = require("../../exceptions/api-error");

// async login(req, res, next) {
//   try {
//       if (!req.body.email || !req.body.password) {
//           throw ApiError.BadRequest('User was not found with this email');
//       }
//       const {email, password} = req.body;
//       const userData = await userService.login(email, password);
//       res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
//       return res.json(userData);
//   } catch (e) {
//       next(e)
//   }
// }

const res = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR5YXJhbDY5NkBnbWFpbC5jb20iLCJpZCI6IjYyODM4Zjg0ZTRlMmZhYzIwODQ1YTVhNyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NTMyNTQ4NzEsImV4cCI6MTY1MzM0MTI3MX0.S-VZrCXZrw0NlnF9FfbFmVUEFUXsgHWqcVKLltjCc3c",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR5YXJhbDY5NkBnbWFpbC5jb20iLCJpZCI6IjYyODM4Zjg0ZTRlMmZhYzIwODQ1YTVhNyIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NTMyNTQ4NzEsImV4cCI6MTY1NTg0Njg3MX0.T-rlHIA51GAudck_pCP7sKIVOWqLTDSvgU_391C99fM",
  user: {
    email: "dyaral696@gmail.com",
    id: "62838f84e4e2fac20845a5a7",
    isActivated: true,
  },
};

const req = {
  body: {
    email: "dyaral696@gmail.com",
    id: "62838f84e4e2fac20845a5a7",
  },
};

const next = jest.fn();
jest.mock('../../service/user-service');
//jest.spyOn(userService, "login").mockImplementation(() => res);

describe("Login controller", () => {
  test("should not get arguments req", async () => {
    await user.login({}, res, next);
    expect(next).toBeCalled();
  });
  test("should get arguments mockReq without password property and return error", async () => {
    const mockReq = {
      body: {
        email: "dyaral696@gmail.com",
        isActivated: true,
      },
    };
    await user.login(mockReq, res, next);
    expect(next).toHaveBeenCalledWith(
      ApiError.BadRequest("User was not found with this email")
    );
  });
  test("should", async () => {
    userService.login = jest.fn(() => res);
    const result = await user.login(req, res, next);
    expect(userService.login).toBeCalled();
  });
});
