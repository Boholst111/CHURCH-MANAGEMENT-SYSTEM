import { memberApi } from '../memberApi';
import api from '../api';
import { Member } from '../../components/members/MemberTable';
import { MemberFormData } from '../../components/members/MemberForm';

// Mock the API module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

/**
 * Unit tests for Member API Client
 * 
 * Tests the API client methods for member CRUD operations:
 * - Create member
 * - Update member
 * - Delete member
 * - Get member
 * 
 * Validates Requirements: 3.4, 3.5
 */
describe('memberApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMember', () => {
    it('creates a new member and returns the created member', async () => {
      const formData: MemberFormData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active',
        small_group_id: 1,
        date_joined: '2024-01-01',
        birth_date: '1990-01-01',
        gender: 'male',
        membership_type: 'regular',
      };

      const createdMember: Member = {
        id: 1,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        status: formData.status,
        small_group_id: formData.small_group_id,
        date_joined: formData.date_joined,
        birth_date: formData.birth_date,
        gender: formData.gender,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockedApi.post.mockResolvedValue({
        data: {
          success: true,
          data: createdMember,
        },
      });

      const result = await memberApi.createMember(formData);

      expect(mockedApi.post).toHaveBeenCalledWith('/members', formData);
      expect(result).toEqual(createdMember);
    });

    it('throws error when API call fails', async () => {
      const formData: MemberFormData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'invalid-email',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active',
        small_group_id: null,
        date_joined: '2024-01-01',
        birth_date: null,
        gender: 'male',
        membership_type: 'regular',
      };

      const error = {
        response: {
          data: {
            success: false,
            message: 'Validation failed',
            errors: {
              email: ['Please enter a valid email address'],
            },
          },
        },
      };

      mockedApi.post.mockRejectedValue(error);

      await expect(memberApi.createMember(formData)).rejects.toEqual(error);
    });
  });

  describe('updateMember', () => {
    it('updates an existing member and returns the updated member', async () => {
      const memberId = 1;
      const formData: MemberFormData = {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@example.com',
        phone: '123-456-7890',
        address: '456 Oak Ave',
        city: 'Springfield',
        status: 'active',
        small_group_id: 2,
        date_joined: '2024-01-01',
        birth_date: '1990-01-01',
        gender: 'male',
        membership_type: 'regular',
      };

      const updatedMember: Member = {
        id: memberId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        status: formData.status,
        small_group_id: formData.small_group_id,
        date_joined: formData.date_joined,
        birth_date: formData.birth_date,
        gender: formData.gender,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: updatedMember,
        },
      });

      const result = await memberApi.updateMember(memberId, formData);

      expect(mockedApi.put).toHaveBeenCalledWith(`/members/${memberId}`, formData);
      expect(result).toEqual(updatedMember);
    });

    it('throws error when member not found', async () => {
      const memberId = 999;
      const formData: MemberFormData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active',
        small_group_id: null,
        date_joined: '2024-01-01',
        birth_date: null,
        gender: 'male',
        membership_type: 'regular',
      };

      const error = {
        response: {
          status: 404,
          data: {
            success: false,
            message: 'Member not found',
          },
        },
      };

      mockedApi.put.mockRejectedValue(error);

      await expect(memberApi.updateMember(memberId, formData)).rejects.toEqual(error);
    });
  });

  describe('deleteMember', () => {
    it('deletes a member successfully', async () => {
      const memberId = 1;

      mockedApi.delete.mockResolvedValue({
        data: {
          success: true,
          message: 'Member deleted successfully',
        },
      });

      await memberApi.deleteMember(memberId);

      expect(mockedApi.delete).toHaveBeenCalledWith(`/members/${memberId}`);
    });

    it('throws error when member not found', async () => {
      const memberId = 999;

      const error = {
        response: {
          status: 404,
          data: {
            success: false,
            message: 'Member not found',
          },
        },
      };

      mockedApi.delete.mockRejectedValue(error);

      await expect(memberApi.deleteMember(memberId)).rejects.toEqual(error);
    });
  });

  describe('getMember', () => {
    it('retrieves a member by ID', async () => {
      const memberId = 1;
      const member: Member = {
        id: memberId,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active',
        small_group_id: 1,
        date_joined: '2024-01-01',
        birth_date: '1990-01-01',
        gender: 'male',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: member,
        },
      });

      const result = await memberApi.getMember(memberId);

      expect(mockedApi.get).toHaveBeenCalledWith(`/members/${memberId}`);
      expect(result).toEqual(member);
    });

    it('throws error when member not found', async () => {
      const memberId = 999;

      const error = {
        response: {
          status: 404,
          data: {
            success: false,
            message: 'Member not found',
          },
        },
      };

      mockedApi.get.mockRejectedValue(error);

      await expect(memberApi.getMember(memberId)).rejects.toEqual(error);
    });
  });

  describe('exportMembers', () => {
    it('exports members with no filters', async () => {
      const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
      const blob = new Blob([csvContent], { type: 'text/csv' });

      mockedApi.get.mockResolvedValue({
        data: blob,
      });

      const params = new URLSearchParams();
      const result = await memberApi.exportMembers(params);

      expect(mockedApi.get).toHaveBeenCalledWith('/members/export?', {
        responseType: 'blob',
      });
      expect(result).toEqual(blob);
    });

    it('exports members with search filter', async () => {
      const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
      const blob = new Blob([csvContent], { type: 'text/csv' });

      mockedApi.get.mockResolvedValue({
        data: blob,
      });

      const params = new URLSearchParams({ search: 'John' });
      const result = await memberApi.exportMembers(params);

      expect(mockedApi.get).toHaveBeenCalledWith('/members/export?search=John', {
        responseType: 'blob',
      });
      expect(result).toEqual(blob);
    });

    it('exports members with status filter', async () => {
      const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
      const blob = new Blob([csvContent], { type: 'text/csv' });

      mockedApi.get.mockResolvedValue({
        data: blob,
      });

      const params = new URLSearchParams({ status: 'active' });
      const result = await memberApi.exportMembers(params);

      expect(mockedApi.get).toHaveBeenCalledWith('/members/export?status=active', {
        responseType: 'blob',
      });
      expect(result).toEqual(blob);
    });

    it('exports members with small group filter', async () => {
      const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
      const blob = new Blob([csvContent], { type: 'text/csv' });

      mockedApi.get.mockResolvedValue({
        data: blob,
      });

      const params = new URLSearchParams({ small_group_id: '1' });
      const result = await memberApi.exportMembers(params);

      expect(mockedApi.get).toHaveBeenCalledWith('/members/export?small_group_id=1', {
        responseType: 'blob',
      });
      expect(result).toEqual(blob);
    });

    it('exports members with multiple filters', async () => {
      const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
      const blob = new Blob([csvContent], { type: 'text/csv' });

      mockedApi.get.mockResolvedValue({
        data: blob,
      });

      const params = new URLSearchParams({
        search: 'John',
        status: 'active',
        small_group_id: '1',
      });
      const result = await memberApi.exportMembers(params);

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/members/export?search=John&status=active&small_group_id=1',
        {
          responseType: 'blob',
        }
      );
      expect(result).toEqual(blob);
    });

    it('throws error when export fails', async () => {
      const error = {
        response: {
          status: 500,
          data: {
            success: false,
            message: 'Export failed',
          },
        },
      };

      mockedApi.get.mockRejectedValue(error);

      const params = new URLSearchParams();
      await expect(memberApi.exportMembers(params)).rejects.toEqual(error);
    });
  });
});
