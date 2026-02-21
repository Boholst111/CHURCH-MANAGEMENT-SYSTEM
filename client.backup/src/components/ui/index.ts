/**
 * UI Components - Reusable components with consistent styling
 * 
 * All components follow the church management system design system:
 * - Soft blue and white color palette
 * - Rounded corners (md/lg)
 * - Consistent spacing
 * - Inter/Roboto typography
 * 
 * Requirements: 7.3, 7.4
 */

export { Button, buttonVariants, type ButtonProps } from "./button"
export { Input, type InputProps } from "./input"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card"
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"
export {
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
} from "./dialog"
export { Modal, type ModalProps } from "./modal"
export { Spinner, LoadingOverlay, InlineLoader, type SpinnerProps } from "./spinner"
