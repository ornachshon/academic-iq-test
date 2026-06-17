import React from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@/lib/LanguageContext'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useSearchParams } from 'react-router-dom';

const NavigateWithParams = ({ to }) => {
  const [search] = useSearchParams();
  const qs = search.toString();
  return <Navigate to={qs ? `${to}?${qs}` : to} replace />;
};
import PageNotFound from './lib/PageNotFound';
import Layout from './Layout';

import Home from './pages/Home';
import IQTest from './pages/IQTest';
import Results from './pages/Results';
import Checkout from './pages/Checkout';
import Email from './pages/Email';
import Payment from './pages/Payment';
import StripePayment from './pages/StripePayment';
import Certificate from './pages/Certificate';
import Info from './pages/Info';
import Thankyou from './pages/Thankyou';
import Privacy_Policy from './pages/Privacy_Policy';
import Terms_Conditions from './pages/Terms_Conditions';
import Analytics from './pages/Analytics';
import PricingAdmin from './pages/PricingAdmin';
import Support from './pages/Support';
import Blog from './pages/Blog.jsx';
import BlogArticle from './pages/BlogArticle.jsx';
import BlogAdmin from './pages/BlogAdmin.jsx';
import CheckoutDiscount from './pages/CheckoutDiscount.jsx';

const LayoutWrapper = ({ children, currentPageName }) => (
  <Layout currentPageName={currentPageName}>{children}</Layout>
);

// Capture UTM params and brevo_id synchronously on every page load
(function captureUTM() {
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach(key => {
    const val = params.get(key);
    if (val) localStorage.setItem(key, val);
  });
  const brevoId = params.get('brevo_id');
  if (brevoId) localStorage.setItem('brevo_id', brevoId);
})();

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavigateWithParams to="/Home" />} />
          <Route path="/Home" element={<LayoutWrapper currentPageName="Home"><Home /></LayoutWrapper>} />
          <Route path="/IQTest" element={<LayoutWrapper currentPageName="IQTest"><IQTest /></LayoutWrapper>} />
          <Route path="/Email" element={<Email />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/StripePayment" element={<StripePayment />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Thankyou" element={<Thankyou />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/Results" element={<LayoutWrapper currentPageName="Results"><Results /></LayoutWrapper>} />
          <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
          <Route path="/Terms_Conditions" element={<Terms_Conditions />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/PricingAdmin" element={<PricingAdmin />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blog/:slug" element={<BlogArticle />} />
          <Route path="/BlogAdmin" element={<BlogAdmin />} />
          <Route path="/checkout-discount" element={<CheckoutDiscount />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;