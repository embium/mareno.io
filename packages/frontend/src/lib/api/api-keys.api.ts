/**
 * API Keys client for managing user API keys
 */

import { api } from './client';

export interface ApiKeyResponse {
	id: string;
	name: string;
	masked_key: string;
	is_active: boolean;
	created_at: string;
	last_used_at: string | null;
	revoked_at: string | null;
}

export interface ApiKeyCreateResponse {
	id: string;
	name: string;
	key: string; // Full key shown only once
	masked_key: string;
	created_at: string;
}

export interface ApiKeyListResponse {
	api_keys: ApiKeyResponse[];
	count: number;
}

export interface ApiKeyDeleteResponse {
	message: string;
	id: string;
}

export const apiKeysApi = {
	/**
	 * Generate a new API key
	 */
	generateKey: async (name: string): Promise<ApiKeyCreateResponse> => {
		return api.post<ApiKeyCreateResponse>('/api/api-keys', { name });
	},

	/**
	 * List all API keys for the current user
	 */
	listKeys: async (): Promise<ApiKeyListResponse> => {
		return api.get<ApiKeyListResponse>('/api/api-keys');
	},

	/**
	 * Delete/revoke an API key
	 */
	deleteKey: async (keyId: string): Promise<ApiKeyDeleteResponse> => {
		return api.delete<ApiKeyDeleteResponse>(`/api/api-keys/${keyId}`);
	}
};
