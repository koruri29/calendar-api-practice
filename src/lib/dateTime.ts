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
