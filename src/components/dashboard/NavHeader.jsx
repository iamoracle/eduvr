import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    ShoppingCart,
    Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu"

const NavHeader = () => {
    return(
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-sm font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                <Image
                    src="/logo/logo_black2.png"
                    width={150}
                    height={150}
                    className="w-24 object-contain"
                    alt="EduVr Logo"
                    />
                  <span className="sr-only">EduVR</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/Link"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Manage Links
                </Link>
                <Link
                  href="/dashboard/Passport"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  My Passport
                </Link>
                <Link
                  href="/dashboard/Coming-soon"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  3D Model Library
                  <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                      Soon
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/Coming-soon"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Tracking & Analytics
                  <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                      Soon
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/Coming-soon"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Lesson Plans
                  <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                      Soon
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/Coming-soon"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Assignments/Polls
                  <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                      Soon
                  </Badge>
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <Link href="/dashboard/Coming-soon">
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
    );
}

export default NavHeader;