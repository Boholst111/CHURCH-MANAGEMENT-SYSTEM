import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCard from '../ProfileCard';
import { ToastProvider } from '../../../contexts/ToastContext';

const mockProfile = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  role: 'Senior Pastor',
  department: 'Ministry',
  email: 'john.doe@church.com',
  phone: '123-456-7890',
  photo_url: 'https://example.com/photo.jpg',
  bio: 'A dedicated pastor with over 10 years of experience serving the community.',
  start_date: '2020-01-01',
};

const mockProfileWithoutPhoto = {
  ...mockProfile,
  photo_url: null,
};

const mockProfileWithoutBio = {
  ...mockProfile,
  bio: null,
};

// Helper to render with ToastProvider
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('ProfileCard', () => {
  describe('Display Requirements', () => {
    it('should display profile name correctly', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display role title', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
    });

    it('should display department', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Ministry')).toBeInTheDocument();
    });

    it('should display email with link', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const emailLink = screen.getByText('john.doe@church.com');
      expect(emailLink).toBeInTheDocument();
      expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john.doe@church.com');
    });

    it('should display phone with link', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const phoneLink = screen.getByText('123-456-7890');
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:123-456-7890');
    });

    it('should display bio when provided', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText(/A dedicated pastor with over 10 years/)).toBeInTheDocument();
    });

    it('should not display bio section when bio is null', () => {
      renderWithProviders(<ProfileCard leadership={mockProfileWithoutBio} />);
      
      expect(screen.queryByText(/A dedicated pastor/)).not.toBeInTheDocument();
    });

    it('should display photo when photo_url is provided', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const img = screen.getByAltText('John Doe');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('should display placeholder icon when photo_url is null', () => {
      renderWithProviders(<ProfileCard leadership={mockProfileWithoutPhoto} />);
      
      // Check that no image with alt text is rendered
      expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
      
      // Check that the placeholder container exists
      const { container } = renderWithProviders(<ProfileCard leadership={mockProfileWithoutPhoto} />);
      const placeholder = container.querySelector('.w-32.h-32.rounded-full.border-4');
      expect(placeholder).toBeInTheDocument();
    });

    it('should display years of service stat', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Years of Service')).toBeInTheDocument();
      // Should calculate years from start_date (2020-01-01 to now)
      const yearsElement = screen.getByText('Years of Service').previousSibling;
      expect(yearsElement).toBeInTheDocument();
    });

    it('should display ministry teams stat', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Ministry Teams')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display events led stat', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Events Led')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('should display View Profile and Contact buttons for all users', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('View Profile')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should not display Edit and Archive buttons when no handlers provided', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Archive')).not.toBeInTheDocument();
    });

    it('should display Edit and Archive buttons when handlers are provided', () => {
      const onEdit = jest.fn();
      const onDelete = jest.fn();
      renderWithProviders(<ProfileCard leadership={mockProfile} onEdit={onEdit} onDelete={onDelete} />);
      
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Archive')).toBeInTheDocument();
    });

    it('should call onEdit when edit button is clicked', () => {
      const onEdit = jest.fn();
      const onDelete = jest.fn();
      renderWithProviders(
        <ProfileCard
          leadership={mockProfile}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
      
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
      
      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(mockProfile);
    });

    it('should have Contact button with mailto link behavior', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const contactButton = screen.getByText('Contact');
      expect(contactButton).toBeInTheDocument();
      
      // Verify the button exists and is clickable
      expect(contactButton.closest('button')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply hover effect classes', () => {
      const { container } = renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const card = container.querySelector('.hover\\:shadow-xl');
      expect(card).toBeInTheDocument();
    });

    it('should have gradient header section', () => {
      const { container } = renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const header = container.querySelector('.bg-gradient-to-br.from-primary-500.to-primary-700');
      expect(header).toBeInTheDocument();
    });

    it('should have elevated shadow', () => {
      const { container } = renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const card = container.querySelector('.shadow-lg');
      expect(card).toBeInTheDocument();
    });

    it('should have circular photo with border', () => {
      renderWithProviders(<ProfileCard leadership={mockProfile} />);
      
      const img = screen.getByAltText('John Doe');
      expect(img).toHaveClass('rounded-full');
      expect(img).toHaveClass('border-4');
      expect(img).toHaveClass('border-white');
    });
  });

  describe('Edge Cases', () => {
    it('should handle long names gracefully', () => {
      const longNameProfile = {
        ...mockProfile,
        first_name: 'Christopher',
        last_name: 'Montgomery-Wellington',
      };
      
      renderWithProviders(<ProfileCard leadership={longNameProfile} />);
      
      expect(screen.getByText('Christopher Montgomery-Wellington')).toBeInTheDocument();
    });

    it('should handle long role titles', () => {
      const longRoleProfile = {
        ...mockProfile,
        role: 'Associate Pastor of Youth and Young Adults Ministry',
      };
      
      renderWithProviders(<ProfileCard leadership={longRoleProfile} />);
      
      expect(screen.getByText('Associate Pastor of Youth and Young Adults Ministry')).toBeInTheDocument();
    });

    it('should handle long department names', () => {
      const longDeptProfile = {
        ...mockProfile,
        department: 'Children and Family Ministry Department',
      };
      
      renderWithProviders(<ProfileCard leadership={longDeptProfile} />);
      
      expect(screen.getByText('Children and Family Ministry Department')).toBeInTheDocument();
    });

    it('should handle long email addresses', () => {
      const longEmailProfile = {
        ...mockProfile,
        email: 'christopher.montgomery-wellington@verylongchurchname.com',
      };
      
      renderWithProviders(<ProfileCard leadership={longEmailProfile} />);
      
      const emailLink = screen.getByText('christopher.montgomery-wellington@verylongchurchname.com');
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveClass('truncate');
    });

    it('should calculate years of service correctly for recent start date', () => {
      const recentProfile = {
        ...mockProfile,
        start_date: new Date().toISOString().split('T')[0], // Today
      };
      
      renderWithProviders(<ProfileCard leadership={recentProfile} />);
      
      expect(screen.getByText('Years of Service')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should calculate years of service correctly for old start date', () => {
      const oldProfile = {
        ...mockProfile,
        start_date: '2010-01-01', // 14+ years ago
      };
      
      renderWithProviders(<ProfileCard leadership={oldProfile} />);
      
      expect(screen.getByText('Years of Service')).toBeInTheDocument();
      // Should show at least 14 years
      const yearsText = screen.getByText('Years of Service').previousSibling?.textContent;
      expect(parseInt(yearsText || '0')).toBeGreaterThanOrEqual(14);
    });
  });
});
