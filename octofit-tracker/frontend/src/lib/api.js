const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const defaultHost = 'http://localhost:8000';

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : defaultHost;

export const getApiUrl = (entity) => `${apiHost}/api/${entity}`;

export function normalizeApiResponse(payload, entityKey) {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.items && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (entityKey && Array.isArray(payload[entityKey])) {
    return payload[entityKey];
  }

  const firstArray = Object.values(payload).find((value) => Array.isArray(value));
  return firstArray ?? [];
}
