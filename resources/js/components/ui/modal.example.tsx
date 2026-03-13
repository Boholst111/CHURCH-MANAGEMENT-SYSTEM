import * as React from "react"
import { Modal } from "./modal"
import { Button } from "./button"

/**
 * Modal Component Examples
 * 
 * Demonstrates various Modal configurations and use cases
 */

export function ModalExamples() {
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [smallOpen, setSmallOpen] = React.useState(false)
  const [largeOpen, setLargeOpen] = React.useState(false)
  const [fullOpen, setFullOpen] = React.useState(false)
  const [noCloseOpen, setNoCloseOpen] = React.useState(false)
  const [withFooterOpen, setWithFooterOpen] = React.useState(false)

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold mb-6">Modal Component Examples</h1>

      {/* Basic Modal */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Basic Modal (Medium Size)</h2>
        <Button onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
        <Modal
          isOpen={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Basic Modal"
          description="This is a basic modal with default settings"
        >
          <p>This is the modal content. It can contain any React components.</p>
        </Modal>
      </div>

      {/* Small Modal */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Small Modal</h2>
        <Button onClick={() => setSmallOpen(true)}>Open Small Modal</Button>
        <Modal
          isOpen={smallOpen}
          onClose={() => setSmallOpen(false)}
          title="Small Modal"
          description="This modal uses the 'sm' size"
          size="sm"
        >
          <p>Compact content for quick actions or confirmations.</p>
        </Modal>
      </div>

      {/* Large Modal */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Large Modal</h2>
        <Button onClick={() => setLargeOpen(true)}>Open Large Modal</Button>
        <Modal
          isOpen={largeOpen}
          onClose={() => setLargeOpen(false)}
          title="Large Modal"
          description="This modal uses the 'lg' size"
          size="lg"
        >
          <div className="space-y-4">
            <p>This modal has more space for complex content.</p>
            <p>You can include forms, tables, or other detailed information.</p>
            <div className="bg-neutral-100 p-4 rounded">
              <p className="text-sm">Example content area</p>
            </div>
          </div>
        </Modal>
      </div>

      {/* Full Width Modal */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Full Width Modal</h2>
        <Button onClick={() => setFullOpen(true)}>Open Full Width Modal</Button>
        <Modal
          isOpen={fullOpen}
          onClose={() => setFullOpen(false)}
          title="Full Width Modal"
          description="This modal uses the 'full' size for maximum space"
          size="full"
        >
          <div className="space-y-4">
            <p>This modal takes up most of the screen width.</p>
            <p>Perfect for complex forms, data tables, or detailed views.</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-neutral-100 p-4 rounded">Column 1</div>
              <div className="bg-neutral-100 p-4 rounded">Column 2</div>
              <div className="bg-neutral-100 p-4 rounded">Column 3</div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Modal with Footer */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Modal with Footer</h2>
        <Button onClick={() => setWithFooterOpen(true)}>Open Modal with Footer</Button>
        <Modal
          isOpen={withFooterOpen}
          onClose={() => setWithFooterOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          footer={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setWithFooterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                alert('Action confirmed!')
                setWithFooterOpen(false)
              }}>
                Confirm
              </Button>
            </div>
          }
        >
          <p>This action cannot be undone. Please confirm to continue.</p>
        </Modal>
      </div>

      {/* Modal without Close Button and Overlay Click */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Modal with Restricted Closing</h2>
        <Button onClick={() => setNoCloseOpen(true)}>Open Restricted Modal</Button>
        <Modal
          isOpen={noCloseOpen}
          onClose={() => setNoCloseOpen(false)}
          title="Important Notice"
          description="You must explicitly confirm or cancel"
          closeOnOverlayClick={false}
          showCloseButton={false}
          footer={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setNoCloseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNoCloseOpen(false)}>
                I Understand
              </Button>
            </div>
          }
        >
          <p>This modal cannot be closed by clicking outside or using the X button.</p>
          <p>You must use one of the buttons below.</p>
        </Modal>
      </div>

      {/* Form Example */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Modal with Form</h2>
        <FormModalExample />
      </div>
    </div>
  )
}

function FormModalExample() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({ name: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Submitted: ${formData.name} - ${formData.email}`)
    setIsOpen(false)
    setFormData({ name: '', email: '' })
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Member"
        description="Enter the member's information below"
        size="lg"
        footer={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsOpen(false)
                setFormData({ name: '', email: '' })
              }}
            >
              Cancel
            </Button>
            <Button type="submit" form="member-form">
              Save Member
            </Button>
          </div>
        }
      >
        <form id="member-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ModalExamples
