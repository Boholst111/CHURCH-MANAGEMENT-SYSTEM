import React from 'react'
import { DataTable, TableColumn } from './table'
import { Badge } from './badge'

// Example data types
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive'
  lastLogin: string
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  inStock: boolean
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'guest',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
]

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15, inStock: true },
  { id: 2, name: 'Mouse', category: 'Accessories', price: 29.99, stock: 50, inStock: true },
  { id: 3, name: 'Keyboard', category: 'Accessories', price: 79.99, stock: 0, inStock: false },
  { id: 4, name: 'Monitor', category: 'Electronics', price: 299.99, stock: 8, inStock: true },
]

/**
 * Example 1: Basic Table
 */
export function BasicTableExample() {
  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Table</h2>
      <DataTable columns={columns} data={sampleUsers} />
    </div>
  )
}

/**
 * Example 2: Table with Custom Render
 */
export function CustomRenderTableExample() {
  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name', width: '200px' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      align: 'center',
      render: (row) => (
        <Badge
          variant={
            row.role === 'admin' ? 'error' : row.role === 'user' ? 'primary' : 'neutral'
          }
        >
          {row.role}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'neutral'}>
          {row.status}
        </Badge>
      ),
    },
    { key: 'lastLogin', header: 'Last Login', align: 'right' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Table with Custom Render</h2>
      <DataTable columns={columns} data={sampleUsers} />
    </div>
  )
}

/**
 * Example 3: Striped Table
 */
export function StripedTableExample() {
  const columns: TableColumn<Product>[] = [
    { key: 'name', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (row) => `₱${row.price.toFixed(2)}`,
    },
    { key: 'stock', header: 'Stock', align: 'center' },
    {
      key: 'inStock',
      header: 'Availability',
      align: 'center',
      render: (row) => (
        <Badge variant={row.inStock ? 'success' : 'error'}>
          {row.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Striped Table</h2>
      <DataTable columns={columns} data={sampleProducts} striped />
    </div>
  )
}

/**
 * Example 4: Compact Table
 */
export function CompactTableExample() {
  const columns: TableColumn<Product>[] = [
    { key: 'name', header: 'Product' },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (row) => `₱${row.price.toFixed(2)}`,
    },
    { key: 'stock', header: 'Stock', align: 'center' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Compact Table</h2>
      <DataTable columns={columns} data={sampleProducts} compact striped />
    </div>
  )
}

/**
 * Example 5: Loading State
 */
export function LoadingTableExample() {
  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Loading State</h2>
      <DataTable columns={columns} data={[]} loading />
    </div>
  )
}

/**
 * Example 6: Empty State
 */
export function EmptyTableExample() {
  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Empty State</h2>
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No users found. Try adjusting your filters."
      />
    </div>
  )
}

/**
 * Example 7: Clickable Rows
 */
export function ClickableRowsTableExample() {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ]

  const handleRowClick = (user: User) => {
    setSelectedUser(user)
    alert(`Clicked on ${user.name}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Clickable Rows</h2>
      <DataTable
        columns={columns}
        data={sampleUsers}
        onRowClick={handleRowClick}
        hoverable
      />
      {selectedUser && (
        <div className="p-4 bg-primary-50 rounded-lg">
          <p className="font-medium">Selected: {selectedUser.name}</p>
        </div>
      )}
    </div>
  )
}

/**
 * Example 8: All Features Combined
 */
export function FullFeaturedTableExample() {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(sampleProducts)

  const columns: TableColumn<Product>[] = [
    { key: 'name', header: 'Product Name', width: '250px' },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (row) => (
        <span className="font-semibold">₱{row.price.toFixed(2)}</span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'center',
      render: (row) => (
        <span className={row.stock === 0 ? 'text-error-600' : 'text-neutral-900'}>
          {row.stock}
        </span>
      ),
    },
    {
      key: 'inStock',
      header: 'Status',
      align: 'center',
      render: (row) => (
        <Badge variant={row.inStock ? 'success' : 'error'} size="sm">
          {row.inStock ? 'Available' : 'Out of Stock'}
        </Badge>
      ),
    },
  ]

  const handleRowClick = (product: Product) => {
    console.log('Product clicked:', product)
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Full Featured Table</h2>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Refresh
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onRowClick={handleRowClick}
        striped
        hoverable
        emptyMessage="No products available"
      />
    </div>
  )
}

/**
 * All Examples Component
 */
export function TableExamples() {
  return (
    <div className="p-8 space-y-12 bg-neutral-50 min-h-screen">
      <h1 className="text-4xl font-bold text-neutral-900">Table Component Examples</h1>
      
      <BasicTableExample />
      <CustomRenderTableExample />
      <StripedTableExample />
      <CompactTableExample />
      <LoadingTableExample />
      <EmptyTableExample />
      <ClickableRowsTableExample />
      <FullFeaturedTableExample />
    </div>
  )
}

export default TableExamples
