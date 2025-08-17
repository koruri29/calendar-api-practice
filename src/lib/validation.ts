/**
 * 入力文字列がDateに変換可能かを判定する
 * @param dateStr - 判定したい日付文字列
 * @returns 成功時は { ok: true, date: Date }、失敗時は { ok: false, msg: string }
 */
export function validateDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return false
  }
  return true
}

/**
 * 時刻文字列が "HH:mm" 形式で有効か判定する
 * @param timeStr - 判定したい時刻文字列
 * @returns 成功時は { ok: true, hour: number, minute: number }、失敗時は { ok: false, msg: string }
 */
export function validateTime(timeStr: string):
  {ok: boolean,  message?: string}
{
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
