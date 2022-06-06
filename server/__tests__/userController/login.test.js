const user = require("../../controlles/user-controller").login;
const userService = require("../../service/user-service");
const ApiError = require("../../exceptions/api-error");

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
    password: "123456",
    id: "62838f84e4e2fac20845a5a7",
  },
};

const next = jest.fn();
jest.spyOn(userService, "login").mockImplementation(() => res);

describe("Login controller", () => {

  afterEach(() => {jest.clearAllMocks()});
  test("should not get arguments req and called next as a result", async () => {
    await user({}, res, next);
    expect(next).toBeCalled();
  });
  test("should get arguments mockReq without password property and return error", async () => {
    const mockReq = {
      body: {
        email: "dyaral696@gmail.com",
        isActivated: true,
      },
    };
    await user(mockReq, res, next);
    expect(next).toHaveBeenCalledWith(
      ApiError.BadRequest("User was not found with this email")
    );
  });
  test("should get argument req with email and password", async () => {
    await user(req, res, next);
    expect(req.body).toHaveProperty("email");
    expect(req.body).toHaveProperty("password");
  });
  test("should get argument req and return res", async () => {
    let result;
    userService.login.mockReturnValue(res);
    await user(req, res, next).then(() => {
      result = res;
    });
    expect(userService.login).toBeCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(res);
  });
});
