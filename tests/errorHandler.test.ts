import { Request, Response } from "express";
import { AppError } from "../src/utils/AppError";
import { errorHandler } from "../src/middleware/errorHandler";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("errorHandler middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext = jest.fn();

  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn().mockReturnThis();

    mockReq = {};
    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should handle AppError correctly", () => {
    const err = new AppError("Custom app error", 400);

    process.env.NODE_ENV = "development";

    errorHandler(err, mockReq as Request, mockRes as Response, mockNext);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: "Custom app error",
        stack: err.stack,
      },
    });
  });

  it("should handle generic Error correctly", () => {
    const err = new Error("Some generic error");

    process.env.NODE_ENV = "production"; // stack should not appear

    errorHandler(err, mockReq as Request, mockRes as Response, mockNext);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: "Something went wrong. Please try again later.",
      },
    });
  });
});
