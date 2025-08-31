import { validateCreateInput } from "../src/create/validateCreateInput.ts"
import type { RawCreateValues } from "../src/types/index.ts"

describe("validateCreateInput", () => {
  const cases: {
    name: string
    input: RawCreateValues
    expected: { ok: boolean; messageIncludes?: string }
  }[] = [
    {
      name: "タイトルがない → NG",
      input: {
        summary: "",
        startDate: "2025-08-20",
        endDate: "2025-08-21",
      },
      expected: { ok: false, messageIncludes: "タイトル" },
    },
    {
      name: "開始日がない → NG",
      input: {
        summary: "テスト",
        startDate: "",
        endDate: "2025-08-21",
      },
      expected: { ok: false, messageIncludes: "開始日" },
    },
    {
      name: "終了日が開始日より前 → NG",
      input: {
        summary: "テスト",
        startDate: "2025-08-21",
        endDate: "2025-08-20",
      },
      expected: { ok: false, messageIncludes: "開始日時＞終了日時" },
    },
    {
      name: "終了時刻だけある → NG",
      input: {
        summary: "テスト",
        startDate: "2025-08-20",
        endDate: "2025-08-20",
        endTime: "13:00",
      },
      expected: { ok: false, messageIncludes: "終了時刻を入力する場合" },
    },
    {
      name: "正しい入力（日付のみ） → OK",
      input: {
        summary: "テスト",
        startDate: "2025-08-20",
        endDate: "2025-08-21",
      },
      expected: { ok: true },
    },
    {
      name: "正しい入力（日付＋時間） → OK",
      input: {
        summary: "テスト",
        startDate: "2025-08-20",
        endDate: "2025-08-20",
        startTime: "12:00",
        endTime: "13:00",
      },
      expected: { ok: true },
    },
  ]

  cases.forEach(({ name, input, expected }) => {
    it(name, () => {
      const result = validateCreateInput(input)
      expect(result.ok).toBe(expected.ok)
      if (!expected.ok && expected.messageIncludes) {
        expect(result.message).toContain(expected.messageIncludes)
      }
    })
  })
})
