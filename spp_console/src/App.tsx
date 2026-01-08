import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import DashboardPage from '@/pages/dashboard'
import { PlaceholderPage } from '@/pages/placeholder-page'
import DeliveryChallanReceiptList from '@/pages/delivery-challan-receipt/list'
import DeliveryChallanReceiptCreate from '@/pages/delivery-challan-receipt/create'
import DeliveryChallanReceiptDetail from '@/pages/delivery-challan-receipt/detail'
import { PageHeaderProvider } from '@/components/page-header-context'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "18rem",
            "--header-height": "3rem",
          } as React.CSSProperties
        }
      >
        <PageHeaderProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/delivery-challan-receipt" element={<DeliveryChallanReceiptList />} />
                <Route path="/delivery-challan-receipt/new" element={<DeliveryChallanReceiptCreate />} />
                <Route path="/delivery-challan-receipt/:id" element={<DeliveryChallanReceiptDetail />} />
                <Route path="/compound-inspection" element={<PlaceholderPage title="Compound Inspection" />} />
                <Route path="/material-transfer" element={<PlaceholderPage title="Material Transfer" />} />
                <Route path="/cut-bit-transfer" element={<PlaceholderPage title="Cut Bit Transfer" />} />
                <Route path="/blanking-dc-entry" element={<PlaceholderPage title="Blanking DC Entry" />} />
                <Route path="/blank-bin-inward" element={<PlaceholderPage title="Blank Bin Inward Entry" />} />
                <Route path="/work-planning" element={<PlaceholderPage title="Work Planning / Add On Work Planning" />} />
                <Route path="/blank-bin-issue" element={<PlaceholderPage title="Blank Bin Issue" />} />
                <Route path="/inspection-entry" element={<PlaceholderPage title="Inspection Entry" />} />
                <Route path="/moulding-production" element={<PlaceholderPage title="Moulding Production Entry" />} />
                <Route path="/moulding-inspection" element={<PlaceholderPage title="Moulding Inspection Entry" />} />
                <Route path="/deflashing-despatch" element={<PlaceholderPage title="Deflashing Despatch Entry" />} />
                <Route path="/deflashing-receipt" element={<PlaceholderPage title="Deflashing Receipt Entry" />} />
                <Route path="/deflashing-inspection" element={<PlaceholderPage title="Deflashing Inspection Entry" />} />
                <Route path="/despatch-to-u1" element={<PlaceholderPage title="Despatch To U1 Entry" />} />
                <Route path="/receive-deflashing" element={<PlaceholderPage title="Receive Deflashing Entry" />} />
                <Route path="/finishing-process" element={<PlaceholderPage title="Finishing Process Entry" />} />
                <Route path="/packing" element={<PlaceholderPage title="Packing" />} />
              </Routes>
            </div>
          </SidebarInset>
        </PageHeaderProvider>
      </SidebarProvider>
    </BrowserRouter>
  )
}
