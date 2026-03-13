import * as React from "react"
import { Command, X } from "lucide-react"
import { Modal } from "./modal"
import { Button } from "./button"
import { useKeyboardShortcuts } from "../../hooks/useKeyboardNavigation"

/**
 * Keyboard Shortcuts Dialog
 * 
 * Displays available keyboard shortcuts to users.
 * Can be opened with Ctrl+/ or Cmd+/ (or ? key).
 */

interface KeyboardShortcut {
  category: string
  shortcuts: {
    keys: string[]
    description: string
  }[]
}

const shortcuts: KeyboardShortcut[] = [
  {
    category: "Navigation",
    shortcuts: [
      { keys: ["Tab"], description: "Move to next interactive element" },
      { keys: ["Shift", "Tab"], description: "Move to previous interactive element" },
      { keys: ["Enter"], description: "Activate focused element" },
      { keys: ["Space"], description: "Activate buttons and checkboxes" },
      { keys: ["Escape"], description: "Close modals and dropdowns" },
      { keys: ["↑", "↓"], description: "Navigate lists and menus" },
      { keys: ["Home"], description: "Jump to first item" },
      { keys: ["End"], description: "Jump to last item" },
    ],
  },
  {
    category: "Global Shortcuts",
    shortcuts: [
      { keys: ["Ctrl", "/"], description: "Show keyboard shortcuts" },
      { keys: ["Ctrl", "K"], description: "Open search (if available)" },
      { keys: ["Ctrl", "S"], description: "Save current form" },
    ],
  },
  {
    category: "Tables",
    shortcuts: [
      { keys: ["↑", "↓"], description: "Navigate table rows" },
      { keys: ["Enter"], description: "Open selected row" },
      { keys: ["Space"], description: "Select/deselect row" },
    ],
  },
  {
    category: "Forms",
    shortcuts: [
      { keys: ["Tab"], description: "Move to next field" },
      { keys: ["Shift", "Tab"], description: "Move to previous field" },
      { keys: ["Enter"], description: "Submit form" },
      { keys: ["Escape"], description: "Cancel and close" },
    ],
  },
]

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Register global shortcut to open dialog
  useKeyboardShortcuts([
    {
      key: "/",
      ctrl: true,
      callback: () => setIsOpen(true),
      description: "Show keyboard shortcuts",
    },
    {
      key: "?",
      callback: () => setIsOpen(true),
      description: "Show keyboard shortcuts",
    },
  ])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Keyboard Shortcuts"
      description="Use these keyboard shortcuts to navigate the application more efficiently"
      size="lg"
    >
      <div className="space-y-6">
        {shortcuts.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-neutral-50"
                >
                  <span className="text-sm text-neutral-700">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <kbd className="keyboard-shortcut">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-neutral-400 text-xs">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-start gap-3">
          <Command className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary-900">
              Accessibility Tip
            </p>
            <p className="text-sm text-primary-700 mt-1">
              All interactive elements in this application are fully keyboard accessible.
              Use Tab to navigate, Enter or Space to activate, and Escape to close dialogs.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => setIsOpen(false)} variant="primary">
          Got it
        </Button>
      </div>
    </Modal>
  )
}

/**
 * Keyboard Shortcut Hint Component
 * 
 * Displays a keyboard shortcut hint next to UI elements.
 */
interface KeyboardShortcutHintProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcutHint({ keys, className }: KeyboardShortcutHintProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="keyboard-shortcut">{key}</kbd>
          {index < keys.length - 1 && (
            <span className="text-neutral-400 text-xs">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
