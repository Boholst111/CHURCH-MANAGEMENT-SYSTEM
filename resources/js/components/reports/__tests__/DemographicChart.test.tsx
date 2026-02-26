import React from 'react';
import { render, screen } from '@testing-library/react';
import { DemographicChart, DemographicData } from '../DemographicChart';

describe('DemographicChart', () => {
  const mockData: DemographicData = {
    by_age: {
      '0-17': 15,
      '18-35': 45,
      '36-55': 30,
      '56+': 20,
    },
    by_location: {
      'Manila': 50,
      'Quezon City': 30,
      'Davao': 20,
      'Cebu': 10,
    },
    by_gender: {
      'male': 55,
      'female': 50,
      'other': 5,
    },
    by_status: {
      'active': 90,
      'visitor': 20,
    },
    by_small_group: [
      { name: 'Youth Group', count: 25 },
      { name: 'Prayer Group', count: 30 },
      { name: 'Worship Team', count: 15 },
    ],
    total_members: 110,
  };

  it('renders loading state', () => {
    render(<DemographicChart data={null} loading={true} />);
    expect(screen.getByText('Loading demographic data...')).toBeInTheDocument();
  });

  it('renders no data state when data is null', () => {
    render(<DemographicChart data={null} loading={false} />);
    expect(screen.getByText('No demographic data available')).toBeInTheDocument();
  });

  it('renders age distribution chart with data', () => {
    render(<DemographicChart data={mockData} loading={false} />);
    expect(screen.getByText('Age Distribution')).toBeInTheDocument();
  });

  it('renders location distribution chart with data', () => {
    render(<DemographicChart data={mockData} loading={false} />);
    expect(screen.getByText('Location Distribution')).toBeInTheDocument();
  });

  it('renders both charts in a grid layout', () => {
    const { container } = render(<DemographicChart data={mockData} loading={false} />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <DemographicChart data={mockData} loading={false} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty age data gracefully', () => {
    const emptyAgeData: DemographicData = {
      ...mockData,
      by_age: {},
    };
    render(<DemographicChart data={emptyAgeData} loading={false} />);
    expect(screen.getByText('No age data available')).toBeInTheDocument();
  });

  it('handles empty location data gracefully', () => {
    const emptyLocationData: DemographicData = {
      ...mockData,
      by_location: {},
    };
    render(<DemographicChart data={emptyLocationData} loading={false} />);
    expect(screen.getByText('No location data available')).toBeInTheDocument();
  });

  it('renders with multiple age groups', () => {
    render(<DemographicChart data={mockData} loading={false} />);
    // Chart should render without errors
    expect(screen.getByText('Age Distribution')).toBeInTheDocument();
  });

  it('renders with multiple locations', () => {
    render(<DemographicChart data={mockData} loading={false} />);
    // Chart should render without errors
    expect(screen.getByText('Location Distribution')).toBeInTheDocument();
  });
});
