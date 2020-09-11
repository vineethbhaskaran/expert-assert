import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import TokenService from "../security/TokenService";
const routes = Router();

let refreshTokens: string[] = [];
const JWT_REFRESH_TOKEN_SECRET = config.security.JWT_REFRESH_TOKEN_SECRET;
export const login = routes.post("/login", (request: Request, response: Response) => {
  const email = request.body.email;
  const user = { email: email };
  const accessToken = TokenService.generateAccessToken(user);
  const refreshToken = TokenService.generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  return response.json({ accessToken: accessToken, refreshToken: refreshToken });
});

export const token = routes.post("/token", (request: Request, response: Response) => {
  const refreshToken = request.body.token;
  if (refreshToken == null) return response.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403);
  return TokenService.getAccessTokenFromRefreshToken(refreshToken, response);
});

export const logout = routes.delete("/logout", (request: Request, response: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== request.body.token);
  response.sendStatus(204);
});
