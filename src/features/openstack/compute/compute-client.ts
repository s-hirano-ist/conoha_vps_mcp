/**
 * OpenStack Compute (Nova) APIクライアント
 *
 * @remarks
 * サーバー（仮想マシン）の作成、取得、削除、操作を行うAPIクライアントです。
 *
 * @packageDocumentation
 */

import type { JsonObject } from "../../../types.js";
import { executeOpenstackApi } from "../common/openstack-client.js";
import { formatResponse } from "../common/response-formatter.js";
import { OPENSTACK_COMPUTE_BASE_URL } from "../constants.js";
import { formatGetFlavorResponse } from "./get-flavor-response-formatter.js";

/**
 * Compute APIからリソース一覧を取得
 *
 * @param path - APIパス（例: "/servers/detail"）
 * @returns フォーマット済みJSONレスポンス
 */
export async function getCompute(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_COMPUTE_BASE_URL,
		path,
	);
	return await formatResponse(response);
}

/**
 * フレーバー一覧を取得
 *
 * @param path - APIパス（"/flavors/detail"）
 * @returns フレーバー情報を含むフォーマット済みJSONレスポンス
 *
 * @remarks
 * フレーバーはサーバーのスペック（CPU、メモリ、ディスク）を定義します。
 */
export async function getFlavor(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_COMPUTE_BASE_URL,
		path,
	);
	return await formatGetFlavorResponse(response);
}

/**
 * 特定サーバーのリソースを取得
 *
 * @param path - APIパス（例: "/ips"）
 * @param param - サーバーID
 * @returns フォーマット済みJSONレスポンス
 */
export async function getComputeByParam(path: string, param: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_COMPUTE_BASE_URL,
		`/servers/${param}${path}`,
	);
	return await formatResponse(response);
}

/**
 * Computeリソースを作成
 *
 * @param path - APIパス（例: "/servers"）
 * @param requestBody - 作成するリソースの設定
 * @returns 作成されたリソースの情報を含むJSONレスポンス
 */
export async function createCompute(path: string, requestBody: JsonObject) {
	const response = await executeOpenstackApi(
		"POST",
		OPENSTACK_COMPUTE_BASE_URL,
		path,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * 特定サーバーに対する操作を実行
 *
 * @param path - 操作パス（例: "/action"）
 * @param param - サーバーID
 * @param requestBody - 操作内容（起動、停止、リサイズなど）
 * @returns 操作結果を含むJSONレスポンス
 */
export async function createComputeByParam(
	path: string,
	param: string,
	requestBody: JsonObject,
) {
	const response = await executeOpenstackApi(
		"POST",
		OPENSTACK_COMPUTE_BASE_URL,
		`/servers/${param}${path}`,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * Computeリソースを削除
 *
 * @param path - APIパス（例: "/servers"）
 * @param param - 削除対象のリソースID
 * @returns 削除結果を含むJSONレスポンス
 */
export async function deleteComputeByParam(path: string, param: string) {
	const response = await executeOpenstackApi(
		"DELETE",
		OPENSTACK_COMPUTE_BASE_URL,
		`${path}/${param}`,
	);
	return await formatResponse(response);
}
