/**
 * OpenStack Block Storage (Cinder) APIクライアント
 *
 * @remarks
 * ブロックストレージボリュームの作成、取得、更新、削除を行うAPIクライアントです。
 *
 * @packageDocumentation
 */

import type { JsonObject } from "../../../types.js";
import { executeOpenstackApi } from "../common/openstack-client.js";
import { formatResponse } from "../common/response-formatter.js";
import { OPENSTACK_VOLUME_BASE_URL } from "../constants.js";

const TENANT_ID = process.env.OPENSTACK_TENANT_ID;

const OPENSTACK_VOLUME_TENANT_BASE_URL = `${OPENSTACK_VOLUME_BASE_URL}/${TENANT_ID}`;

/**
 * ボリューム情報を取得
 *
 * @param path - APIパス（例: "/volumes/detail", "/types"）
 * @returns フォーマット済みJSONレスポンス
 */
export async function getVolume(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_VOLUME_TENANT_BASE_URL,
		path,
	);
	return await formatResponse(response);
}

/**
 * ボリュームを作成
 *
 * @param path - APIパス（"/volumes"）
 * @param requestBody - ボリューム作成設定
 * @returns 作成されたボリューム情報を含むJSONレスポンス
 */
export async function createVolume(path: string, requestBody: JsonObject) {
	const response = await executeOpenstackApi(
		"POST",
		OPENSTACK_VOLUME_TENANT_BASE_URL,
		path,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * ボリュームを更新
 *
 * @param path - APIパス（"/volumes"）
 * @param param - ボリュームID
 * @param requestBody - 更新内容
 * @returns 更新されたボリューム情報を含むJSONレスポンス
 */
export async function updateVolumeByParam(
	path: string,
	param: string,
	requestBody: JsonObject,
) {
	const response = await executeOpenstackApi(
		"PUT",
		OPENSTACK_VOLUME_TENANT_BASE_URL,
		`${path}/${param}`,
		requestBody,
	);
	return await formatResponse(response);
}

/**
 * ボリュームを削除
 *
 * @param path - APIパス（"/volumes"）
 * @param param - ボリュームID
 * @returns 削除結果を含むJSONレスポンス
 */
export async function deleteVolumeByParam(path: string, param: string) {
	const response = await executeOpenstackApi(
		"DELETE",
		OPENSTACK_VOLUME_TENANT_BASE_URL,
		`${path}/${param}`,
	);
	return await formatResponse(response);
}
