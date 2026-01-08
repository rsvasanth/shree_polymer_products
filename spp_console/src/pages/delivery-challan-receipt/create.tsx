

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, Check, ChevronsUpDown, Loader2, Plus, ScanBarcode, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
// import { toast } from "sonner" // Assuming sonner is installed
import { usePageHeader } from '@/components/page-header-context'

// --- Mock Data & Types ---

const mockCompounds = [
    { value: "C_101", label: "C_101 - Standard Rubber Loop" },
    { value: "C_102", label: "C_102 - High Temp Compound" },
    { value: "C_103", label: "C_103 - Oil Resistant Mix" },
]

const mockBOMItems = {
    "C_101": [
        { item_code: "RM_001", item_name: "Rubber Base", qty: 50 },
        { item_code: "RM_002", item_name: "Carbon Black", qty: 20 },
        { item_code: "RM_003", item_name: "Sulphur", qty: 2 },
    ],
    "C_102": [
        { item_code: "RM_001", item_name: "Rubber Base", qty: 60 },
        { item_code: "RM_004", item_name: "Silica", qty: 25 },
        { item_code: "RM_003", item_name: "Sulphur", qty: 3 },
    ]
}

const formSchema = z.object({
    compound: z.string().min(1, "Please select a compound."),
    scan_barcode: z.string().optional(),
    mixing_date: z.date().optional(), // Defaults to now
    operator: z.string().min(1, "Operator is required"),
    produced_weight: z.coerce.number().min(0.01, "Process output cannot be zero"),
})

type ScannedItem = {
    id: string
    item_code: string
    // item_name: string
    batch_no: string
    weight: number
}

