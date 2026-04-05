import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/lib/LanguageContext'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Layout from './Layout';

import Home from './pages/Home';
import IQTest from './pages/IQTest';
import Results from './pages/Results';
import Email from './pages/Email';
import Payment from './pages/Payment';
import Certificate from './pages/Certificate';
import Info from './pages/Info';
import Thankyou from './pages/Thankyou';
import Privacy_Policy from './pages/Privacy_Policy';
import Terms_Conditions from './pages/Terms_Conditions';
import Analytics from './pages/Analytics';
import PricingAdmin from './pages/PricingAdmin';

const LayoutWrapper = ({ children, currentPageName }) => (
  <Layout currentPageName={currentPageName}>{children}</Layout>
);

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<LayoutWrapper currentPageName="Home"><Home /></LayoutWrapper>} />
          <Route path="/IQTest" element={<LayoutWrapper currentPageName="IQTest"><IQTest /></LayoutWrapper>} />
          <Route path="/Email" element={<Email />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Thankyou" element={<Thankyou />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/Results" element={<LayoutWrapper currentPageName="Results"><Results /></LayoutWrapper>} />
          <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
          <Route path="/Terms_Conditions" element={<Terms_Conditions />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/PricingAdmin" element={<PricingAdmin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;