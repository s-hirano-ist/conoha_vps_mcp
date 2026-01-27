/**
 * OpenStack APIクライアント
 *
 * @remarks
 * OpenStack APIへのHTTPリクエストを実行する共通クライアントです。
 * 認証トークンの取得と設定を自動的に行います。
 *
 * @packageDocumentation
 */

import type { HttpMethod, JsonObject } from "../../../types.js";
import { USER_AGENT } from "../constants.js";
import { generateApiToken } from "./generate-api-token.js";

/**
 * OpenStack APIを実行
 *
 * @param method - HTTPメソッド（GET、DELETE）
 * @param baseUrl - APIのベースURL
 * @param path - APIパス
 * @returns fetch APIのResponseオブジェクト
 */
export async function executeOpenstackApi(
	method: "GET" | "DELETE",
	baseUrl: string,
	path: string,
): Promise<Response>;

/**
 * OpenStack APIを実行（ボディ付き）
 *
 * @param method - HTTPメソッド（POST、PUT）
 * @param baseUrl - APIのベースURL
 * @param path - APIパス
 * @param body - リクエストボディ
 * @returns fetch APIのResponseオブジェクト
 */
export async function executeOpenstackApi(
	method: "POST" | "PUT",
	baseUrl: string,
	path: string,
	body: JsonObject,
): Promise<Response>;

/**
 * OpenStack APIを実行（実装）
 *
 * @remarks
 * この関数はオーバーロードされており、GET/DELETEメソッドではbodyパラメータは不要です。
 *
 * @param method - HTTPメソッド
 * @param baseUrl - APIのベースURL
 * @param path - APIパス
 * @param body - リクエストボディ（POST/PUTの場合）
 * @returns fetch APIのResponseオブジェクト
 *
 * @example
 * ```typescript
 * // GETリクエスト
 * const response = await executeOpenstackApi("GET", baseUrl, "/servers");
 *
 * // POSTリクエスト
 * const response = await executeOpenstackApi("POST", baseUrl, "/servers", { server: {...} });
 * ```
 */
export async function executeOpenstackApi(
	method: HttpMethod,
	baseUrl: string,
	path: string,
	body?: JsonObject,
): Promise<Response> {
	const apiToken = await generateApiToken();

	// baseUrlの末尾やpathの先頭のスラッシュの有無に関わらず、正しいURLを生成
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const url = `${baseUrl}${normalizedPath}`;

	const response = await fetch(url, {
		method,
		headers: {
			Accept: "application/json",
			"User-Agent": USER_AGENT,
			"X-Auth-Token": apiToken,
			...(body ? { "Content-Type": "application/json" } : {}),
		},
		...(body ? { body: JSON.stringify(body) } : {}),
	});

	return response;
}
