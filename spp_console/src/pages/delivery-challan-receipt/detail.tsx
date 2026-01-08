
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
        <div className="w-full space-y-8 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/delivery-challan-receipt")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Delivery Challan {data.id}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant={data.status === 'Submitted' ? 'default' : 'secondary'}>
                                {data.status}
                            </Badge>
                            <span>•</span>
                            <span>{data.mixing_date}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    {data.status === 'Submitted' && (
                        <>
                            <Button variant="destructive">
                                <Ban className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button onClick={() => navigate("/delivery-challan-receipt/new")}>
                                <FileEdit className="mr-2 h-4 w-4" /> Amend
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content - Items */}
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scanned Items</CardTitle>
                            <CardDescription>
                                Materials scanned during the mixing process (Total: {data.items.length})
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px] pl-4">No.</TableHead>
                                        <TableHead>Barcode</TableHead>
                                        <TableHead>Item Code</TableHead>
                                        <TableHead>Operation</TableHead>
                                        <TableHead className="text-right pr-4">Qty</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.items.map((item) => (
                                        <TableRow key={item.no}>
                                            <TableCell className="pl-4">{item.no}</TableCell>
                                            <TableCell className="font-medium">{item.barcode}</TableCell>
                                            <TableCell>{item.item_code}</TableCell>
                                            <TableCell>{item.operation}</TableCell>
                                            <TableCell className="text-right pr-4">{item.qty}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Details */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Mixing Date</span>
                                <span className="text-sm">{data.mixing_date}</span>
                            </div>
                            <Separator />
                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Mixing Time</span>
                                <span className="text-sm">{data.mixing_time}</span>
                            </div>
                            <Separator />
                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Compound</span>
                                <span className="text-sm font-medium">{data.compound}</span>
                            </div>
                            <Separator />
                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Warehouse</span>
                                <span className="text-sm">{data.source_warehouse}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
