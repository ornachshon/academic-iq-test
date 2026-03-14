import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Acceptance of the Terms",
    content: `By accessing or using the Academic IQ Test website (the "Site"), you agree to be bound by these Terms & Conditions. If you disagree with any part of these Terms & Conditions, then you may not access or use the Site.`
  },
  {
    title: "The Site",
    content: "The Site and the tests are made available solely for entertainment purposes. The results of the tests are not intended to be a substitute for professional advice or diagnosis."
  },
  {
    title: "Consideration",
    content: "Your use of the Site constitutes consideration, and by using the Site, you agree to these Terms & Conditions."
  },
  {
    title: "Use Restrictions",
    content: "You agree not to use the Site for any unlawful or prohibited purpose. You must not attempt to gain unauthorized access to the Site, or any associated systems or networks."
  },
  {
    title: "Privacy and Policy",
    content: "Your use of the Site is also governed by our Privacy Policy. Please review our Privacy Policy for more information on how we collect, use, and protect your personal information."
  },
  {
    title: "Intellectual Property Rights",
    content: "The Site and its content, including but not limited to text, graphics, logos, images, and software, are the property of Academic IQ Test and are protected by copyright and other intellectual property laws."
  },
  {
    title: "Linking to the Site and Links to Third Party Sites",
    content: `You may link to the Site, provided you do so in a fair and legal way and do not damage our reputation or take advantage of it. You must not establish a link in such a way as to suggest any form of association, approval, or endorsement on our part where none exists.

The Site may contain links to third-party websites. These websites are not controlled by us and have their own privacy policies and terms of use. We are not responsible for the content or practices of any third-party website.`
  },
  {
    title: "Availability",
    content: "We reserve the right to modify or discontinue, temporarily or permanently, the Site or any part thereof, without notice."
  },
  {
    title: "Changes to the Site",
    content: "We may make changes to the Site at any time."
  },
  {
    title: "Disclaimers and No Warranties",
    content: `The Site is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.`
  },
  {
    title: "Limitation of Liability",
    content: "In no event shall Academic IQ Test be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site or any materials, information, products, or services on the Site."
  },
  {
    title: "Indemnification",
    content: "You agree to indemnify and hold harmless Academic IQ Test, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of your use of the Site or violation of these Terms & Conditions."
  },
  {
    title: "Amendments to the Terms",
    content: "We reserve the right to modify these Terms & Conditions at any time. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms & Conditions."
  },
  {
    title: "Termination of these Terms and the Termination of the Site's operation",
    content: "We may terminate these Terms & Conditions or the Site's operation at any time, with or without notice."
  },
  {
    title: "General",
    content: "These Terms & Conditions shall be governed by and construed in accordance with the laws of Israel."
  },
  {
    title: "Payment and Refund",
    content: `To access certain features or services on the Site, you may be required to make a payment. Payment can be made through various methods, including credit card, debit card, or other online payment methods.

Refund Policy:
All purchases made on the Site are final and non-refundable, unless otherwise specified. We do not offer refunds for digital products or services, including but not limited to IQ test results.
If you encounter any technical issues preventing you from accessing the service, please contact our support team, and we will do our best to resolve the issue. However, please note that this does not guarantee a refund.`
  },
  {
    title: "Contact Us",
    content: "If you have any questions about these Terms or our practices, please contact us at support@academiciqtest.com."
  }
];

export default function Terms_Conditions() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/Home">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                className="h-10 w-10 object-contain"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#0C3547] mb-2">Academic IQ Test Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-10">Last Update: March 14, 2026</p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-[#0C3547] mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}