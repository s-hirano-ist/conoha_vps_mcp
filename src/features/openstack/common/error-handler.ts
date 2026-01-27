/**
 * エラーハンドリングユーティリティ
 *
 * @packageDocumentation
 */

/**
 * エラーオブジェクトをユーザーフレンドリーなメッセージに変換
 *
 * @param error - 任意のエラーオブジェクト
 * @returns フォーマット済みエラーメッセージ文字列
 *
 * @remarks
 * Errorインスタンスの場合はメッセージを抽出し、
 * それ以外の場合は汎用的なエラーメッセージを返します。
 *
 * @example
 * ```typescript
 * try {
 *   await someOperation();
 * } catch (error) {
 *   const message = formatErrorMessage(error);
 *   // message: "API Error: Connection failed"
 * }
 * ```
 */
export function formatErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return `API Error: ${error.message}`;
	}
	return "Unexpected error occurred.";
}
