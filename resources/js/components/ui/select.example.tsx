import React from 'react';
import { Select, SelectOption } from './select';

/**
 * Select Component Examples
 * 
 * This file demonstrates various use cases of the Select component.
 */

// Sample data
const membershipTypes: SelectOption[] = [
  { value: 'regular', label: 'Regular Member' },
  { value: 'associate', label: 'Associate Member' },
  { value: 'visitor', label: 'Visitor' },
  { value: 'inactive', label: 'Inactive', disabled: true },
];

const countries: SelectOption[] = [
  { value: 'ph', label: 'Philippines' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'sg', label: 'Singapore' },
  { value: 'my', label: 'Malaysia' },
  { value: 'th', label: 'Thailand' },
];

const ministries: SelectOption[] = [
  { value: 'worship', label: 'Worship Team' },
  { value: 'youth', label: 'Youth Ministry' },
  { value: 'children', label: "Children's Ministry" },
  { value: 'outreach', label: 'Outreach Ministry' },
  { value: 'prayer', label: 'Prayer Ministry' },
  { value: 'media', label: 'Media Team' },
  { value: 'hospitality', label: 'Hospitality Team' },
  { value: 'ushers', label: 'Ushers' },
];

export function SelectExamples() {
  const [membershipType, setMembershipType] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('ph');
  const [selectedMinistries, setSelectedMinistries] = React.useState<string[]>([]);
  const [errorSelect, setErrorSelect] = React.useState<string>('');

  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Select Component</h1>
        <p className="text-neutral-600">
          A flexible select component with single/multi-select, search, and keyboard navigation.
        </p>
      </div>

      {/* Basic Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Basic Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Membership Type"
            options={membershipTypes}
            value={membershipType}
            onChange={(value) => setMembershipType(value as string)}
            placeholder="Select membership type"
          />
          
          <Select
            label="Country"
            options={countries}
            value={country}
            onChange={(value) => setCountry(value as string)}
            helperText="Select your country of residence"
          />
        </div>
      </section>

      {/* Multi-Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Multi-Select</h2>
        <Select
          label="Ministry Teams"
          options={ministries}
          value={selectedMinistries}
          onChange={(value) => setSelectedMinistries(value as string[])}
          placeholder="Select ministry teams"
          multiple
          helperText="You can select multiple ministry teams"
        />
      </section>

      {/* Searchable Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Searchable Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Country (Searchable)"
            options={countries}
            value={country}
            onChange={(value) => setCountry(value as string)}
            searchable
            helperText="Type to search countries"
          />
          
          <Select
            label="Ministry Teams (Searchable Multi-Select)"
            options={ministries}
            value={selectedMinistries}
            onChange={(value) => setSelectedMinistries(value as string[])}
            multiple
            searchable
            helperText="Search and select multiple teams"
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Sizes</h2>
        <div className="space-y-4">
          <Select
            label="Small Select"
            options={membershipTypes}
            size="sm"
            placeholder="Small size"
          />
          
          <Select
            label="Medium Select (Default)"
            options={membershipTypes}
            size="md"
            placeholder="Medium size"
          />
          
          <Select
            label="Large Select"
            options={membershipTypes}
            size="lg"
            placeholder="Large size"
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">States</h2>
        <div className="space-y-4">
          <Select
            label="Required Select"
            options={membershipTypes}
            value={errorSelect}
            onChange={(value) => setErrorSelect(value as string)}
            required
            error={!errorSelect ? "This field is required" : undefined}
          />
          
          <Select
            label="Disabled Select"
            options={membershipTypes}
            value="regular"
            disabled
          />
          
          <Select
            label="Select with Error"
            options={membershipTypes}
            error="Please select a valid option"
          />
        </div>
      </section>

      {/* With Disabled Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Disabled Options</h2>
        <Select
          label="Membership Type"
          options={membershipTypes}
          placeholder="Some options are disabled"
          helperText="The 'Inactive' option is disabled"
        />
      </section>

      {/* Full Width Control */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Width Control</h2>
        <div className="space-y-4">
          <Select
            label="Full Width (Default)"
            options={membershipTypes}
            fullWidth
          />
          
          <Select
            label="Auto Width"
            options={membershipTypes}
            fullWidth={false}
          />
        </div>
      </section>

      {/* Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Form Example</h2>
        <form 
          className="space-y-4 p-6 bg-neutral-50 rounded-lg border border-neutral-200"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted!');
          }}
        >
          <Select
            label="Membership Type"
            options={membershipTypes}
            value={membershipType}
            onChange={(value) => setMembershipType(value as string)}
            required
            helperText="Select your membership type"
          />
          
          <Select
            label="Country"
            options={countries}
            value={country}
            onChange={(value) => setCountry(value as string)}
            searchable
            required
          />
          
          <Select
            label="Ministry Teams"
            options={ministries}
            value={selectedMinistries}
            onChange={(value) => setSelectedMinistries(value as string[])}
            multiple
            searchable
            helperText="Optional: Select ministry teams you're interested in"
          />
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Current Values Display */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Current Values</h2>
        <div className="p-4 bg-neutral-100 rounded-lg">
          <pre className="text-sm">
            {JSON.stringify(
              {
                membershipType,
                country,
                selectedMinistries,
              },
              null,
              2
            )}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default SelectExamples;
