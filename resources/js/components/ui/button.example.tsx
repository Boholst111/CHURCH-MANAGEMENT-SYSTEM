/**
 * Button Component Usage Examples
 * Demonstrates all variants, sizes, and features of the Button component
 */

import React from 'react'
import { Button } from './button'
import { Plus, Download, Trash2, Save } from 'lucide-react'

export const ButtonExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button icon={<Plus className="h-4 w-4" />} iconPosition="left">
            Add Item
          </Button>
          <Button 
            variant="secondary" 
            icon={<Download className="h-4 w-4" />} 
            iconPosition="right"
          >
            Download
          </Button>
          <Button 
            variant="danger" 
            icon={<Trash2 className="h-4 w-4" />}
          >
            Delete
          </Button>
        </div>
      </section>

      {/* Loading State */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Loading State</h2>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading...</Button>
          <Button variant="secondary" loading>
            Processing
          </Button>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="danger" disabled>
            Disabled Danger
          </Button>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Full Width Button</h2>
        <Button fullWidth icon={<Save className="h-4 w-4" />}>
          Save Changes
        </Button>
      </section>

      {/* Combined Features */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Combined Features</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            icon={<Plus className="h-5 w-5" />}
          >
            Create New
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Download className="h-3 w-3" />}
            iconPosition="right"
          >
            Export
          </Button>
        </div>
      </section>
    </div>
  )
}
