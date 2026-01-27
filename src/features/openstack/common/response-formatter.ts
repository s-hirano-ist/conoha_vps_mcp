/**
 * APIレスポンスフォーマッター
 *
 * @remarks
 * OpenStack APIからのレスポンスを統一されたJSON形式に変換します。
 *
 * @packageDocumentation
 */

/**
 * APIレスポンスを統一形式にフォーマット
 *
 * @param response - fetch APIのResponseオブジェクト
 * @returns JSON文字列（status、statusText、bodyを含む）
 *
 * @remarks
 * レスポンスボディがJSONとしてパースできない場合は、
 * 生のテキストをbodyに格納します。
 *
 * @example
 * ```typescript
 * const response = await fetch(url);
 * const formatted = await formatResponse(response);
 * // formatted: '{"status":200,"statusText":"OK","body":{...}}'
 * ```
 */
export async function formatResponse(response: Response) {
	const raw = await response.text();
	try {
		return JSON.stringify({
			status: response.status,
			statusText: response.statusText,
			body: JSON.parse(raw),
		});
	} catch (error) {
		console.error("Failed to parse response body as JSON:", error);
		return JSON.stringify({
			status: response.status,
			statusText: response.statusText,
			body: raw,
		});
	}
}
