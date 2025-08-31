import { validateDate } from "./validation.ts";
import { INVALID_VALUE } from "../const.ts";

/**
 * 本日日付を文字列で返す
 * @returns {string} yyyy-mm-dd形式
 */
export function getToday(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 入力日付を正規化してDateで返す
 * @param input
 * @returns
 */
export function parseDate(input: string): Date {
  // ハイフン・スラッシュどちらも受け入れ、正規化
  const normalized = input.trim().replace(/\//g, "-");

  // 正規表現で yyyy-mm-dd or yyyy-m-d 等を許容
  const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    throw new Error("日付の形式が不正です");
  }

  const [_, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  // JavaScriptのDate：月は0始まり
  const date = new Date(year, month - 1, day);

  // 入力と一致するかチェック（例: "2025-02-30" → 3月になる）
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("入力された日付が存在しません");
  }

  return date;
}

/**
 * parseDate()のラッパー
 * 入力日付をハイフン繋ぎの日付にして返す
 * @param input
 * @returns
 */
export function parseDateToSafeString(input: string): string {
  try {  const date = parseDate(input);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch (error) {
    return INVALID_VALUE
  }
}


/**
 * 文字列で日時を与え、1時間を加算して返す
 * @param datetimeStr
 * @returns {string} yyyy-mm-ddTHH:ii:ss形式
 */
export function addOneHour(datetimeStr: string): string {
  const date = new Date(datetimeStr);

  // 1時間（60分 × 60秒 × 1000ミリ秒）を加算
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

  // フォーマットして返す（ゼロ埋めあり）
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
}

/**
 * 基準日付に年・月・日を加算した日付を返す
 * @param {string} dateStr yyyy-mm-dd
 * @param {number} addYears
 * @param {number} addMonths
 * @param {number} addDays
 * @returns
 */
export function calcDate(
  dateStr: string,
  addYears: number = 0,
  addMonths: number = 0,
  addDays: number = 0
): string {
  const validated = validateDate(dateStr)
  if (!validated.ok) return dateStr

  const normalized = dateStr.replace(/\//g, "-");

  // "yyyy-mm-dd" を Date に変換
  const [year, month, day] = normalized.split("-").map(Number);
  const date = new Date(year!, month! - 1, day); // 月は0始まり

  // 年・月・日を加算
  date.setFullYear(date.getFullYear() + addYears);
  date.setMonth(date.getMonth() + addMonths);
  date.setDate(date.getDate() + addDays);

  // yyyy-mm-dd にフォーマット
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
