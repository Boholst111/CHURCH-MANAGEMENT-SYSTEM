import React from 'react'
import { DataTable, TableColumn } from './table'
import { Badge } from './badge'
import { Button } from './button'
import { Edit, Trash2, Eye } from 'lucide-react'

/**
 * Example: Mobile-Optimized Table with Card View
 * 
 * This example demonstrates the mobile optimizations for the DataTable component:
 * 1. Horizontal scroll on mobile (default behavior)
 * 2. Card view alternative for better mobile UX
 * 3. Sticky column headers for long tables
 * 4. Accessible action buttons on mobile
 */

interface Member {
  id: number
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  membershipType: string
  smallGroup: string
}

const sampleMembers: Member[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+63 912 345 6789',
    status: 'active',
    membershipType: 'Regular',
    smallGroup: 'Youth Group',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+63 923 456 7890',
    status: 'active',
    membershipType: 'Associate',
    smallGroup: 'Women\'s Ministry',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+63 934 567 8901',
    status: 'inactive',
    membershipType: 'Visitor',
    smallGroup: 'None',
  },
]

export function MobileTableExample() {
  const columns: TableColumn<Member>[] = [
    {
      key: 'name',
      header: 'Name',
      width: '200px',
    },
    {
      key: 'email',
      header: 'Email',
      width: '250px',
    },
    {
      key: 'phone',
      header: 'Phone',
      width: '180px',
    },
    {
      key: 'membershipType',
      header: 'Type',
      width: '120px',
    },
    {
      key: 'smallGroup',
      header: 'Small Group',
      width: '180px',
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Eye className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation()
              console.log('View', row.id)
            }}
          >
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation()
              console.log('Edit', row.id)
            }}
          >
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation()
              console.log('Delete', row.id)
            }}
          >
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8 p-6">
      {/* Example 1: Default table with horizontal scroll on mobile */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Default Table (Horizontal Scroll)</h2>
        <p className="text-neutral-600 mb-4">
          On mobile devices, this table will scroll horizontally to show all columns.
          Action buttons remain accessible through scrolling.
        </p>
        <DataTable
          columns={columns}
          data={sampleMembers}
          hoverable
          striped
        />
      </div>

      {/* Example 2: Table with sticky headers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Table with Sticky Headers</h2>
        <p className="text-neutral-600 mb-4">
          Column headers remain visible when scrolling vertically through long tables.
        </p>
        <div className="max-h-96 overflow-y-auto">
          <DataTable
            columns={columns}
            data={[...sampleMembers, ...sampleMembers, ...sampleMembers]}
            hoverable
            stickyHeader
          />
        </div>
      </div>

      {/* Example 3: Mobile card view */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mobile Card View</h2>
        <p className="text-neutral-600 mb-4">
          On mobile devices (below 1024px), this table automatically switches to a card-based
          layout for better readability and touch interaction. Try resizing your browser window!
        </p>
        <DataTable
          columns={columns}
          data={sampleMembers}
          hoverable
          mobileCardView
        />
      </div>

      {/* Example 4: Compact table with sticky headers and card view */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Compact Table (All Features)</h2>
        <p className="text-neutral-600 mb-4">
          Combines compact mode, sticky headers, and mobile card view for the best mobile experience.
        </p>
        <div className="max-h-96 overflow-y-auto">
          <DataTable
            columns={columns}
            data={[...sampleMembers, ...sampleMembers]}
            hoverable
            compact
            stickyHeader
            mobileCardView
          />
        </div>
      </div>

      {/* Example 5: Loading state on mobile */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Loading State</h2>
        <p className="text-neutral-600 mb-4">
          Loading states adapt to the current view mode (table or card).
        </p>
        <DataTable
          columns={columns}
          data={[]}
          loading
          mobileCardView
        />
      </div>

      {/* Example 6: Empty state on mobile */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Empty State</h2>
        <p className="text-neutral-600 mb-4">
          Empty states also adapt to the current view mode.
        </p>
        <DataTable
          columns={columns}
          data={[]}
          emptyMessage="No members found. Add your first member to get started."
          mobileCardView
        />
      </div>
    </div>
  )
}

export default MobileTableExample
