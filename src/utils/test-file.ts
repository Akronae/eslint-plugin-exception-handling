import { ESLint, Linter } from "eslint";
import { describe, expect, it } from "vitest";

export function testFile(
  filename: string,
  rules: string[],
  errors: Partial<Linter.LintMessage>[]
) {
  const lint = new ESLint({ overrideConfigFile: "eslint.config.test.js" });

  const expectLints = errors.reduce((acc, error) => {
    if (!error.messageId) return acc;
    if (!acc[error.messageId]) acc[error.messageId] = 0;
    acc[error.messageId]++;
    return acc;
  }, {} as Record<string, number>);

  const expectedLintsString =
    Object.entries(expectLints)
      .map(([k, v]) => `${v} '${k}'`)
      .join(", ") || "no error";

  describe(filename, () => {
    it(`should lint ${expectedLintsString}`, async () => {
      const res = await lint.lintFiles([filename]);
      const messages = res[0].messages.filter(
        (m) => m.ruleId && rules.includes(m.ruleId.split("/").at(-1) as string)
      );

      expect(messages).toEqual(
        errors.map((lint) => {
          return expect.objectContaining(lint);
        })
      );
      if (errors.length === 0) {
        expect(messages).toStrictEqual([]);
      }
    });
  });
}
