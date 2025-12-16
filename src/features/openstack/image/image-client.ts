/**
 * OpenStack Image (Glance) APIクライアント
 *
 * @remarks
 * 仮想マシンイメージの一覧取得を行うAPIクライアントです。
 *
 * @packageDocumentation
 */

import { executeOpenstackApi } from "../common/openstack-client.js";
import { OPENSTACK_IMAGE_BASE_URL } from "../constants.js";
import { formatGetImageResponse } from "./get-image-response-formatter.js";

/**
 * イメージ一覧を取得
 *
 * @param path - APIパス（"/v2/images?limit=200"）
 * @returns フォーマット済みJSONレスポンス
 *
 * @remarks
 * 取得結果にはOSイメージ、アプリケーションイメージなどが含まれます。
 */
export async function getImage(path: string) {
	const response = await executeOpenstackApi(
		"GET",
		OPENSTACK_IMAGE_BASE_URL,
		path,
	);
	return await formatGetImageResponse(response);
}
