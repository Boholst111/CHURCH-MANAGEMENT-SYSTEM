import React from 'react';
import { Badge } from './badge';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Badge Component Examples
 * 
 * This file demonstrates the various configurations and use cases
 * for the Badge component in the design system.
 */

export function BadgeExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Color Variants */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Color Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Shapes</h2>
        <div className="flex flex-wrap gap-3">
          <Badge shape="rounded" variant="primary">Rounded</Badge>
          <Badge shape="pill" variant="primary">Pill</Badge>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" icon={<CheckCircle className="w-3.5 h-3.5" />}>
            Approved
          </Badge>
          <Badge variant="warning" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
            Pending
          </Badge>
          <Badge variant="error" icon={<AlertCircle className="w-3.5 h-3.5" />}>
            Rejected
          </Badge>
          <Badge variant="primary" icon={<Info className="w-3.5 h-3.5" />}>
            Info
          </Badge>
        </div>
      </section>

      {/* Status Badges (Common Use Case) */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Status Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" shape="pill" icon={<CheckCircle className="w-3.5 h-3.5" />}>
            Active
          </Badge>
          <Badge variant="neutral" shape="pill">
            Inactive
          </Badge>
          <Badge variant="warning" shape="pill">
            Pending
          </Badge>
          <Badge variant="error" shape="pill" icon={<X className="w-3.5 h-3.5" />}>
            Cancelled
          </Badge>
        </div>
      </section>

      {/* Size + Icon Combinations */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Size + Icon Combinations</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm" variant="success" icon={<CheckCircle className="w-3 h-3" />}>
            Small with Icon
          </Badge>
          <Badge size="md" variant="success" icon={<CheckCircle className="w-3.5 h-3.5" />}>
            Medium with Icon
          </Badge>
          <Badge size="lg" variant="success" icon={<CheckCircle className="w-4 h-4" />}>
            Large with Icon
          </Badge>
        </div>
      </section>

      {/* Real-World Examples */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Real-World Examples</h2>
        <div className="space-y-4">
          {/* Member Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Member Status:</span>
            <Badge variant="success" shape="pill">Active</Badge>
          </div>

          {/* Event Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Event:</span>
            <Badge variant="primary" icon={<Info className="w-3.5 h-3.5" />}>
              Upcoming
            </Badge>
          </div>

          {/* Finance Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Expense:</span>
            <Badge variant="warning" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
              Pending Approval
            </Badge>
          </div>

          {/* Role Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Role:</span>
            <Badge variant="error" shape="pill">Admin</Badge>
          </div>
        </div>
      </section>

      {/* Multiple Badges */}
      <section>
        <h2 className="text-h3 font-semibold mb-4">Multiple Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" size="sm">React</Badge>
          <Badge variant="primary" size="sm">TypeScript</Badge>
          <Badge variant="primary" size="sm">Tailwind</Badge>
          <Badge variant="success" size="sm">Active</Badge>
          <Badge variant="warning" size="sm">Beta</Badge>
        </div>
      </section>
    </div>
  );
}

export default BadgeExamples;