export default function DeliveryChallanReceiptCreate() {
    const { setTitle } = usePageHeader()
    const [bomItems, setBomItems] = useState<any[]>([])
    const [scannedItems, setScannedItems] = useState<ScannedItem[]>([])
    const [isScanning, setIsScanning] = useState(false)
    const [openCompound, setOpenCompound] = useState(false)

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            scan_barcode: "",
            operator: "",
            produced_weight: 0,
            mixing_date: new Date(),
        },
    })

    useEffect(() => {
        setTitle("Create Delivery Challan Receipt")
    }, [setTitle])

    function onSelectCompound(value: string) {
        form.setValue("compound", value)
        // Simulate fetch
        const items = mockBOMItems[value as keyof typeof mockBOMItems] || []
        setBomItems(items)
        // Reset scanned items when compound changes
        setScannedItems([])
    }

    function handleBarcodeScan(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault()
            const barcode = form.getValues("scan_barcode")
            if (!barcode) return

            setIsScanning(true)

            // SIMULATE API CALL
            setTimeout(() => {
                // Mock validation logic
                // In real app: validate_barcode(barcode, compound)

                const newItem: ScannedItem = {
                    id: Math.random().toString(36).substring(7),
                    item_code: "RM_" + Math.floor(Math.random() * 100),
                    batch_no: barcode,
                    weight: parseFloat((Math.random() * 25).toFixed(2))
                }

                setScannedItems(prev => [newItem, ...prev])
                // toast.success(`Batch ${barcode} added`)
                form.setValue("scan_barcode", "") // Clear input
                setIsScanning(false)

                // Auto calculation for produced weight (simple sum logic for now)
                const currentWeight = form.getValues("produced_weight") || 0
                form.setValue("produced_weight", parseFloat((currentWeight + newItem.weight).toFixed(2)))

            }, 600)
        }
    }

    function removeScannedItem(id: string) {
        const item = scannedItems.find(i => i.id === id)
        if (item) {
            const currentWeight = form.getValues("produced_weight") || 0
            form.setValue("produced_weight", parseFloat((currentWeight - item.weight).toFixed(2)))
        }
        setScannedItems(items => items.filter(i => i.id !== id))
    }

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submitting:", { ...data, scannedItems })
        // toast.success("Delivery Challan Receipt Created")
    }

    // Calculate progress
    const totalRequired = bomItems.reduce((acc, curr) => acc + curr.qty, 0)
    const totalScanned = scannedItems.reduce((acc, curr) => acc + curr.weight, 0)
    const progress = totalRequired > 0 ? (totalScanned / totalRequired) * 100 : 0


    return (
        <div className="w-full h-[calc(100vh-3rem)] p-4 flex flex-col gap-4 overflow-hidden">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 min-h-0">
                        {/* LEFT COLUMN: Configuration & Scanning - Scrollable if needed */}
                        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
                            {/* 1. Item Selection */}
                            <Card className="shrink-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>1. Production Setup</CardTitle>
                                    <CardDescription>Select compound to produce</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="compound"
                                        render={({ field }: { field: any }) => (
                                            <FormItem className="flex flex-col">
                                                <Popover open={openCompound} onOpenChange={setOpenCompound}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-full justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? mockCompounds.find(
                                                                        (c) => c.value === field.value
                                                                    )?.label
                                                                    : "Select compound..."}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search compound..." />
                                                            <CommandList>
                                                                <CommandEmpty>No compound found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {mockCompounds.map((c) => (
                                                                        <CommandItem
                                                                            value={c.label}
                                                                            key={c.value}
                                                                            onSelect={() => {
                                                                                onSelectCompound(c.value)
                                                                                setOpenCompound(false)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    c.value === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {c.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* 2. Scanning Interface */}
                            <Card className="flex-1 flex flex-col shrink-0 min-h-[300px]">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <ScanBarcode className="h-5 w-5" />
                                        2. Material Scanning
                                    </CardTitle>
                                    <CardDescription>Scan Raw Material (RM) Mixbarcodes</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-1 flex flex-col">
                                    <FormField
                                        control={form.control}
                                        name="scan_barcode"
                                        render={({ field }: { field: any }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Scan barcode here..."
                                                            className="h-12 text-lg pl-10"
                                                            autoFocus
                                                            {...field}
                                                            onKeyDown={handleBarcodeScan}
                                                            disabled={!form.getValues("compound") || isScanning}
                                                        />
                                                        <div className="absolute left-3 top-3.5 text-muted-foreground">
                                                            {isScanning ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* BOM / Requirement Status */}
                                    {bomItems.length > 0 && (
                                        <div className="rounded-lg border bg-muted/20 p-4 flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-sm">Required Ingredients</span>
                                                <span className="text-xs text-muted-foreground">Target: {totalRequired}kg</span>
                                            </div>
                                            <ScrollArea className="h-[120px]">
                                                <div className="space-y-2">
                                                    {bomItems.map(item => (
                                                        <div key={item.item_code} className="flex justify-between text-sm py-1 border-b border-muted last:border-0">
                                                            <span>{item.item_name}</span>
                                                            <span className="font-mono text-muted-foreground">{item.qty}kg</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                            <Separator className="my-3" />
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span>Scanned Total</span>
                                                    <span>{totalScanned.toFixed(2)}kg</span>
                                                </div>
                                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary transition-all duration-500"
                                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT COLUMN: Scanned Table & Finalize - Fits height */}
                        <div className="flex flex-col gap-4 min-h-0">
                            <Card className="flex-1 flex flex-col shadow-sm min-h-0">
                                <CardHeader className="pb-3 shrink-0">
                                    <CardTitle>Scanned Items</CardTitle>
                                    <CardDescription>{scannedItems.length} items scanned</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 p-0 min-h-0">
                                    <ScrollArea className="h-full">
                                        <Table>
                                            <TableHeader className="bg-muted/50 sticky top-0 z-10">
                                                <TableRow>
                                                    <TableHead>Batch No</TableHead>
                                                    <TableHead>Item</TableHead>
                                                    <TableHead className="text-right">Weight</TableHead>
                                                    <TableHead className="w-[50px]"></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {scannedItems.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                            No items scanned yet.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    scannedItems.map((item) => (
                                                        <TableRow key={item.id} className="animate-in fade-in slide-in-from-left-4 duration-300">
                                                            <TableCell className="font-mono font-medium">{item.batch_no}</TableCell>
                                                            <TableCell>{item.item_code}</TableCell>
                                                            <TableCell className="text-right">{item.weight} kg</TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                                    onClick={() => removeScannedItem(item.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            <Card className="shrink-0 bg-muted/10">
                                <CardHeader className="pb-2 pt-4">
                                    <CardTitle className="text-base">3. Completion</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="operator"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Operator</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Operator ID" className="h-9" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="produced_weight"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Final Weight (Kg)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" className="h-9" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full font-semibold">
                                        <Check className="mr-2 h-5 w-5" />
                                        Submit Challan
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
