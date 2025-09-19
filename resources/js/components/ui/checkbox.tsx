import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onCheckedChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }