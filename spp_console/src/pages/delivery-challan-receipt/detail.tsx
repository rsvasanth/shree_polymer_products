
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Printer, Ban, FileEdit } from "lucide-react"
import { usePageHeader } from '@/components/page-header-context'

// Mock Data Wrapper
const getMockData = (id: string) => ({
    id: id,
    status: "Submitted",
    mixing_date: "2025-12-30",
    mixing_time: "16:00:42",
    compound: "MB_EH0039",
    source_warehouse: "U3-Store - SPP INDIA",
    items: [
        { no: 1, barcode: "25L30X873", item_code: "MB_EH0039", operation: "Mixing", qty: 18.003 },
        { no: 2, barcode: "25L30X868", item_code: "FB_EH0039", operation: "Mixing", qty: 0.251 },
    ]
})

export default function DeliveryChallanReceiptDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setTitle } = usePageHeader()
    const data = getMockData(id || "")

    useEffect(() => {
        setTitle(`Delivery Challan ${data.id}`)
    }, [setTitle, data.id])

    return (
        <div className="space-y-6 p-8 w-full">
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => navigate("/delivery-challan-receipt")} className="-ml-3 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant={data.status === 'Submitted' ? 'default' : 'secondary'}>{data.status}</Badge>
                    <Separator orientation="vertical" className="h-4" />
                    <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    {data.status === 'Submitted' && (
                        <>
                            <Button variant="destructive" size="sm">
                                <Ban className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => navigate("/delivery-challan-receipt/new")}>
                                <FileEdit className="mr-2 h-4 w-4" /> Amend
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pl-4">
                        <h3 className="font-semibold text-sm mb-2">Details</h3>
                        <div className="text-sm text-muted-foreground grid gap-4">
                            <div>
                                <span className="block text-xs font-medium text-foreground">Mixing Date</span>
                                {data.mixing_date}
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-foreground">Mixing Time</span>
                                {data.mixing_time}
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-foreground">Compound</span>
                                {data.compound}
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-foreground">Warehouse</span>
                                {data.source_warehouse}
                            </div>
                        </div>
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Items</CardTitle>
                            <CardDescription>
                                Scanned materials (Total Items: {data.items.length})
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">No.</TableHead>
                                        <TableHead>Scanned Barcode</TableHead>
                                        <TableHead>Item Code</TableHead>
                                        <TableHead>Operation</TableHead>
                                        <TableHead className="text-right">Qty</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.items.map((item) => (
                                        <TableRow key={item.no}>
                                            <TableCell>{item.no}</TableCell>
                                            <TableCell className="font-medium">{item.barcode}</TableCell>
                                            <TableCell>{item.item_code}</TableCell>
                                            <TableCell>{item.operation}</TableCell>
                                            <TableCell className="text-right">{item.qty}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
