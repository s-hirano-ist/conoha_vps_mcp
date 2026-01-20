/**
 * OpenStack Object Storage (Swift) APIクライアント
 *
 * @remarks
 * オブジェクトストレージのコンテナ、オブジェクト、メタデータを管理するAPIクライアントです。
 *
 * @packageDocumentation
 */

import { readFile } from "node:fs/promises";
import type { JsonObject } from "../../../types.js";
import { generateApiToken } from "../common/generate-api-token.js";
import { formatResponse } from "../common/response-formatter.js";
import { OPENSTACK_OBJECT_STORAGE_BASE_URL } from "../constants.js";
import {
	formatHeadResponse,
	formatObjectGetResponse,
} from "./response-formatter.js";

const TENANT_ID = process.env.OPENSTACK_TENANT_ID;

/**
 * ストレージメタデータを設定（POST）
 *
 * @param path - APIパス
 * @param headerparam - ヘッダーパラメータ
 * @returns フォーマット済みJSONレスポンス
 */
export async function setPostStorageMetadata(
	path: string,
	headerparam: JsonObject,
) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	for (const [key, value] of Object.entries(headerparam)) {
		if (value !== undefined) {
			headers[key] = value as string;
		}
	}

	const response = await fetch(url, {
		method: "POST",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージメタデータを設定（PUT）
 *
 * @param path - APIパス
 * @returns フォーマット済みJSONレスポンス
 */
export async function setPutStorageMetadata(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "PUT",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージアカウント情報を取得
 *
 * @param path - APIパス（例: "/v1/AUTH_{tenantId}"）
 * @returns アカウント情報を含むJSONレスポンス（ヘッダー情報を含む）
 */
export async function getStorageAccountInfo(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "HEAD",
		headers,
	});

	return formatHeadResponse(response);
}

/**
 * ストレージコンテナ情報を取得
 *
 * @param path - APIパス（例: "/v1/AUTH_{tenantId}/{container}"）
 * @returns コンテナ情報を含むJSONレスポンス（ヘッダー情報を含む）
 */
export async function getStorageContainerInfo(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "HEAD",
		headers,
	});

	return formatHeadResponse(response);
}

/**
 * ストレージコンテナ一覧を取得
 *
 * @param path - APIパス（例: "/v1/AUTH_{tenantId}"）
 * @returns フォーマット済みJSONレスポンス
 */
export async function getStorageContainerList(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "GET",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージオブジェクト一覧を取得
 *
 * @param path - APIパス（例: "/v1/AUTH_{tenantId}/{container}"）
 * @returns フォーマット済みJSONレスポンス
 */
export async function getStorageObjectList(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "GET",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージオブジェクト情報を取得（ダウンロード）
 *
 * @param path - APIパス（例: "/v1/AUTH_{tenantId}/{container}/{object}"）
 * @returns オブジェクト情報とコンテンツを含むJSONレスポンス（バイナリはbase64エンコード）
 */
export async function getStorageObjectInfo(path: string) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "GET",
		headers,
	});

	const content = await response.text();

	return formatObjectGetResponse(response, content);
}

/**
 * ストレージオブジェクトを削除
 *
 * @param path - APIパス（{tenantId}は自動置換される）
 * @returns 削除結果を含むJSONレスポンス
 */
export async function deleteStorageObject(path: string) {
	const apiToken = await generateApiToken();
	const tenantId = TENANT_ID || "";

	const pathWithTenantId = path.replace("{tenantId}", tenantId);

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${pathWithTenantId}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "DELETE",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージコンテナを削除
 *
 * @param path - APIパス（{tenantId}は自動置換される）
 * @returns 削除結果を含むJSONレスポンス
 */
export async function deleteStorageContainer(path: string) {
	const apiToken = await generateApiToken();
	const tenantId = TENANT_ID || "";

	const pathWithTenantId = path.replace("{tenantId}", tenantId);

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${pathWithTenantId}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	const response = await fetch(url, {
		method: "DELETE",
		headers,
	});

	return await formatResponse(response);
}

/**
 * ストレージオブジェクトをアップロード
 *
 * @param path - APIパス
 * @param content - ファイルパス（絶対パス）またはBase64エンコードされた文字列
 * @param contentType - MIMEタイプ（省略可）
 * @returns アップロード結果を含むJSONレスポンス
 */
export async function uploadStorageObject(
	path: string,
	content: string,
	contentType?: string,
) {
	const apiToken = await generateApiToken();

	const url = `${OPENSTACK_OBJECT_STORAGE_BASE_URL}${path}`;

	const headers: Record<string, string> = {
		Accept: "application/json",
		"X-Auth-Token": apiToken,
	};

	if (contentType) {
		headers["Content-Type"] = contentType;
	}

	let body: Uint8Array;
	try {
		const fileContent = await readFile(content);
		body = new Uint8Array(fileContent);
	} catch {
		try {
			const binaryString = Buffer.from(content, "base64").toString("binary");
			body = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				body[i] = binaryString.charCodeAt(i);
			}
		} catch {
			body = new TextEncoder().encode(content);
		}
	}

	const response = await fetch(url, {
		method: "PUT",
		headers,
		body,
	});

	return await formatResponse(response);
}
