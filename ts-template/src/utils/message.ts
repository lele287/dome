import { Message } from "view-design";
/***
 * @description 成功提示信息
 * @param{String} text 提示内容
 */
export function successMsg(text: string): void {
  Message.success(text);
}
/***
 * @description 错误提示信息
 * @param{String} text 提示内容
 */
export function errorMsg(text: string): void {
  Message.error(text);
}
/***
 * @description 提示信息
 * @param{String} text 提示内容
 */
export function infoMsg(text: string): void {
  Message.info(text);
}
