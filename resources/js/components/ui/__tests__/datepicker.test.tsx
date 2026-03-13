import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { DatePicker, type DateRange, type DatePreset } from '../datepicker'

describe('DatePicker', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(
        <DatePicker
          label="Select Date"
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText('Select Date')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(
        <DatePicker
          placeholder="Choose a date"
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText('Choose a date')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(
        <DatePicker
          helperText="Pick any date"
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText('Pick any date')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(
        <DatePicker
          error="Invalid date"
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText('Invalid date')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid date')
    })

    it('shows required indicator', () => {
      render(
        <DatePicker
          label="Date"
          required
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByLabelText('required')).toBeInTheDocument()
    })

    it('displays selected single date', () => {
      const date = new Date(2024, 0, 15) // Jan 15, 2024
      render(
        <DatePicker
          value={date}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument()
    })

    it('displays selected date range', () => {
      const range: DateRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31)
      }
      render(
        <DatePicker
          mode="range"
          value={range}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByText(/Jan 1, 2024 - Jan 31, 2024/)).toBeInTheDocument()
    })
  })

  describe('Calendar Popup', () => {
    it('opens calendar when clicked', async () => {
      const user = userEvent.setup()
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('closes calendar when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <DatePicker
            value={null}
            onChange={() => {}}
          />
          <button>Outside</button>
        </div>
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const outsideButton = screen.getByText('Outside')
      fireEvent.mouseDown(outsideButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('displays current month by default', async () => {
      const user = userEvent.setup()
      const now = new Date()
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        const expectedMonth = `${monthNames[now.getMonth()]} ${now.getFullYear()}`
        expect(screen.getByText(expectedMonth)).toBeInTheDocument()
      })
    })

    it('navigates to previous month', async () => {
      const user = userEvent.setup()
      render(
        <DatePicker
          value={new Date(2024, 5, 15)} // June 2024
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('June 2024')).toBeInTheDocument()
      })
      
      const prevButton = screen.getByLabelText('Previous month')
      await user.click(prevButton)
      
      await waitFor(() => {
        expect(screen.getByText('May 2024')).toBeInTheDocument()
      })
    })

    it('navigates to next month', async () => {
      const user = userEvent.setup()
      render(
        <DatePicker
          value={new Date(2024, 5, 15)} // June 2024
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('June 2024')).toBeInTheDocument()
      })
      
      const nextButton = screen.getByLabelText('Next month')
      await user.click(nextButton)
      
      await waitFor(() => {
        expect(screen.getByText('July 2024')).toBeInTheDocument()
      })
    })
  })

  describe('Single Date Selection', () => {
    it('calls onChange with selected date', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      
      render(
        <DatePicker
          value={null}
          onChange={onChange}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Click on day 15
      const day15 = screen.getByRole('button', { name: /15/ })
      await user.click(day15)
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Date))
      const calledDate = onChange.mock.calls[0][0] as Date
      expect(calledDate.getDate()).toBe(15)
    })

    it('closes calendar after selecting date in single mode', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const day15 = screen.getByRole('button', { name: /15/ })
      await user.click(day15)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Date Range Selection', () => {
    it('selects start date first', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      
      render(
        <DatePicker
          mode="range"
          value={null}
          onChange={onChange}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const day10 = screen.getByRole('button', { name: /10/ })
      await user.click(day10)
      
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          start: expect.any(Date),
          end: null
        })
      )
    })

    it('selects end date after start date', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const startDate = new Date(2024, 5, 10)
      
      render(
        <DatePicker
          mode="range"
          value={{ start: startDate, end: null }}
          onChange={onChange}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const day20 = screen.getByRole('button', { name: /20/ })
      await user.click(day20)
      
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          start: expect.any(Date),
          end: expect.any(Date)
        })
      )
    })

    it('swaps dates if end is before start', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const startDate = new Date(2024, 5, 20)
      
      render(
        <DatePicker
          mode="range"
          value={{ start: startDate, end: null }}
          onChange={onChange}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const day10 = screen.getByRole('button', { name: /10/ })
      await user.click(day10)
      
      const range = onChange.mock.calls[0][0] as DateRange
      expect(range.start.getDate()).toBe(10)
      expect(range.end?.getDate()).toBe(20)
    })
  })

  describe('Date Constraints', () => {
    it('disables dates before minDate', async () => {
      const user = userEvent.setup()
      const minDate = new Date(2024, 5, 15)
      
      render(
        <DatePicker
          value={new Date(2024, 5, 20)}
          onChange={() => {}}
          minDate={minDate}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const buttons = screen.getAllByRole('button')
      const day10 = buttons.find(btn => btn.textContent === '10')
      expect(day10).toBeDefined()
      expect(day10).toBeDisabled()
    })

    it('disables dates after maxDate', async () => {
      const user = userEvent.setup()
      const maxDate = new Date(2024, 5, 15)
      
      render(
        <DatePicker
          value={new Date(2024, 5, 10)}
          onChange={() => {}}
          maxDate={maxDate}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const buttons = screen.getAllByRole('button')
      const day20 = buttons.find(btn => btn.textContent === '20')
      expect(day20).toBeDefined()
      expect(day20).toBeDisabled()
    })

    it('does not call onChange for disabled dates', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const minDate = new Date(2024, 5, 15)
      
      render(
        <DatePicker
          value={null}
          onChange={onChange}
          minDate={minDate}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const buttons = screen.getAllByRole('button')
      const day10 = buttons.find(btn => btn.textContent === '10')
      expect(day10).toBeDefined()
      if (day10) {
        await user.click(day10)
      }
      
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Presets', () => {
    it('displays default presets for single mode', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Today')).toBeInTheDocument()
        expect(screen.getByText('Yesterday')).toBeInTheDocument()
      })
    })

    it('displays default presets for range mode', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          mode="range"
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('This Week')).toBeInTheDocument()
        expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
      })
    })

    it('applies preset when clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      
      render(
        <DatePicker
          value={null}
          onChange={onChange}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Today')).toBeInTheDocument()
      })
      
      const todayPreset = screen.getByText('Today')
      await user.click(todayPreset)
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    })

    it('uses custom presets when provided', async () => {
      const user = userEvent.setup()
      const customPresets: DatePreset[] = [
        {
          label: 'Custom Preset',
          getValue: () => new Date(2024, 0, 1)
        }
      ]
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          presets={customPresets}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Custom Preset')).toBeInTheDocument()
        expect(screen.queryByText('Today')).not.toBeInTheDocument()
      })
    })

    it('hides presets when showPresets is false', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          showPresets={false}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      expect(screen.queryByText('Today')).not.toBeInTheDocument()
      expect(screen.queryByText('Presets')).not.toBeInTheDocument()
    })
  })

  describe('Clear Functionality', () => {
    it('shows clear button when value is set', () => {
      render(
        <DatePicker
          value={new Date()}
          onChange={() => {}}
        />
      )
      
      expect(screen.getByLabelText('Clear date')).toBeInTheDocument()
    })

    it('does not show clear button when value is null', () => {
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument()
    })

    it('calls onChange with null when clear is clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      
      render(
        <DatePicker
          value={new Date()}
          onChange={onChange}
        />
      )
      
      const clearButton = screen.getByLabelText('Clear date')
      await user.click(clearButton)
      
      expect(onChange).toHaveBeenCalledWith(null)
    })

    it('does not show clear button when disabled', () => {
      render(
        <DatePicker
          value={new Date()}
          onChange={() => {}}
          disabled
        />
      )
      
      expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('does not open calendar when disabled', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          disabled
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('applies disabled styles', () => {
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          disabled
        />
      )
      
      const trigger = screen.getByRole('button')
      expect(trigger).toHaveClass('cursor-not-allowed')
      expect(trigger).toHaveClass('opacity-60')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <DatePicker
          label="Date"
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup()
      
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('associates error message with input', () => {
      render(
        <DatePicker
          error="Invalid date"
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      const errorId = trigger.getAttribute('aria-describedby')
      
      expect(errorId).toBeTruthy()
      expect(screen.getByRole('alert')).toHaveAttribute('id', errorId)
    })

    it('marks as invalid when error is present', () => {
      render(
        <DatePicker
          error="Invalid date"
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-invalid', 'true')
    })

    it('marks as required when required prop is true', () => {
      render(
        <DatePicker
          required
          value={null}
          onChange={() => {}}
        />
      )
      
      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-required', 'true')
    })
  })
})
