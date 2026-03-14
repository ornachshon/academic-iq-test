import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Introduction",
    content: `Welcome to Academic IQ Test! This Privacy Policy ("Policy") describes how Academic IQ Test ("Academic IQ Test," "we," "us," or "our") collects, uses, and discloses your information when you use our website (the "Website").

This Policy is designed to inform you of our practices regarding your data privacy and to help you make informed choices about the information you provide to us.`
  },
  {
    title: "Who We Are",
    content: "Academic IQ Test is a website owned and operated by Academic IQ Test. We are committed to protecting the privacy of our users."
  },
  {
    title: "Your Acknowledgement of This Policy",
    content: "By accessing or using the Website, you agree to be bound by this Policy. If you disagree with any part of this Policy, you may not access or use the Website."
  },
  {
    title: "Information We Collect",
    content: `We collect two types of information on the Website:

Personal Information: This is information that can be used to identify you as an individual. Personal Information we collect may include your name, email address, and any other information you voluntarily provide to us.

Non-Personal Information: This is information that does not identify you as an individual. Non-Personal Information we collect may include your browser type, operating system, IP address, browsing activity on the Website, and the date and time of your visit.`
  },
  {
    title: "How We Collect User Information",
    content: `We collect information in the following ways:

When you register for an account: We collect your name and email address when you register for an account on the Website.

When you contact us: We collect your name and email address when you contact us through our support email (support@academiciqtest.com).

When you use the Website: We collect Non-Personal Information about your use of the Website through cookies and other tracking technologies.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect for the following purposes:

• To operate and maintain the Website
• To improve the Website
• To personalize your experience on the Website
• To send you information and updates about the Website
• To send you marketing and promotional communications (with your consent)
• To respond to your inquiries and requests
• To comply with the law`
  },
  {
    title: "Your Rights",
    content: `You have certain rights regarding your personal information. You can:

• Access your personal information
• Rectify inaccurate personal information
• Request the deletion of your personal information
• Object to the processing of your personal information`
  },
  {
    title: "Payment",
    content: `We may offer paid services on the Website. Payment information, such as credit card details, is collected by a third-party payment processor. We do not store your full payment information on our servers.

Please note that payment options and pricing may change from time to time. We will always clearly inform you of any changes before you make a payment.`
  },
  {
    title: "Social Features",
    content: "The Website may offer social features, such as forums and message boards. Please be aware that any information you post on these features may be publicly available."
  },
  {
    title: "Minimum Age of Users",
    content: "Our Website is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you believe that your child under 16 has provided us with personal information, please contact us."
  },
  {
    title: "Third-Party Service Providers",
    content: "We may use third-party service providers to help us operate and maintain the Website. These third-party service providers may have access to your personal information in order to provide their services. We require all third-party service providers to comply with this Policy and to use your information only for the purposes for which it was collected."
  },
  {
    title: "Cookies",
    content: `We use cookies and other tracking technologies to collect Non-Personal Information about your use of the Website. Cookies are small data files that are stored on your device when you visit a website. They are used to track your use of the website and to remember certain information about your preferences.

You can disable cookies in your browser settings. However, please be aware that disabling cookies may limit your use of certain features of the Website.`
  },
  {
    title: "Links to Third-Party Websites",
    content: "The Website may contain links to third-party websites. These websites are not controlled by us and have their own privacy policies. We are not responsible for the content or practices of any third-party website."
  },
  {
    title: "Security",
    content: "We take steps to protect your personal information from unauthorized access, use, disclosure, alteration, and destruction. However, no security measure is perfect, and we cannot guarantee the security of your personal information."
  },
  {
    title: "Data Retention",
    content: "We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law."
  },
  {
    title: "Changes to the Privacy Policy",
    content: "We may update this Policy from time to time. We will notify you of any material changes by posting the new Policy on the Website."
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Policy or our privacy practices, please contact us at support@academiciqtest.com."
  }
];

const tableOfContents = [
  "Who We Are", "Your Acknowledgement of This Policy", "Information We Collect",
  "How We Collect User Information", "How We Use Your Information", "Your Rights",
  "Payment", "Social Features", "Minimum Age of Users", "Third-Party Service Providers",
  "Cookies", "Links to Third-Party Websites", "Security", "Data Retention",
  "Changes to the Privacy Policy", "Contact Us"
];

export default function Privacy_Policy() {
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
        <h1 className="text-3xl font-bold text-[#0C3547] mb-2">Academic IQ Test Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: March 14, 2026</p>

        {/* Introduction */}
        <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">{sections[0].content}</p>

        {/* Table of Contents */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-[#0C3547] mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-1">
            {tableOfContents.map((item, i) => (
              <li key={i} className="text-[#F5921B] hover:underline cursor-pointer text-sm">
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.slice(1).map((section, i) => (
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