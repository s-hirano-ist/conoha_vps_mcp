/**
 * OpenStack Networking (Neutron) APIクライアント
 *
 * @remarks
 * セキュリティグループ、ポート、ネットワーク設定を管理するAPIクライアントです。
 *
 * @packageDocumentation
 */

import type { JsonObject } from "../../../types.js";
import { executeOpenstackApi } from "../common/openstack-client.js";
import { formatResponse } from "../common/response-formatter.js";
import { OPENSTACK_NETWORK_BASE_URL } from "../constants.js";
import { formatGetSecurityGroupResponse } from "./get-security-group-response-formatter.js";

/**
 * ネットワークリソース一覧を取得
 *
 * @param path - APIパス（例: "/v2.0/ports"）
 * @returns フォーマット済みJSONレスポンス
 */
export async function getNetwork(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_NETWORK_BASE_URL,
		path,
	);
	return await formatResponse(response);
}

/**
 * 特定のネットワークリソースを取得
 *
 * @param path - APIパス
 * @param param - リソースID
 * @returns フォーマット済みJSONレスポンス
 */
export async function getNetworkByParam(path: string, param: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_NETWORK_BASE_URL,
		`${path}/${param}`,
	);
	return await formatResponse(response);
}

/**
 * セキュリティグループ一覧を取得（カスタムフォーマット）
 *
 * @param path - APIパス（"/v2.0/security-groups"）
 * @returns セキュリティグループ専用フォーマットのJSONレスポンス
 */
export async function getSecurityGroup(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_NETWORK_BASE_URL,
		path,
	);
	return await formatGetSecurityGroupResponse(response);
}

/**
 * ネットワークリソースを作成
 *
 * @param path - APIパス
 * @param requestBody - 作成するリソースの設定
 * @returns 作成されたリソース情報を含むJSONレスポンス
 */
export async function createNetwork(path: string, requestBody: JsonObject) {
	const response = await executeOpenstackApi(
		"POST",
		OPENSTACK_NETWORK_BASE_URL,
		path,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * ネットワークリソースを更新
 *
 * @param path - APIパス
 * @param param - リソースID
 * @param requestBody - 更新内容
 * @returns 更新されたリソース情報を含むJSONレスポンス
 */
export async function updateNetworkByParam(
	path: string,
	param: string,
	requestBody: JsonObject,
) {
	const response = await executeOpenstackApi(
		"PUT",
		OPENSTACK_NETWORK_BASE_URL,
		`${path}/${param}`,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * ネットワークリソースを削除
 *
 * @param path - APIパス
 * @param param - リソースID
 * @returns 削除結果を含むJSONレスポンス
 */
export async function deleteNetworkByParam(path: string, param: string) {
	const response = await executeOpenstackApi(
		"DELETE",
		OPENSTACK_NETWORK_BASE_URL,
		`${path}/${param}`,
	);
	return await formatResponse(response);
}
