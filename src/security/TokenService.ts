import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET, JWT_TIMEOUT_IN_SECONDS, JWT_REFRESH_TOKEN_SECRET } from "../config";
import { Request, Response } from "express";

export default class TokenService {
  static generateAccessToken(user: Object) {
    return jwt.sign(user, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_TIMEOUT_IN_SECONDS });
  }

  static generateRefreshToken(user: Object) {
    return jwt.sign(user, JWT_REFRESH_TOKEN_SECRET);
  }

  static getAccessTokenFromRefreshToken(refreshToken: any, response: Response) {
    jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (error: any, user: any) => {
      if (error) {
        return response.sendStatus(403);
      }
      const accessToken = TokenService.generateAccessToken(user);
      return response.json({ accessToken: accessToken });
    });
  }

  /**
   * Verify token when "enableSecurity" is on(true).configured in config for development activities
   * @param request
   * @param response
   * @param next
   */
  static verifyToken(request: Request, response: Response, next: Function) {
    const bearerHeader = request.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, JWT_ACCESS_TOKEN_SECRET, (error: any, user: any) => {
        if (error) {
          return response.sendStatus(403);
        }
        next();
      });
    } else {
      // Forbidden
      response.sendStatus(403);
    }
  }
}
