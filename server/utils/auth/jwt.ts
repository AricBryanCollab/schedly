import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export const generateTokenAndSetCookie = (
  userId: string,
  req: Request,
  res: Response
) => {
  const userAgent = req.headers["user-agent"] || "";
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "5h",
  });
  res.cookie("jwt", token, {
    maxAge: 5 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isSafari ? undefined : "strict",
    secure: isSafari ? false : process.env.NODE_ENV !== "development",
  });
};

export const verifyToken = (token: string): DecodedToken => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in the environment variables");
  }

  return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
};
