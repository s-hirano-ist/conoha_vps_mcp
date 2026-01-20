/**
 * Object Storage APIレスポンスフォーマッター
 *
 * @remarks
 * OpenStack Object Storage (Swift) APIからのレスポンスを
 * 統一されたJSON形式に変換します。
 *
 * @packageDocumentation
 */

import { Buffer } from "node:buffer";

/**
 * HEADリクエストのレスポンスをフォーマット
 *
 * @param response - fetch APIのResponseオブジェクト
 * @returns JSON文字列（status、statusText、headersを含む）
 *
 * @remarks
 * HEADリクエストではレスポンスボディがないため、
 * ヘッダー情報のみを返します。
 *
 * @example
 * ```typescript
 * const response = await fetch(url, { method: "HEAD" });
 * const formatted = formatHeadResponse(response);
 * // formatted: '{"status":200,"statusText":"OK","headers":{...}}'
 * ```
 */
export function formatHeadResponse(response: Response): string {
	const responseHeaders: Record<string, string> = {};
	response.headers.forEach((value, key) => {
		responseHeaders[key] = value;
	});

	return JSON.stringify({
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
	});
}

/**
 * オブジェクト取得（ダウンロード）レスポンスをフォーマット
 *
 * @param response - fetch APIのResponseオブジェクト
 * @param content - レスポンスボディのテキスト
 * @returns JSON文字列（status、statusText、headers、body、encodingを含む）
 *
 * @remarks
 * Content-Typeに基づいてバイナリかテキストかを判定し、
 * バイナリデータの場合はBase64エンコードして返します。
 * エンコーディング情報も含めることで、クライアント側で
 * 適切にデコードできるようにします。
 *
 * @example
 * ```typescript
 * const response = await fetch(url);
 * const content = await response.text();
 * const formatted = formatObjectGetResponse(response, content);
 * // formatted: '{"status":200,"statusText":"OK","headers":{...},"body":"...","encoding":"base64"}'
 * ```
 */
export function formatObjectGetResponse(
	response: Response,
	content: string,
): string {
	const responseHeaders: Record<string, string> = {};
	response.headers.forEach((value, key) => {
		responseHeaders[key] = value;
	});

	const contentType = response.headers.get("content-type") || "";

	let body: string;
	const isBinary =
		!contentType.includes("text/") &&
		!contentType.includes("application/json") &&
		!contentType.includes("application/xml");

	if (isBinary) {
		const buffer = Buffer.from(content, "binary");
		body = buffer.toString("base64");
	} else {
		body = content;
	}

	return JSON.stringify({
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
		body: body,
		encoding: isBinary ? "base64" : "utf8",
	});
}
