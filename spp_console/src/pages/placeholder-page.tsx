

interface PlaceholderPageProps {
    title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Page under development
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        This module for {title} is currently being built.
                    </p>
                </div>
            </div>
        </div>
    )
}
