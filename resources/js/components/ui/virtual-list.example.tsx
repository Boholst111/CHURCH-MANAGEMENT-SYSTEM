import React, { useState } from 'react';
import VirtualList from './virtual-list';
import { Button } from './button';
import { Card } from './card';

/**
 * VirtualList Component Examples
 * 
 * Demonstrates various use cases for the VirtualList component
 * with large datasets for performance optimization.
 */

// Sample data generator
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'inactive',
  }));

export default function VirtualListExamples() {
  const [itemCount, setItemCount] = useState(200);
  const items = generateItems(itemCount);

  // Example 1: Simple list with basic styling
  const renderSimpleItem = (item: any, index: number, style: React.CSSProperties) => (
    <div
      style={style}
      className={`px-6 py-4 border-b border-gray-200 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      } hover:bg-primary-50 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'active'
              ? 'bg-green-100 text-green-800'
              : item.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {item.status}
        </span>
      </div>
    </div>
  );

  // Example 2: Card-based list
  const renderCardItem = (item: any, index: number, style: React.CSSProperties) => (
    <div style={style} className="px-4 py-2">
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-700 font-bold">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                View
              </Button>
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Example 3: Compact list
  const renderCompactItem = (item: any, index: number, style: React.CSSProperties) => (
    <div
      style={style}
      className="px-6 py-2 border-b border-gray-100 hover:bg-gray-50 flex items-center justify-between"
    >
      <span className="text-sm text-gray-700">{item.name}</span>
      <span className="text-xs text-gray-500">{item.status}</span>
    </div>
  );

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VirtualList Examples</h1>
        <p className="text-gray-600">
          Demonstrating virtual scrolling for large datasets with different layouts
        </p>
      </div>

      {/* Controls */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Item Count:</label>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemCount(100)}
              disabled={itemCount === 100}
            >
              100
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemCount(500)}
              disabled={itemCount === 500}
            >
              500
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemCount(1000)}
              disabled={itemCount === 1000}
            >
              1000
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemCount(5000)}
              disabled={itemCount === 5000}
            >
              5000
            </Button>
          </div>
          <span className="text-sm text-gray-600 ml-auto">
            Currently showing {itemCount} items
          </span>
        </div>
      </Card>

      {/* Example 1: Simple List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example 1: Simple List</h2>
        <Card className="overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Items List</h3>
          </div>
          <VirtualList
            items={items}
            itemHeight={80}
            height={400}
            renderItem={renderSimpleItem}
          />
        </Card>
      </div>

      {/* Example 2: Card-Based List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example 2: Card-Based List</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <VirtualList
            items={items}
            itemHeight={120}
            height={500}
            renderItem={renderCardItem}
          />
        </div>
      </div>

      {/* Example 3: Compact List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example 3: Compact List</h2>
        <Card className="overflow-hidden">
          <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 text-sm">Compact View</h3>
          </div>
          <VirtualList
            items={items}
            itemHeight={40}
            height={300}
            renderItem={renderCompactItem}
          />
        </Card>
      </div>

      {/* Performance Note */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Performance Note</h3>
        <p className="text-sm text-blue-800">
          Virtual scrolling renders only the visible items in the viewport, significantly
          improving performance for large datasets. Try switching between different item counts
          to see how smoothly it handles thousands of items.
        </p>
      </Card>
    </div>
  );
}
