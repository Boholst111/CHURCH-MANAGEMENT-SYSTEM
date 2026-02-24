import api from './api';

/**
 * Archived Item Interface
 */
export interface ArchivedItem {
  id: number;
  type: string;
  name: string;
  deleted_at: string;
  deleted_by: string;
  deleted_by_user?: {
    id: number;
    name: string;
  };
}

/**
 * Archive API Response
 */
export interface ArchiveResponse {
  success: boolean;
  data: {
    [key: string]: ArchivedItem[];
  };
  message?: string;
}

/**
 * Fetch all archived items grouped by type
 */
export const fetchAllArchived = async (): Promise<{ [key: string]: ArchivedItem[] }> => {
  const response = await api.get<ArchiveResponse>('/archives');
  return response.data.data;
};

/**
 * Fetch archived items by type
 */
export const fetchArchivedByType = async (type: string): Promise<ArchivedItem[]> => {
  const response = await api.get<{ success: boolean; data: ArchivedItem[] }>(`/archives/${type}`);
  return response.data.data;
};

/**
 * Restore an archived item
 */
export const restoreArchivedItem = async (type: string, id: number): Promise<void> => {
  await api.post(`/archives/${type}/${id}/restore`);
};

/**
 * Permanently delete an archived item
 */
export const forceDeleteArchivedItem = async (type: string, id: number): Promise<void> => {
  await api.delete(`/archives/${type}/${id}/force`);
};
