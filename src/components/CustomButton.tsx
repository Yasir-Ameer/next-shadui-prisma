import { Mail, ShoppingCart } from "lucide-react"
import { Button } from "@/../components/ui/button"

export function CustomButton() {
  return (
    <Button>
      <ShoppingCart className="mr-1 h-4 w-4"/> Go Shopping
    </Button>
  )
}
