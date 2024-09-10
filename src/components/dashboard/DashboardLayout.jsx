import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Bell,
    Home,
    LineChart,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
const DashbardLayout = () => {
    return(
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image
                        src="/logo/logo_black2.png"
                        width={150}
                        height={150}
                        className="w-24 object-contain"
                        alt="EduVr Logo"
                        />
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/Link"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Manage Links
                    </Link>
                    <Link
                        href="/dashboard/Passport"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        My Passport
                    </Link>
                    <Link
                        href="/dashboard/Coming-soon"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    >
                        <Package className="h-4 w-4" />
                        3D Model Library
                        <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-300">
                        Soon
                        </Badge>
                    </Link>
                    <Link
                        href="/dashboard/Coming-soon"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <LineChart className="h-4 w-4" />
                        Tracking & Analytics
                        <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                        Soon
                        </Badge>
                    </Link>
                    <Link
                        href="/dashboard/Coming-soon"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Users className="h-4 w-4" />
                        Lesson Plans
                        <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                        Soon
                        </Badge>
                    </Link>
                    <Link
                        href="/dashboard/Coming-soon"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <LineChart className="h-4 w-4" />
                        Assignments/Polls
                        <Badge className="ml-auto flex shrink-0 items-center justify-center rounded-full bg-blue-500">
                        Soon
                        </Badge>
                    </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                            Unlock all features and get unlimited access to our support
                            team.
                            </CardDescription>
                        </CardHeader>
                        <Link href="/dashboard/Coming-soon">
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                Coming soon
                                </Button>
                            </CardContent>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DashbardLayout;