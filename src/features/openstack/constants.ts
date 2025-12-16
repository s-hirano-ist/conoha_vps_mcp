/**
 * OpenStack APIエンドポイント定数
 *
 * @remarks
 * ConoHa VPS c3j1リージョンのOpenStack APIベースURLを定義します。
 *
 * @packageDocumentation
 */

/**
 * Identity (Keystone) API ベースURL
 */
export const OPENSTACK_IDENTITY_BASE_URL = "https://identity.c3j1.conoha.io/v3";

/**
 * Compute (Nova) API ベースURL
 */
export const OPENSTACK_COMPUTE_BASE_URL = "https://compute.c3j1.conoha.io/v2.1";

/**
 * Block Storage (Cinder) API ベースURL
 */
export const OPENSTACK_VOLUME_BASE_URL =
	"https://block-storage.c3j1.conoha.io/v3";

/**
 * Image (Glance) API ベースURL
 */
export const OPENSTACK_IMAGE_BASE_URL = "https://image-service.c3j1.conoha.io";

/**
 * Networking (Neutron) API ベースURL
 */
export const OPENSTACK_NETWORK_BASE_URL = "https://networking.c3j1.conoha.io";
