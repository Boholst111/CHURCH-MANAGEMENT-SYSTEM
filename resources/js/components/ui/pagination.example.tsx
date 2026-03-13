import * as React from "react"
import { Pagination } from "./pagination"

/**
 * Example usage of the Pagination component
 */
export function PaginationExample() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(25)
  
  const totalItems = 250
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pagination Component Examples</h2>
        <p className="text-neutral-600 mb-6">
          A comprehensive pagination component with page numbers, navigation buttons, and items per page selector.
        </p>
      </div>

      {/* Example 1: Full pagination with all features */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Full Pagination</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Complete pagination with items per page selector, total items display, and page navigation.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage)
              setCurrentPage(1) // Reset to first page when changing items per page
            }}
            itemsPerPageOptions={[10, 25, 50, 100]}
            showItemsPerPage={true}
            showTotalItems={true}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Example 2: Simple pagination without items per page selector */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Simple Pagination</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Pagination without items per page selector.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={5}
            totalPages={20}
            totalItems={200}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={true}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Example 3: Pagination with many pages (ellipsis) */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Pagination with Ellipsis</h3>
        <p className="text-sm text-neutral-600 mb-4">
          When there are many pages, ellipsis (...) are shown to condense the page numbers.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={15}
            totalPages={50}
            totalItems={500}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={true}
            showPageNumbers={true}
            maxPageButtons={7}
          />
        </div>
      </div>

      {/* Example 4: Pagination at first page */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">First Page</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Previous and first page buttons are disabled when on the first page.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={1}
            totalPages={10}
            totalItems={100}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={true}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Example 5: Pagination at last page */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Last Page</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Next and last page buttons are disabled when on the last page.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={10}
            totalPages={10}
            totalItems={100}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={true}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Example 6: Disabled pagination */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled State</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Pagination can be disabled during loading or other operations.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={5}
            totalPages={10}
            totalItems={100}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={true}
            showTotalItems={true}
            showPageNumbers={true}
            disabled={true}
          />
        </div>
      </div>

      {/* Example 7: Pagination with few pages */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Few Pages (No Ellipsis)</h3>
        <p className="text-sm text-neutral-600 mb-4">
          When there are few pages, all page numbers are shown without ellipsis.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={2}
            totalPages={5}
            totalItems={50}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={true}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Example 8: Minimal pagination (only navigation) */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Minimal Pagination</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Pagination with only navigation buttons, no page numbers or items info.
        </p>
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <Pagination
            currentPage={3}
            totalPages={10}
            totalItems={100}
            itemsPerPage={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
            showItemsPerPage={false}
            showTotalItems={false}
            showPageNumbers={true}
          />
        </div>
      </div>

      {/* Keyboard Navigation Info */}
      <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Keyboard Navigation</h3>
        <ul className="text-sm text-neutral-700 space-y-1">
          <li><kbd className="px-2 py-1 bg-white border border-neutral-300 rounded">←</kbd> Previous page</li>
          <li><kbd className="px-2 py-1 bg-white border border-neutral-300 rounded">→</kbd> Next page</li>
          <li><kbd className="px-2 py-1 bg-white border border-neutral-300 rounded">Home</kbd> First page</li>
          <li><kbd className="px-2 py-1 bg-white border border-neutral-300 rounded">End</kbd> Last page</li>
        </ul>
      </div>
    </div>
  )
}

export default PaginationExample
