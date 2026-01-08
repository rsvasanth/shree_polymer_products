import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import data from "../dashboard-data.json"

export default function DashboardPage() {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">
            <div className="flex flex-col gap-4 md:gap-6">
                <SectionCards />
                <div className="w-full">
                    <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
            </div>
        </div>
    )
}
