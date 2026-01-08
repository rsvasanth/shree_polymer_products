
import React, { createContext, useContext, useState } from 'react'

type PageHeaderContextType = {
    title: string
    setTitle: (title: string) => void
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined)

export function PageHeaderProvider({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState("Documents")

    return (
        <PageHeaderContext.Provider value={{ title, setTitle }}>
            {children}
        </PageHeaderContext.Provider>
    )
}

export function usePageHeader() {
    const context = useContext(PageHeaderContext)
    if (context === undefined) {
        throw new Error('usePageHeader must be used within a PageHeaderProvider')
    }
    return context
}
