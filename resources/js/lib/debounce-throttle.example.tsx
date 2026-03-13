/**
 * Debounce and Throttle Examples
 * 
 * This file demonstrates how to use the debounce and throttle utilities
 * for optimizing performance in React applications.
 */

import React, { useState, useEffect } from 'react'
import { debounce, throttle } from './utils'
import { useDebounce, useDebouncedCallback } from '@/hooks/useDebounce'
import { useThrottle, useThrottledCallback } from '@/hooks/useThrottle'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

/**
 * Example 1: Debounced Search Input
 * 
 * Use case: Search input that triggers API calls
 * Benefit: Reduces API calls by waiting for user to stop typing
 */
export function DebouncedSearchExample() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (debouncedSearchQuery) {
      // This will only run 300ms after the user stops typing
      console.log('Searching for:', debouncedSearchQuery)
      // fetchSearchResults(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Debounced Search</h3>
      <Input
        type="text"
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p className="mt-2 text-sm text-neutral-600">
        Current query: {searchQuery}
      </p>
      <p className="text-sm text-neutral-600">
        Debounced query: {debouncedSearchQuery}
      </p>
    </Card>
  )
}

/**
 * Example 2: Debounced Callback
 * 
 * Use case: Form auto-save functionality
 * Benefit: Saves data only after user stops editing
 */
export function DebouncedAutoSaveExample() {
  const [formData, setFormData] = useState({ name: '', email: '' })

  const debouncedSave = useDebouncedCallback(
    (data: typeof formData) => {
      console.log('Auto-saving:', data)
      // saveFormData(data)
    },
    1000,
    []
  )

  const handleChange = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    debouncedSave(newData)
  }

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Auto-Save Form</h3>
      <div className="space-y-4">
        <Input
          type="text"
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <p className="mt-4 text-sm text-neutral-600">
        Form will auto-save 1 second after you stop typing
      </p>
    </Card>
  )
}

/**
 * Example 3: Throttled Scroll Handler
 * 
 * Use case: Scroll event listener for infinite scroll or scroll indicators
 * Benefit: Limits how often the handler runs during rapid scrolling
 */
export function ThrottledScrollExample() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const throttledScrollPosition = useThrottle(scrollPosition, 100)

  const handleScroll = useThrottledCallback(
    () => {
      setScrollPosition(window.scrollY)
    },
    100,
    { leading: true, trailing: true },
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
    }
  }, [handleScroll])

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Throttled Scroll Indicator</h3>
      <p className="text-sm text-neutral-600">
        Current scroll position: {scrollPosition}px
      </p>
      <p className="text-sm text-neutral-600">
        Throttled position: {throttledScrollPosition}px
      </p>
      <div className="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-200"
          style={{
            width: `${Math.min((throttledScrollPosition / 1000) * 100, 100)}%`,
          }}
        />
      </div>
    </Card>
  )
}

/**
 * Example 4: Throttled Resize Handler
 * 
 * Use case: Window resize event listener for responsive layouts
 * Benefit: Prevents excessive re-renders during window resizing
 */
export function ThrottledResizeExample() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const handleResize = useThrottledCallback(
    () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    },
    200,
    { leading: true, trailing: true },
    []
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      handleResize.cancel()
    }
  }, [handleResize])

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Throttled Resize Handler</h3>
      <p className="text-sm text-neutral-600">
        Window width: {windowSize.width}px
      </p>
      <p className="text-sm text-neutral-600">
        Window height: {windowSize.height}px
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        Try resizing your browser window
      </p>
    </Card>
  )
}

/**
 * Example 5: Using Raw Debounce Function
 * 
 * Use case: When you need more control or are not in a React component
 */
export function RawDebounceExample() {
  const [count, setCount] = useState(0)

  // Create debounced function
  const debouncedIncrement = React.useMemo(
    () =>
      debounce(() => {
        setCount((c) => c + 1)
      }, 500),
    []
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedIncrement.cancel()
    }
  }, [debouncedIncrement])

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Raw Debounce Function</h3>
      <p className="text-sm text-neutral-600 mb-4">Count: {count}</p>
      <button
        onClick={() => debouncedIncrement()}
        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
      >
        Click rapidly (debounced)
      </button>
      <p className="mt-4 text-xs text-neutral-500">
        Counter will only increment 500ms after you stop clicking
      </p>
    </Card>
  )
}

/**
 * Example 6: Using Raw Throttle Function
 * 
 * Use case: Rate-limiting button clicks or API calls
 */
export function RawThrottleExample() {
  const [clickCount, setClickCount] = useState(0)

  // Create throttled function
  const throttledClick = React.useMemo(
    () =>
      throttle(() => {
        setClickCount((c) => c + 1)
      }, 1000),
    []
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      throttledClick.cancel()
    }
  }, [throttledClick])

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Raw Throttle Function</h3>
      <p className="text-sm text-neutral-600 mb-4">Click count: {clickCount}</p>
      <button
        onClick={() => throttledClick()}
        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
      >
        Click rapidly (throttled)
      </button>
      <p className="mt-4 text-xs text-neutral-500">
        Counter will only increment once per second
      </p>
    </Card>
  )
}

/**
 * Complete Demo Component
 */
export function DebounceThrottleDemo() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Debounce & Throttle Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DebouncedSearchExample />
        <DebouncedAutoSaveExample />
        <ThrottledScrollExample />
        <ThrottledResizeExample />
        <RawDebounceExample />
        <RawThrottleExample />
      </div>

      <Card padding="lg" className="mt-8">
        <h2 className="text-xl font-semibold mb-4">When to Use What?</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-primary-600">Debounce</h3>
            <p className="text-sm text-neutral-600">
              Use when you want to wait for a pause in activity before executing.
              Perfect for search inputs, form auto-save, and validation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary-600">Throttle</h3>
            <p className="text-sm text-neutral-600">
              Use when you want to limit execution frequency during continuous activity.
              Perfect for scroll handlers, resize handlers, and rate-limiting API calls.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
