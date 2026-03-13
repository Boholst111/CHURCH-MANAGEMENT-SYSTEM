import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select, SelectOption } from '../select';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
];

describe('Select Component', () => {
  describe('Basic Rendering', () => {
    it('renders select element', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Choose an option" />);
      
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('renders with default placeholder', () => {
      render(<Select options={mockOptions} />);
      
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('renders with label', () => {
      render(<Select options={mockOptions} label="Select Type" />);
      
      expect(screen.getByText('Select Type')).toBeInTheDocument();
    });

    it('associates label with select', () => {
      render(<Select options={mockOptions} label="Select Type" />);
      
      const label = screen.getByText('Select Type');
      const select = screen.getByRole('combobox');
      
      expect(label).toHaveAttribute('for', select.id);
    });

    it('shows required indicator when required', () => {
      render(<Select options={mockOptions} label="Select Type" required />);
      
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveClass('text-error-500');
    });

    it('required indicator has aria-label', () => {
      render(<Select options={mockOptions} label="Select Type" required />);
      
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown when clicked', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      render(
        <div>
          <Select options={mockOptions} />
          <button>Outside</button>
        </div>
      );
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      const outsideButton = screen.getByText('Outside');
      fireEvent.mouseDown(outsideButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('displays all options when opened', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(4);
    });

    it('chevron icon rotates when dropdown opens', () => {
      const { container } = render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      const chevron = container.querySelector('.lucide-chevron-down');
      
      expect(chevron).toBeInTheDocument();
      expect(chevron).not.toHaveClass('rotate-180');
      
      fireEvent.click(select);
      
      expect(chevron).toHaveClass('rotate-180');
    });
  });

  describe('Single Select', () => {
    it('selects an option when clicked', () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const option = screen.getByText('Option 1');
      fireEvent.click(option);
      
      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('displays selected option', () => {
      render(<Select options={mockOptions} value="option2" />);
      
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('closes dropdown after selecting an option', async () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const option = screen.getByText('Option 1');
      fireEvent.click(option);
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('shows checkmark on selected option', () => {
      const { container } = render(<Select options={mockOptions} value="option1" />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const options = screen.getAllByRole('option');
      const selectedOption = options[0]; // First option is Option 1
      expect(selectedOption).toHaveClass('bg-primary-50');
      
      // Check for checkmark icon
      const checkIcon = selectedOption.querySelector('.lucide-check');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe('Multi-Select', () => {
    it('allows selecting multiple options', () => {
      const handleChange = jest.fn();
      const { rerender } = render(<Select options={mockOptions} multiple onChange={handleChange} value={[]} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      let options = screen.getAllByRole('option');
      fireEvent.click(options[0]); // Option 1
      
      // Re-render with updated value
      rerender(<Select options={mockOptions} multiple onChange={handleChange} value={['option1']} />);
      
      // Get options again after re-render
      options = screen.getAllByRole('option');
      fireEvent.click(options[1]); // Option 2
      
      // Verify both calls happened
      expect(handleChange).toHaveBeenCalledTimes(2);
      
      // Check the calls
      expect(handleChange.mock.calls[0][0]).toEqual(['option1']);
      expect(handleChange.mock.calls[1][0]).toEqual(['option1', 'option2']);
    });

    it('displays selected options as chips', () => {
      render(<Select options={mockOptions} value={['option1', 'option2']} multiple />);
      
      // Should show chips for each selected option
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      
      const chips = screen.getAllByRole('button', { name: /Remove/ });
      expect(chips).toHaveLength(2);
    });

    it('displays single option label when one is selected', () => {
      render(<Select options={mockOptions} value={['option1']} multiple />);
      
      // Should show chip for the single selected option
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      const chips = screen.getAllByRole('button', { name: /Remove/ });
      expect(chips).toHaveLength(1);
    });

    it('displays selected options as chips', () => {
      render(<Select options={mockOptions} value={['option1', 'option2']} multiple />);
      
      const chips = screen.getAllByRole('button', { name: /Remove/ });
      expect(chips).toHaveLength(2);
    });

    it('removes option when chip close button is clicked', () => {
      const handleChange = jest.fn();
      render(
        <Select 
          options={mockOptions} 
          value={['option1', 'option2']} 
          multiple 
          onChange={handleChange}
        />
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove Option 1' });
      fireEvent.click(removeButton);
      
      expect(handleChange).toHaveBeenCalledWith(['option2']);
    });

    it('does not close dropdown after selecting in multi-select mode', () => {
      render(<Select options={mockOptions} multiple />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const option = screen.getByText('Option 1');
      fireEvent.click(option);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('deselects option when clicked again', () => {
      const handleChange = jest.fn();
      render(
        <Select 
          options={mockOptions} 
          value={['option1', 'option2']} 
          multiple 
          onChange={handleChange}
        />
      );
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const options = screen.getAllByRole('option');
      const option1 = options.find(opt => opt.textContent?.includes('Option 1'));
      fireEvent.click(option1!);
      
      expect(handleChange).toHaveBeenCalledWith(['option2']);
    });
  });

  describe('Searchable', () => {
    it('displays search input when searchable', () => {
      render(<Select options={mockOptions} searchable />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
    });

    it('filters options based on search query', () => {
      render(<Select options={mockOptions} searchable />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'Option 1' } });
      
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('shows "No options found" when search has no results', () => {
      render(<Select options={mockOptions} searchable />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('search is case-insensitive', () => {
      render(<Select options={mockOptions} searchable />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'option 1' } });
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('clears search when dropdown closes', async () => {
      render(
        <div>
          <Select options={mockOptions} searchable />
          <button>Outside</button>
        </div>
      );
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'Option 1' } });
      
      expect(searchInput.value).toBe('Option 1');
      
      const outsideButton = screen.getByText('Outside');
      fireEvent.mouseDown(outsideButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      
      fireEvent.click(select);
      const newSearchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      expect(newSearchInput.value).toBe('');
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with Enter key', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      select.focus();
      fireEvent.keyDown(select, { key: 'Enter' });
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown with Space key', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      select.focus();
      fireEvent.keyDown(select, { key: ' ' });
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown with Escape key', async () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      fireEvent.keyDown(select, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('navigates options with ArrowDown key', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      fireEvent.keyDown(select, { key: 'ArrowDown' });
      fireEvent.keyDown(select, { key: 'ArrowDown' });
      
      const options = screen.getAllByRole('option');
      expect(options[1]).toHaveClass('bg-neutral-100');
    });

    it('navigates options with ArrowUp key', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      fireEvent.keyDown(select, { key: 'ArrowDown' });
      fireEvent.keyDown(select, { key: 'ArrowDown' });
      fireEvent.keyDown(select, { key: 'ArrowUp' });
      
      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveClass('bg-neutral-100');
    });

    it('selects focused option with Enter key', () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      fireEvent.keyDown(select, { key: 'ArrowDown' });
      fireEvent.keyDown(select, { key: 'Enter' });
      
      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('closes dropdown with Tab key', async () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      
      fireEvent.keyDown(select, { key: 'Tab' });
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Disabled State', () => {
    it('disables select when disabled prop is true', () => {
      render(<Select options={mockOptions} disabled />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-disabled', 'true');
      expect(select).toHaveAttribute('tabIndex', '-1');
    });

    it('applies disabled styles', () => {
      render(<Select options={mockOptions} disabled />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('bg-neutral-100');
      expect(select).toHaveClass('text-neutral-500');
      expect(select).toHaveClass('cursor-not-allowed');
    });

    it('does not open dropdown when disabled', () => {
      render(<Select options={mockOptions} disabled />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('disables individual options', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const disabledOption = screen.getByText('Disabled Option').closest('[role="option"]');
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
      expect(disabledOption).toHaveClass('opacity-50');
      expect(disabledOption).toHaveClass('cursor-not-allowed');
    });

    it('does not select disabled options', () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const disabledOption = screen.getByText('Disabled Option');
      fireEvent.click(disabledOption);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<Select options={mockOptions} error="This field is required" />);
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles', () => {
      render(<Select options={mockOptions} error="Error message" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-error-500');
      expect(select).toHaveClass('bg-error-50');
    });

    it('error message has role alert', () => {
      render(<Select options={mockOptions} error="Error message" />);
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('sets aria-invalid when error exists', () => {
      render(<Select options={mockOptions} error="Error message" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with select via aria-describedby', () => {
      render(<Select options={mockOptions} error="Error message" />);
      
      const select = screen.getByRole('combobox');
      const errorMessage = screen.getByText('Error message');
      
      expect(select).toHaveAttribute('aria-describedby', errorMessage.id);
    });

    it('does not show helper text when error is present', () => {
      render(<Select options={mockOptions} error="Error message" helperText="Helper text" />);
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('displays helper text', () => {
      render(<Select options={mockOptions} helperText="Select an option from the list" />);
      
      expect(screen.getByText('Select an option from the list')).toBeInTheDocument();
    });

    it('helper text has correct styling', () => {
      render(<Select options={mockOptions} helperText="Helper text" />);
      
      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-sm');
      expect(helperText).toHaveClass('text-neutral-500');
    });

    it('associates helper text with select via aria-describedby', () => {
      render(<Select options={mockOptions} helperText="Helper text" />);
      
      const select = screen.getByRole('combobox');
      const helperText = screen.getByText('Helper text');
      
      expect(select).toHaveAttribute('aria-describedby', helperText.id);
    });
  });

  describe('Required State', () => {
    it('sets aria-required attribute', () => {
      render(<Select options={mockOptions} required />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-required', 'true');
    });

    it('shows required indicator in label', () => {
      render(<Select options={mockOptions} label="Select Type" required />);
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Select options={mockOptions} size="sm" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-8');
      expect(select).toHaveClass('px-3');
      expect(select).toHaveClass('text-sm');
    });

    it('renders with medium size', () => {
      render(<Select options={mockOptions} size="md" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-10');
      expect(select).toHaveClass('px-4');
      expect(select).toHaveClass('text-base');
    });

    it('renders with large size', () => {
      render(<Select options={mockOptions} size="lg" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-12');
      expect(select).toHaveClass('px-4');
      expect(select).toHaveClass('text-lg');
    });
  });

  describe('Full Width', () => {
    it('applies full width by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('does not apply full width when fullWidth is false', () => {
      const { container } = render(<Select options={mockOptions} fullWidth={false} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveClass('w-full');
    });
  });

  describe('Accessibility', () => {
    it('has combobox role', () => {
      render(<Select options={mockOptions} />);
      
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has listbox role for dropdown', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('sets aria-expanded correctly', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(select);
      expect(select).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-multiselectable for multi-select', () => {
      render(<Select options={mockOptions} multiple />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('options have aria-selected attribute', () => {
      render(<Select options={mockOptions} value="option1" />);
      
      const select = screen.getByRole('combobox');
      fireEvent.click(select);
      
      const options = screen.getAllByRole('option');
      const selectedOption = options.find(opt => opt.textContent?.includes('Option 1'));
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('is keyboard accessible', () => {
      render(<Select options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      select.focus();
      
      expect(select).toHaveFocus();
    });

    it('generates unique id', () => {
      const { container } = render(
        <>
          <Select options={mockOptions} />
          <Select options={mockOptions} />
        </>
      );
      
      const selects = container.querySelectorAll('[role="combobox"]');
      expect(selects[0].id).not.toBe(selects[1].id);
    });

    it('uses provided id when given', () => {
      render(<Select options={mockOptions} id="custom-id" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('id', 'custom-id');
    });
  });
});
