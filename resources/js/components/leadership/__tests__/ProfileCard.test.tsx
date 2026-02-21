import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCard from '../ProfileCard';

const mockProfile = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  role: 'Senior Pastor',
  department: 'Ministry',
  email: 'john.doe@church.com',
  phone: '123-456-7890',
  photo_url: 'https://example.com/photo.jpg',
  bio: 'A dedicated pastor',
  start_date: '2020-01-01',
};

const mockProfileWithoutPhoto = {
  ...mockProfile,
  photo_url: null,
};

describe('ProfileCard', () => {
  describe('Display Requirements', () => {
    it('should display profile name correctly', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display role title', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
    });

    it('should display department tag', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.getByText('Ministry')).toBeInTheDocument();
    });

    it('should display photo when photo_url is provided', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      const img = screen.getByAltText('John Doe');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('should display placeholder icon when photo_url is null', () => {
      render(<ProfileCard leadership={mockProfileWithoutPhoto} />);
      
      // Check that the User icon is rendered (Lucide icons render as SVG)
      const placeholder = screen.getByText('John Doe').closest('.p-6')?.previousSibling;
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe('Admin Actions', () => {
    it('should not display edit/delete buttons when no handlers provided', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });

    it('should display edit and delete buttons when handlers are provided', () => {
      const onEdit = jest.fn();
      const onDelete = jest.fn();
      render(<ProfileCard leadership={mockProfile} onEdit={onEdit} onDelete={onDelete} />);
      
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should call onEdit when edit button is clicked', () => {
      const onEdit = jest.fn();
      const onDelete = jest.fn();
      render(
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

    it('should call onDelete when delete button is clicked', () => {
      const onEdit = jest.fn();
      const onDelete = jest.fn();
      render(
        <ProfileCard
          leadership={mockProfile}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
      
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
      
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(mockProfile);
    });

    it('should not throw error when onEdit is not provided', () => {
      const onDelete = jest.fn();
      render(<ProfileCard leadership={mockProfile} onDelete={onDelete} />);
      
      // Edit button should still be shown since onDelete is provided (admin mode)
      const editButton = screen.queryByText('Edit');
      expect(editButton).toBeInTheDocument();
      
      // Clicking it should not throw
      if (editButton) {
        expect(() => fireEvent.click(editButton)).not.toThrow();
      }
    });

    it('should not throw error when onDelete is not provided', () => {
      const onEdit = jest.fn();
      render(<ProfileCard leadership={mockProfile} onEdit={onEdit} />);
      
      // Delete button should still be shown since onEdit is provided (admin mode)
      const deleteButton = screen.queryByText('Delete');
      expect(deleteButton).toBeInTheDocument();
      
      // Clicking it should not throw
      if (deleteButton) {
        expect(() => fireEvent.click(deleteButton)).not.toThrow();
      }
    });
  });

  describe('Styling and Layout', () => {
    it('should apply hover effect classes', () => {
      const { container } = render(<ProfileCard leadership={mockProfile} />);
      
      const card = container.querySelector('.hover\\:shadow-lg');
      expect(card).toBeInTheDocument();
    });

    it('should display department as a badge with proper styling', () => {
      render(<ProfileCard leadership={mockProfile} />);
      
      const badge = screen.getByText('Ministry');
      expect(badge).toHaveClass('rounded-full');
      expect(badge).toHaveClass('bg-primary-100');
      expect(badge).toHaveClass('text-primary-700');
    });
  });

  describe('Edge Cases', () => {
    it('should handle long names gracefully', () => {
      const longNameProfile = {
        ...mockProfile,
        first_name: 'Christopher',
        last_name: 'Montgomery-Wellington',
      };
      
      render(<ProfileCard leadership={longNameProfile} />);
      
      expect(screen.getByText('Christopher Montgomery-Wellington')).toBeInTheDocument();
    });

    it('should handle long role titles', () => {
      const longRoleProfile = {
        ...mockProfile,
        role: 'Associate Pastor of Youth and Young Adults Ministry',
      };
      
      render(<ProfileCard leadership={longRoleProfile} />);
      
      expect(screen.getByText('Associate Pastor of Youth and Young Adults Ministry')).toBeInTheDocument();
    });

    it('should handle long department names', () => {
      const longDeptProfile = {
        ...mockProfile,
        department: 'Children and Family Ministry Department',
      };
      
      render(<ProfileCard leadership={longDeptProfile} />);
      
      expect(screen.getByText('Children and Family Ministry Department')).toBeInTheDocument();
    });
  });
});
