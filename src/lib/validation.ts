/**
 * 入力文字列がDateに変換可能かを判定する
 * @param dateStr - 判定したい日付文字列
 * @returns 成功時は { ok: true, date: Date }、失敗時は { ok: false, msg: string }
 */
export function validateDate(dateStr: string):
  { ok: boolean, message?: string}
{
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return { ok: false, message: '日付の形式が不正です' }
  }
  return { ok: true }
}

/**
 * 時刻文字列が "HH:mm" 形式で有効か判定する
 * @param timeStr - 判定したい時刻文字列
 * @returns 成功時は { ok: true, hour: number, minute: number }、失敗時は { ok: false, msg: string }
 */
export function validateTime(rawTimeStr: string):
  {ok: boolean,  message?: string}
{
  const timeStr = rawTimeStr.trim()
  // 空文字は無効
  if (!timeStr) {
    return { ok: false, message: "時刻が空です" }
  }

  // 正規表現で "HH:mm" 形式をチェック
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr)
  if (!match) {
    return { ok: false, message: '形式が "HH:mm" ではありません' }
  }

  const hour = parseInt(match[1]!, 10)
  const minute = parseInt(match[2]!, 10)

  if (hour < 0 || hour > 23) {
    return { ok: false, message: "時の値が0〜23の範囲外です" }
  }

  if (minute < 0 || minute > 59) {
    return { ok: false, message: "分の値が0〜59の範囲外です" }
  }

  return { ok: true }
}


// 日付及び時刻の比較結果型
export type TemporalRelation = "Same" | "Before" | "After";

type DateCompareResult =
  | { ok: false; message: string }
  | { ok: true; relation: TemporalRelation };

/**
 * 日付の比較を行う
 * @param baseDate yyyy-mm-dd形式
 * @param targetDate 同上
 * @returns
 */
export function compareDates(
  baseDate: string,
  targetDate: string
): DateCompareResult {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // 形式チェック
  if (!dateRegex.test(baseDate) || !dateRegex.test(targetDate)) {
    return { ok: false, message: "日付の形式が不正です (yyyy-mm-dd)" };
  }

  const base = new Date(baseDate);
  const target = new Date(targetDate);

  if (isNaN(base.getTime()) || isNaN(target.getTime())) {
    return { ok: false, message: "日付の値が不正です" };
  }

  if (base.getTime() === target.getTime()) {
    return { ok: true, relation: "Same" };
  }
  if (base.getTime() < target.getTime()) {
    return { ok: true, relation: "Before" };
  }
  return { ok: true, relation: "After" };
}

/**
 * 日時の比較を行う
 * @param dateTime1 yyyy-mm-ddTHH:ii:ss形式
 * @param dateTime2 同上
 * @returns
 */
export function compareDateTimes(
  dateTime1: string, // e.g. "2025-08-20T12:00"
  dateTime2: string  // e.g. "2025-08-20T15:00"
): { ok: boolean; relation?: TemporalRelation } {
  const dt1 = new Date(dateTime1);
  const dt2 = new Date(dateTime2);

  if (isNaN(dt1.getTime()) || isNaN(dt2.getTime())) {
    return { ok: false };
  }

  if (dt1.getTime() === dt2.getTime()) return { ok: true, relation: "Same" };
  if (dt1.getTime() < dt2.getTime()) return { ok: true, relation: "Before" };
  return { ok: true, relation: "After" };
}
