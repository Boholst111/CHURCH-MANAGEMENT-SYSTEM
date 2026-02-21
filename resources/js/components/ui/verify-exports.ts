/**
 * Verification script to ensure all UI components are properly exported
 * This file is used for type checking and should not be imported in production code
 */

import type { ButtonProps } from './button'
import type { InputProps } from './input'
import type { ModalProps } from './modal'

import {
  Button,
  buttonVariants,
  Input,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Modal,
} from './index'

// Type assertions to verify exports
const _button: typeof Button = Button
const _buttonVariants: typeof buttonVariants = buttonVariants
const _input: typeof Input = Input
const _card: typeof Card = Card
const _cardHeader: typeof CardHeader = CardHeader
const _cardFooter: typeof CardFooter = CardFooter
const _cardTitle: typeof CardTitle = CardTitle
const _cardDescription: typeof CardDescription = CardDescription
const _cardContent: typeof CardContent = CardContent
const _table: typeof Table = Table
const _tableHeader: typeof TableHeader = TableHeader
const _tableBody: typeof TableBody = TableBody
const _tableFooter: typeof TableFooter = TableFooter
const _tableHead: typeof TableHead = TableHead
const _tableRow: typeof TableRow = TableRow
const _tableCell: typeof TableCell = TableCell
const _tableCaption: typeof TableCaption = TableCaption
const _dialog: typeof Dialog = Dialog
const _dialogPortal: typeof DialogPortal = DialogPortal
const _dialogOverlay: typeof DialogOverlay = DialogOverlay
const _dialogClose: typeof DialogClose = DialogClose
const _dialogTrigger: typeof DialogTrigger = DialogTrigger
const _dialogContent: typeof DialogContent = DialogContent
const _dialogHeader: typeof DialogHeader = DialogHeader
const _dialogFooter: typeof DialogFooter = DialogFooter
const _dialogTitle: typeof DialogTitle = DialogTitle
const _dialogDescription: typeof DialogDescription = DialogDescription
const _modal: typeof Modal = Modal

// Type interface verification
const _buttonProps: ButtonProps = {
  variant: 'default',
  size: 'default',
  children: 'Test',
}

const _inputProps: InputProps = {
  type: 'text',
  placeholder: 'Test',
}

const _modalProps: ModalProps = {
  open: true,
  onOpenChange: () => {},
  children: null,
}

console.log('All UI component exports verified successfully!')
console.log('Components:', {
  Button: !!_button,
  Input: !!_input,
  Card: !!_card,
  Table: !!_table,
  Modal: !!_modal,
  Dialog: !!_dialog,
})
console.log('TypeScript interfaces:', {
  ButtonProps: !!_buttonProps,
  InputProps: !!_inputProps,
  ModalProps: !!_modalProps,
})
