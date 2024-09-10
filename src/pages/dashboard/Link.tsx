import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NavHeader from "../../components/dashboard/NavHeader";
import LinkTable from "../../components/dashboard/LinkTable";

const Link = () => {
    return(
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <DashboardLayout />
            <div className="flex flex-col">
                <NavHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                       <LinkTable /> 
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Link;