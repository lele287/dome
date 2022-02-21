//const ls = require("local-storage");
import * as ls from "local-storage";
const KEY = {
  TOKEN: "token",
  NAME: "name",
  PWD: "pwd",
  ACCOUNT: "account",
  USER_ID: "user_id",
};
export function setToken(value: string): void {
  ls.set(KEY.TOKEN, value);
}
export function setUserId(value: string | number): void {
  ls.set(KEY.USER_ID, value);
}
export function setName(value: string): void {
  ls.set(KEY.NAME, value);
}
export function setPwd(value: string): void {
  ls.set(KEY.PWD, value);
}
export function setAccount(value: string): void {
  ls.set(KEY.ACCOUNT, value);
}

export function getToken(): string {
  let tk: string = "";
  //   if (process && process.env && process.env.NODE_ENV === "development") {
  //     tk = "mk.648b721b295ac0618c24e0dfedb46ad9"; // "mk.7be49279ea411a18dd6aface64ede5a2";
  //   } else {
  //     tk = ls.get(KEY.TOKEN);
  //   }
  tk = ls.get(KEY.TOKEN);
  return tk;
}
export function getUserId(): string | number {
  let id: string | number = null;
  //   if (process && process.env && process.env.NODE_ENV === "development") {
  //     id = 1;
  //   } else {
  //     id = ls.get(KEY.USER_ID);
  //   }
  id = ls.get(KEY.USER_ID);
  return id;
}
export function getName(): string {
  return ls.get(KEY.NAME);
}
export function getPwd(): string {
  return ls.get(KEY.PWD);
}
export function getAccount(): string {
  return ls.get(KEY.ACCOUNT);
}

export function removeToken(): void {
  return ls.remove(KEY.TOKEN);
}
export function removeName(): void {
  return ls.remove(KEY.NAME);
}
export function removePwd(): void {
  return ls.remove(KEY.PWD);
}
export function removeAccount(): void {
  return ls.remove(KEY.ACCOUNT);
}

export function removeAll(): void {
  for (const key in KEY) {
    return ls.remove(KEY[key]);
  }
}
