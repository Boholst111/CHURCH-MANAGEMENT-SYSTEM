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
export { Input, inputVariants, type InputProps } from "./input"
export { Badge, badgeVariants, type BadgeProps } from "./badge"
export { Icon, iconVariants, type IconProps } from "./icon"
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
  DataTable,
  type TableColumn,
  type DataTableProps,
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
export { Select, selectTriggerVariants, type SelectProps, type SelectOption } from "./select"
export { DatePicker, datePickerTriggerVariants, type DatePickerProps, type DateRange, type DatePreset } from "./datepicker"
export { Pagination, paginationVariants, type PaginationProps } from "./pagination"
export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarNestedItem,
  SidebarToggle,
  useSidebar,
  type SidebarItemProps,
} from "./sidebar"
