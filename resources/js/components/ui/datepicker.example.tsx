import * as React from "react"
import { DatePicker, type DateRange, type DatePreset } from "./datepicker"

/**
 * DatePicker Component Examples
 * 
 * Demonstrates various use cases of the DatePicker component including:
 * - Single date selection
 * - Date range selection
 * - Custom presets
 * - Min/max date constraints
 * - Error states
 * - Disabled state
 */

export function DatePickerExamples() {
  const [singleDate, setSingleDate] = React.useState<Date | null>(null)
  const [dateRange, setDateRange] = React.useState<DateRange | null>(null)
  const [constrainedDate, setConstrainedDate] = React.useState<Date | null>(null)
  const [customPresetDate, setCustomPresetDate] = React.useState<Date | DateRange | null>(null)

  // Custom presets for specific use cases
  const customPresets: DatePreset[] = [
    {
      label: 'Today',
      getValue: () => new Date()
    },
    {
      label: 'Tomorrow',
      getValue: () => {
        const date = new Date()
        date.setDate(date.getDate() + 1)
        return date
      }
    },
    {
      label: 'Next Week',
      getValue: () => {
        const start = new Date()
        start.setDate(start.getDate() + 7)
        const end = new Date(start)
        end.setDate(end.getDate() + 6)
        return { start, end }
      }
    },
    {
      label: 'Next Month',
      getValue: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 2, 0)
        return { start, end }
      }
    }
  ]

  // Min/max dates for constrained picker
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1) // First day of current month
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0) // Last day of 3 months from now

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">DatePicker Examples</h2>
        <p className="text-neutral-600 mb-6">
          A comprehensive date picker component with calendar popup, range selection, and preset options.
        </p>
      </div>

      {/* Single Date Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Single Date Selection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Select Date"
            placeholder="Choose a date"
            value={singleDate}
            onChange={(value) => setSingleDate(value as Date | null)}
            helperText="Pick any date from the calendar"
          />

          <DatePicker
            label="Without Presets"
            placeholder="Choose a date"
            value={singleDate}
            onChange={(value) => setSingleDate(value as Date | null)}
            showPresets={false}
            helperText="Calendar only, no preset options"
          />
        </div>

        {singleDate && (
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium">Selected Date:</p>
            <p className="text-sm text-neutral-700">{singleDate.toLocaleDateString()}</p>
          </div>
        )}
      </section>

      {/* Date Range Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Date Range Selection</h3>
        
        <DatePicker
          label="Select Date Range"
          placeholder="Choose start and end dates"
          mode="range"
          value={dateRange}
          onChange={(value) => setDateRange(value as DateRange | null)}
          helperText="Click to select start date, then click again for end date"
        />

        {dateRange && (dateRange.start || dateRange.end) && (
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium">Selected Range:</p>
            <p className="text-sm text-neutral-700">
              Start: {dateRange.start?.toLocaleDateString() || 'Not selected'}
            </p>
            <p className="text-sm text-neutral-700">
              End: {dateRange.end?.toLocaleDateString() || 'Not selected'}
            </p>
          </div>
        )}
      </section>

      {/* Date Constraints */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Date Constraints</h3>
        
        <DatePicker
          label="Constrained Date Selection"
          placeholder="Select within allowed range"
          value={constrainedDate}
          onChange={(value) => setConstrainedDate(value as Date | null)}
          minDate={minDate}
          maxDate={maxDate}
          helperText={`Only dates from ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()} are selectable`}
        />

        {constrainedDate && (
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium">Selected Date:</p>
            <p className="text-sm text-neutral-700">{constrainedDate.toLocaleDateString()}</p>
          </div>
        )}
      </section>

      {/* Custom Presets */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Custom Presets</h3>
        
        <DatePicker
          label="Future Dates with Custom Presets"
          placeholder="Select a future date"
          mode="range"
          value={customPresetDate}
          onChange={(value) => setCustomPresetDate(value)}
          presets={customPresets}
          helperText="Custom preset options for future date selection"
        />

        {customPresetDate && (
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium">Selected:</p>
            {customPresetDate instanceof Date ? (
              <p className="text-sm text-neutral-700">{customPresetDate.toLocaleDateString()}</p>
            ) : (
              <>
                <p className="text-sm text-neutral-700">
                  Start: {customPresetDate.start?.toLocaleDateString() || 'Not selected'}
                </p>
                <p className="text-sm text-neutral-700">
                  End: {customPresetDate.end?.toLocaleDateString() || 'Not selected'}
                </p>
              </>
            )}
          </div>
        )}
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Sizes</h3>
        
        <div className="space-y-4">
          <DatePicker
            label="Small Size"
            size="sm"
            placeholder="Small date picker"
            value={null}
            onChange={() => {}}
          />

          <DatePicker
            label="Medium Size (Default)"
            size="md"
            placeholder="Medium date picker"
            value={null}
            onChange={() => {}}
          />

          <DatePicker
            label="Large Size"
            size="lg"
            placeholder="Large date picker"
            value={null}
            onChange={() => {}}
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">States</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Required Field"
            placeholder="This field is required"
            required
            value={null}
            onChange={() => {}}
          />

          <DatePicker
            label="With Error"
            placeholder="Select a date"
            error="Please select a valid date"
            value={null}
            onChange={() => {}}
          />

          <DatePicker
            label="Disabled"
            placeholder="Cannot select"
            disabled
            value={null}
            onChange={() => {}}
          />

          <DatePicker
            label="Disabled with Value"
            disabled
            value={new Date()}
            onChange={() => {}}
          />
        </div>
      </section>

      {/* Form Integration Example */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Form Integration</h3>
        
        <form 
          className="space-y-4 p-6 border border-neutral-200 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Form submitted!')
          }}
        >
          <DatePicker
            label="Event Date"
            placeholder="Select event date"
            required
            value={null}
            onChange={() => {}}
            helperText="Choose the date for your event"
          />

          <DatePicker
            label="Registration Period"
            placeholder="Select registration period"
            mode="range"
            required
            value={null}
            onChange={() => {}}
            helperText="Select start and end dates for registration"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Submit
            </button>
            <button
              type="reset"
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default DatePickerExamples
