"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-4 mt-14 bg-base-200 md:p-8">
      <div className="max-w-4xl p-6 mx-auto shadow-xl bg-base-100 rounded-box md:p-8">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

        <p className="mb-4">
          Thank you for visiting {process.env.ORG_NAME}. Your privacy is of
          utmost importance to us. This privacy policy outlines how we handle
          your personal information and use cookies to enhance your experience
          on our site.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Data Collection and Usage
        </h2>
        <p className="mb-4">
          When you subscribe to {process.env.ORG_NAME} or make a purchase, we
          collect and securely store personal data such as your name, email
          address, and physical address.
        </p>
        <p className="mb-4">
          For a better experience while using our Service, we may require you to
          provide us with certain personally identifiable information, including
          but not limited to your name, email address, postal address, and
          payment information. The information that we collect will be used to
          contact or identify you.
        </p>

        <p className="mb-4">This data is used to:</p>
        <ul className="mb-4 space-y-2 list-disc list-inside">
          <li>Process and deliver your orders</li>
          <li>Send marketing communications and updates</li>
          <li>Manage invoicing and payments</li>
        </ul>

        <p className="mb-4">
          We retain your personal data only as long as necessary to fulfill
          these purposes and comply with legal requirements. Your information
          will never be shared with third parties without your explicit consent.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Data Removal</h2>
        <p className="mb-4">
          If you wish to have your personal details removed from our records,
          please contact us. We will promptly delete your data as per your
          request.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Log Data</h2>
        <p className="mb-4">
          We want to inform you that whenever you visit our Service, we collect
          information that your browser sends to us that is called Log Data.
          This Log Data may include information such as your computer's Internet
          Protocol ("IP") address, browser version, pages of our Service that
          you visit, the time and date of your visit, the time spent on those
          pages, and other statistics.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Cookies</h2>
        <p className="mb-4">
          Our website uses cookies to personalize your experience, track the
          contents of your shopping basket, and remember your progress through
          the order process.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">What are Cookies?</h3>
        <p className="mb-4">
          Cookies are small text files placed on your computer's hard drive with
          your permission. They help us analyze web traffic and tailor our site
          to your preferences by remembering your actions and settings.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Your Consent</h3>
        <p className="mb-4">
          By using our site, you consent to our use of cookies. You can manage
          your cookie preferences through your web browser settings. Most
          browsers automatically accept cookies, but you can usually modify your
          browser setting to decline cookies if you prefer. Note that disabling
          cookies may limit your ability to fully experience our website.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Service Providers</h2>
        <p className="mb-4">
          We may employ third-party companies and individuals due to the
          following reasons:
        </p>
        <ul className="mb-4 space-y-2 list-disc list-inside">
          <li>To facilitate our Service</li>
          <li>To provide the Service on our behalf</li>
          <li>To perform Service-related services</li>
          <li>To assist us in analyzing how our Service is used</li>
        </ul>
        <p className="mb-4">
          We want to inform our Service users that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Security</h2>
        <p className="mb-4">
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Links to Other Sites
        </h2>
        <p className="mb-4">
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over, and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately after they are posted on this
          page.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about our privacy practices,
          please contact us at _____.
        </p>

        <p className="mt-8 mb-4">
          Thank you for trusting {process.env.ORG_NAME} with your personal
          information.
        </p>
      </div>
    </div>
  );
}
