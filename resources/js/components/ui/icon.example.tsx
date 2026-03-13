import React from 'react';
import { Icon } from './icon';
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react';

/**
 * Icon Component Examples
 * 
 * Demonstrates the Icon wrapper component with various sizes and colors
 */

export function IconExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Size Variants */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Size Variants</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Home} size="sm" label="Small home icon" />
            <span className="text-xs text-neutral-600">sm (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Home} size="md" label="Medium home icon" />
            <span className="text-xs text-neutral-600">md (20px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Home} size="lg" label="Large home icon" />
            <span className="text-xs text-neutral-600">lg (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Home} size="xl" label="Extra large home icon" />
            <span className="text-xs text-neutral-600">xl (32px)</span>
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Color Variants</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={User} color="primary" size="lg" label="Primary user icon" />
            <span className="text-xs text-neutral-600">primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={CheckCircle} color="success" size="lg" label="Success check icon" />
            <span className="text-xs text-neutral-600">success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={AlertTriangle} color="warning" size="lg" label="Warning alert icon" />
            <span className="text-xs text-neutral-600">warning</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={XCircle} color="error" size="lg" label="Error X icon" />
            <span className="text-xs text-neutral-600">error</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Info} color="info" size="lg" label="Info icon" />
            <span className="text-xs text-neutral-600">info</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Settings} color="secondary" size="lg" label="Secondary settings icon" />
            <span className="text-xs text-neutral-600">secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Mail} color="muted" size="lg" label="Muted mail icon" />
            <span className="text-xs text-neutral-600">muted</span>
          </div>
        </div>
      </section>

      {/* Practical Usage Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Practical Usage</h2>
        <div className="space-y-4">
          {/* With text */}
          <div className="flex items-center gap-2">
            <Icon icon={Mail} size="sm" color="primary" label="Email icon" />
            <span className="text-sm">contact@church.com</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon={Phone} size="sm" color="primary" label="Phone icon" />
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon={Calendar} size="sm" color="primary" label="Calendar icon" />
            <span className="text-sm">Sunday, December 15, 2024</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-2">
            <Icon icon={CheckCircle} size="md" color="success" label="Success status" />
            <span className="text-sm">Operation completed successfully</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon={AlertTriangle} size="md" color="warning" label="Warning status" />
            <span className="text-sm">Please review your settings</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon={XCircle} size="md" color="error" label="Error status" />
            <span className="text-sm">An error occurred</span>
          </div>
        </div>
      </section>

      {/* Inherit Color Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Inherit Color (from parent)</h2>
        <div className="space-y-2">
          <div className="text-primary-600 flex items-center gap-2">
            <Icon icon={Home} size="md" color="inherit" label="Home icon" />
            <span>Inherits primary color</span>
          </div>
          <div className="text-success-DEFAULT flex items-center gap-2">
            <Icon icon={CheckCircle} size="md" color="inherit" label="Check icon" />
            <span>Inherits success color</span>
          </div>
          <div className="text-error-DEFAULT flex items-center gap-2">
            <Icon icon={XCircle} size="md" color="inherit" label="X icon" />
            <span>Inherits error color</span>
          </div>
        </div>
      </section>

      {/* Custom className */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Styling</h2>
        <div className="flex items-center gap-4">
          <Icon 
            icon={Settings} 
            size="lg" 
            className="text-purple-600 hover:text-purple-800 transition-colors cursor-pointer" 
            label="Custom styled settings icon"
          />
          <Icon 
            icon={User} 
            size="lg" 
            className="text-orange-600 bg-orange-100 rounded-full p-2" 
            label="Custom styled user icon with background"
          />
        </div>
      </section>
    </div>
  );
}

export default IconExamples;
