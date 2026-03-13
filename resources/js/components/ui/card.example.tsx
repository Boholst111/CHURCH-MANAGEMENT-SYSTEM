import React from 'react';
import { Card } from './card';
import { Button } from './button';
import { Icon } from './icon';
import { Users, Calendar, TrendingUp } from 'lucide-react';

/**
 * Card Component Examples
 * 
 * Demonstrates all variants, padding options, and features of the Card component.
 */

export const CardExamples = () => {
  return (
    <div className="space-y-8 p-8 bg-neutral-50">
      {/* Basic Card with Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" title="Default Card" description="Standard card with border and subtle shadow">
            <p className="text-neutral-700">This is the default card variant with a border and shadow-sm.</p>
          </Card>

          <Card variant="bordered" title="Bordered Card" description="Card with prominent border">
            <p className="text-neutral-700">This card has a thicker border and no shadow.</p>
          </Card>

          <Card variant="elevated" title="Elevated Card" description="Card with prominent shadow">
            <p className="text-neutral-700">This card has no border but a larger shadow for elevation.</p>
          </Card>
        </div>
      </section>

      {/* Padding Options */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Padding Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card padding="none" variant="bordered">
            <div className="p-2 bg-primary-50 text-center">
              <p className="text-sm font-medium">No Padding</p>
            </div>
          </Card>

          <Card padding="sm" variant="bordered">
            <p className="text-sm font-medium">Small Padding (p-4)</p>
          </Card>

          <Card padding="md" variant="bordered">
            <p className="text-sm font-medium">Medium Padding (p-6)</p>
          </Card>

          <Card padding="lg" variant="bordered">
            <p className="text-sm font-medium">Large Padding (p-8)</p>
          </Card>
        </div>
      </section>

      {/* Hoverable Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hoverable Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            variant="default" 
            hoverable 
            title="Interactive Card"
            description="Hover to see the effect"
            onClick={() => alert('Card clicked!')}
          >
            <p className="text-neutral-700">This card scales and increases shadow on hover.</p>
          </Card>

          <Card 
            variant="elevated" 
            hoverable
            title="Clickable Card"
            description="Try clicking me"
            onClick={() => alert('Another click!')}
          >
            <p className="text-neutral-700">Hoverable cards are great for navigation.</p>
          </Card>

          <Card 
            variant="bordered" 
            hoverable
            title="Action Card"
            description="Interactive element"
          >
            <p className="text-neutral-700">Use hoverable for cards that trigger actions.</p>
          </Card>
        </div>
      </section>

      {/* Cards with Footer */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Cards with Footer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            title="Event Registration"
            description="Sunday Service - December 15, 2024"
            footer={
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Register</Button>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            }
          >
            <p className="text-neutral-700">Join us for our weekly Sunday service. All are welcome!</p>
          </Card>

          <Card 
            variant="elevated"
            title="Member Profile"
            description="John Doe - Active Member"
            footer={
              <div className="flex justify-between w-full">
                <Button variant="ghost" size="sm">View Profile</Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            }
          >
            <div className="space-y-2">
              <p className="text-sm text-neutral-600">Email: john.doe@church.com</p>
              <p className="text-sm text-neutral-600">Phone: (555) 123-4567</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Stat Cards (Dashboard Style) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Members</p>
                <p className="text-3xl font-bold text-neutral-900">1,234</p>
                <p className="text-sm text-success-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% vs last month
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <Icon icon={Users} size="lg" className="text-primary-600" />
              </div>
            </div>
          </Card>

          <Card variant="default" padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-neutral-900">8</p>
                <p className="text-sm text-neutral-500 mt-1">This month</p>
              </div>
              <div className="p-3 bg-info-100 rounded-lg">
                <Icon icon={Calendar} size="lg" className="text-info-600" />
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="md" hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">New Visitors</p>
                <p className="text-3xl font-bold text-neutral-900">24</p>
                <p className="text-sm text-success-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8 this month
                </p>
              </div>
              <div className="p-3 bg-success-100 rounded-lg">
                <Icon icon={TrendingUp} size="lg" className="text-success-600" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Complex Card with Image */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Complex Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" padding="none" hoverable>
            <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Small Group Meeting</h3>
              <p className="text-neutral-600 mb-4">Join us for fellowship and Bible study every Wednesday evening.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Wednesdays, 7:00 PM</span>
                <Button variant="primary" size="sm">Join Group</Button>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="none">
            <div className="h-48 bg-gradient-to-br from-success-500 to-success-700 rounded-t-lg flex items-center justify-center">
              <Icon icon={Users} size="xl" className="text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
              <p className="text-neutral-600 mb-4">Meet our dedicated leadership team serving the church community.</p>
              <Button variant="outline" size="sm" fullWidth>View Team</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Manual Composition (without title/description props) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Manual Composition</h2>
        <Card variant="default" padding="none">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-xl font-semibold">Custom Header</h3>
            <p className="text-sm text-neutral-600">You can manually compose cards for full control</p>
          </div>
          <div className="p-6">
            <p className="text-neutral-700">This card is composed manually without using the title/description props.</p>
          </div>
          <div className="p-6 border-t border-neutral-200 bg-neutral-50">
            <Button variant="primary" size="sm">Custom Footer Action</Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default CardExamples;
