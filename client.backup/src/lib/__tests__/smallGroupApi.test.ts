import { smallGroupApi, type SmallGroup } from '../smallGroupApi';
import api from '../api';

// Mock the api module
jest.mock('../api');

const mockApi = api as jest.Mocked<typeof api>;

describe('smallGroupApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSmallGroup: SmallGroup = {
    id: 1,
    name: 'Young Adults',
    description: 'Fellowship for young adults',
    leader_name: 'John Doe',
    meeting_day: 'Friday',
    meeting_time: '7:00 PM',
    location: 'Church Hall',
    member_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  describe('getSmallGroups', () => {
    it('should fetch all small groups', async () => {
      const mockGroups = [mockSmallGroup];
      mockApi.get.mockResolvedValue({ data: { data: mockGroups } });

      const result = await smallGroupApi.getSmallGroups();

      expect(mockApi.get).toHaveBeenCalledWith('/small-groups');
      expect(result).toEqual(mockGroups);
    });

    it('should return empty array if data is null', async () => {
      mockApi.get.mockResolvedValue({ data: { data: null } });

      const result = await smallGroupApi.getSmallGroups();

      expect(result).toEqual([]);
    });
  });

  describe('getSmallGroup', () => {
    it('should fetch a single small group by ID', async () => {
      mockApi.get.mockResolvedValue({ data: { data: mockSmallGroup } });

      const result = await smallGroupApi.getSmallGroup(1);

      expect(mockApi.get).toHaveBeenCalledWith('/small-groups/1');
      expect(result).toEqual(mockSmallGroup);
    });
  });

  describe('createSmallGroup', () => {
    it('should create a new small group', async () => {
      const newGroup = {
        name: 'Young Adults',
        description: 'Fellowship for young adults',
        leader_name: 'John Doe',
        meeting_day: 'Friday',
        meeting_time: '7:00 PM',
        location: 'Church Hall',
      };

      mockApi.post.mockResolvedValue({ data: { data: mockSmallGroup } });

      const result = await smallGroupApi.createSmallGroup(newGroup);

      expect(mockApi.post).toHaveBeenCalledWith('/small-groups', newGroup);
      expect(result).toEqual(mockSmallGroup);
    });
  });

  describe('updateSmallGroup', () => {
    it('should update an existing small group', async () => {
      const updates = {
        name: 'Updated Name',
        description: 'Updated description',
      };

      const updatedGroup = { ...mockSmallGroup, ...updates };
      mockApi.put.mockResolvedValue({ data: { data: updatedGroup } });

      const result = await smallGroupApi.updateSmallGroup(1, updates);

      expect(mockApi.put).toHaveBeenCalledWith('/small-groups/1', updates);
      expect(result).toEqual(updatedGroup);
    });
  });

  describe('deleteSmallGroup', () => {
    it('should delete a small group', async () => {
      mockApi.delete.mockResolvedValue({ data: { success: true } });

      await smallGroupApi.deleteSmallGroup(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/small-groups/1');
    });
  });
});
