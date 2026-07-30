import { Root } from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/shared/lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

interface LabelProps
  extends ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  ),
)
Label.displayName = 'Label'

export { Label }
