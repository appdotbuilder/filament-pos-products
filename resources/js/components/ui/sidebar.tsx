import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  open: boolean
  setOpen: (open: boolean) => void
  state: 'expanded' | 'collapsed'
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function SidebarProvider({ 
  children, 
  defaultOpen = false 
}: { 
  children: React.ReactNode
  defaultOpen?: boolean 
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  
  return (
    <SidebarContext.Provider value={{ 
      open, 
      setOpen, 
      state: open ? 'expanded' : 'collapsed' 
    }}>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsible?: string
    variant?: string
  }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-64 flex-col border-r bg-background",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-3 py-2 border-b", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto border-t px-3 py-2", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto", className)}
    {...props}
  />
))
SidebarInset.displayName = "SidebarInset"

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setOpen, open } = useSidebar()
  
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className="sr-only">Toggle Sidebar</span>
      ☰
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-3 py-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    isActive?: boolean
  }
>(({ className, asChild = false, isActive, ...props }, ref) => {
  if (asChild) {
    return React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as Record<string, unknown>
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          className: cn(
            "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground",
            className,
            childProps.className as string
          ),
          ref,
          ...props,
          children: childProps.children,
        })
      }
      return child
    })?.[0] || null
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"