import { settingsApi } from '../settingsApi';
import api from '../api';

// Mock the API module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

/**
 * Unit tests for Settings API Client
 * 
 * Tests the API client methods for settings operations:
 * - Get/update church settings
 * - Get/update notification preferences
 * - Update user profile
 * 
 * Validates Requirements: 6.4, 6.5, 6.6
 */
describe('settingsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getChurchSettings', () => {
    it('should fetch church settings successfully', async () => {
      // Arrange
      const mockSettings = {
        id: 1,
        church_name: 'Test Church',
        address: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        zip_code: '12345',
        phone: '123-456-7890',
        email: 'test@church.org',
        website: 'https://testchurch.org',
        service_times: 'Sunday 9:00 AM',
      };

      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockSettings,
        },
      });

      // Act
      const result = await settingsApi.getChurchSettings();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledWith('/settings/church');
      expect(result).toEqual(mockSettings);
    });

    it('should throw error when request fails', async () => {
      // Arrange
      mockedApi.get.mockRejectedValue(new Error('Network error'));

      // Act & Assert
      await expect(settingsApi.getChurchSettings()).rejects.toThrow('Network error');
    });
  });

  describe('updateChurchSettings', () => {
    it('should update church settings successfully', async () => {
      // Arrange
      const formData = {
        church_name: 'Updated Church',
        address: '456 Oak Ave',
        city: 'New City',
        state: 'New State',
        zip_code: '54321',
        phone: '098-765-4321',
        email: 'updated@church.org',
        website: 'https://updatedchurch.org',
        service_times: 'Sunday 10:00 AM',
      };

      const mockResponse = {
        id: 1,
        ...formData,
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: mockResponse,
        },
      });

      // Act
      const result = await settingsApi.updateChurchSettings(formData);

      // Assert
      expect(mockedApi.put).toHaveBeenCalledWith('/settings/church', formData);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when validation fails', async () => {
      // Arrange
      const formData = {
        church_name: '',
        address: '456 Oak Ave',
        city: 'New City',
        state: 'New State',
        zip_code: '54321',
        phone: '098-765-4321',
        email: 'invalid-email',
        website: 'https://updatedchurch.org',
        service_times: 'Sunday 10:00 AM',
      };

      mockedApi.put.mockRejectedValue({
        response: {
          data: {
            success: false,
            message: 'Validation failed',
            errors: {
              church_name: ['Church name is required'],
              email: ['Please enter a valid email address'],
            },
          },
        },
      });

      // Act & Assert
      await expect(settingsApi.updateChurchSettings(formData)).rejects.toMatchObject({
        response: {
          data: {
            success: false,
            errors: expect.any(Object),
          },
        },
      });
    });
  });

  describe('getNotificationPreferences', () => {
    it('should fetch notification preferences successfully', async () => {
      // Arrange
      const mockPreferences = {
        email_notifications: true,
        sms_notifications: false,
        system_notifications: true,
      };

      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockPreferences,
        },
      });

      // Act
      const result = await settingsApi.getNotificationPreferences();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledWith('/settings/notifications');
      expect(result).toEqual(mockPreferences);
    });
  });

  describe('updateNotificationPreferences', () => {
    it('should update notification preferences successfully', async () => {
      // Arrange
      const preferences = {
        email_notifications: false,
        sms_notifications: true,
        system_notifications: false,
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: preferences,
        },
      });

      // Act
      const result = await settingsApi.updateNotificationPreferences(preferences);

      // Assert
      expect(mockedApi.put).toHaveBeenCalledWith('/settings/notifications', preferences);
      expect(result).toEqual(preferences);
    });

    it('should handle partial preference updates', async () => {
      // Arrange
      const preferences = {
        email_notifications: true,
        sms_notifications: true,
        system_notifications: true,
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: preferences,
        },
      });

      // Act
      const result = await settingsApi.updateNotificationPreferences(preferences);

      // Assert
      expect(result).toEqual(preferences);
    });
  });

  describe('updateProfile', () => {
    it('should update profile without password successfully', async () => {
      // Arrange
      const profileData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const mockResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: mockResponse,
        },
      });

      // Act
      const result = await settingsApi.updateProfile(profileData);

      // Assert
      expect(mockedApi.put).toHaveBeenCalledWith('/profile', profileData);
      expect(result).toEqual(mockResponse);
    });

    it('should update profile with password successfully', async () => {
      // Arrange
      const profileData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'NewPassword123',
      };

      const mockResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      };

      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          data: mockResponse,
        },
      });

      // Act
      const result = await settingsApi.updateProfile(profileData);

      // Assert
      expect(mockedApi.put).toHaveBeenCalledWith('/profile', profileData);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when password complexity validation fails', async () => {
      // Arrange
      const profileData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
      };

      mockedApi.put.mockRejectedValue({
        response: {
          data: {
            success: false,
            message: 'Validation failed',
            errors: {
              password: ['Password must be at least 8 characters with uppercase, lowercase, and number'],
            },
          },
        },
      });

      // Act & Assert
      await expect(settingsApi.updateProfile(profileData)).rejects.toMatchObject({
        response: {
          data: {
            success: false,
            errors: expect.any(Object),
          },
        },
      });
    });

    it('should throw error when email is invalid', async () => {
      // Arrange
      const profileData = {
        name: 'John Doe',
        email: 'invalid-email',
      };

      mockedApi.put.mockRejectedValue({
        response: {
          data: {
            success: false,
            message: 'Validation failed',
            errors: {
              email: ['Please enter a valid email address'],
            },
          },
        },
      });

      // Act & Assert
      await expect(settingsApi.updateProfile(profileData)).rejects.toMatchObject({
        response: {
          data: {
            success: false,
            errors: expect.any(Object),
          },
        },
      });
    });
  });
});

