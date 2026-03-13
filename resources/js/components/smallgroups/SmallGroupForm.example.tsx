import React, { useState } from 'react';
import SmallGroupForm, { SmallGroupFormData, SmallGroup } from './SmallGroupForm';
import { Button } from '../ui/button';

/**
 * Example usage of SmallGroupForm component
 * 
 * Demonstrates:
 * - Creating a new small group
 * - Editing an existing small group
 * - Leader selector with search
 * - Photo upload functionality
 * - Form validation
 */
const SmallGroupFormExample: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Example existing group for edit mode
  const existingGroup: SmallGroup = {
    id: 1,
    name: 'Young Adults Fellowship',
    description: 'A vibrant community for young adults to grow in faith together',
    leader_name: 'John Smith',
    leader_id: 1,
    meeting_day: 'Wednesday',
    meeting_time: '19:00',
    location: 'Church Fellowship Hall',
    photo: '/images/groups/young-adults.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    member_count: 15,
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (data: SmallGroupFormData) => {
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Small group saved successfully!');
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          SmallGroupForm Component Examples
        </h1>
        <p className="text-neutral-600">
          Interactive examples of the SmallGroupForm component with leader selector and photo upload.
        </p>
      </div>

      {/* Example 1: Create New Group */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Example 1: Create New Small Group
          </h2>
          <p className="text-neutral-600 mb-4">
            Opens a modal form to create a new small group with all fields empty.
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            Create New Group
          </Button>
        </div>

        <SmallGroupForm
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Example 2: Edit Existing Group */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Example 2: Edit Existing Small Group
          </h2>
          <p className="text-neutral-600 mb-4">
            Opens a modal form pre-populated with existing group data for editing.
          </p>
          <Button onClick={() => setIsEditOpen(true)} variant="secondary">
            Edit Existing Group
          </Button>
        </div>

        <SmallGroupForm
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleSubmit}
          smallGroup={existingGroup}
        />
      </div>

      {/* Features List */}
      <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
          Component Features
        </h3>
        <ul className="space-y-2 text-neutral-700">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Leader Selector with Search:</strong> Search and select a member as the group leader from a dropdown
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Photo Upload:</strong> Upload and preview group photos with validation (max 5MB, image formats only)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Schedule Picker:</strong> Select meeting day from dropdown and time using time input
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Form Validation:</strong> Client-side validation for all required fields with inline error messages
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Loading States:</strong> Disabled inputs and buttons during submission
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">✓</span>
            <span>
              <strong>Responsive Design:</strong> Works seamlessly on mobile, tablet, and desktop
            </span>
          </li>
        </ul>
      </div>

      {/* Usage Code Example */}
      <div className="mt-8 p-6 bg-neutral-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">
          Usage Example
        </h3>
        <pre className="text-sm text-neutral-300 overflow-x-auto">
          <code>{`import SmallGroupForm from './components/smallgroups/SmallGroupForm';

// Create new group
<SmallGroupForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleSubmit}
/>

// Edit existing group
<SmallGroupForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleSubmit}
  smallGroup={existingGroup}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};

export default SmallGroupFormExample;
