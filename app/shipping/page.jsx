"use client";

import React from "react";

export default function PurchaseAndReturnsPolicy() {
  return (
    <div className="min-h-screen p-4 mt-14 bg-base-200 md:p-8">
      <div className="max-w-4xl p-6 mx-auto shadow-xl bg-base-100 rounded-box md:p-8">
        <h1 className="mb-6 text-3xl font-bold">Purchase and Returns Policy</h1>

        <p className="mb-4">
          Thank you for shopping at {process.env.ORG_NAME}. We are delighted to
          have you as our customer and aim to provide you with a satisfying
          shopping experience.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Purchase Policy:</h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Order Processing:</h3>
        <p className="mb-4">
          Upon completing your purchase, you will receive a confirmation email
          containing details of your order. Please ensure that all information
          provided during the ordering process is accurate to facilitate smooth
          order processing.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Payment:</h3>
        <p className="mb-4">
          We accept payments through various secure payment gateways. All prices
          listed on our website are in Indian Rupees. Payment must be made in
          full before we process your order.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Delivery:</h3>
        <p className="mb-4">
          Digital products such as audios, tutorials and videos will be
          available for immediate download on the website account, upon
          successful payment confirmation. Physical products, if available, will
          be shipped to the address provided during the ordering process. Please
          refer to our Shipping Policy for more information.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Returns and Refunds Policy:
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Digital Products:</h3>
        <p className="mb-4">
          Due to the nature of digital products, we do not accept returns,
          exchanges, or refunds unless there is a technical issue preventing
          access to the purchased content. In such cases, please contact our
          customer support team for assistance.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Physical Products:</h3>
        <p className="mb-4">
          If there is an issue with your Purchase, please contact our customer
          support team within 2 days of delivery. We will require unboxing video
          and photos of the damage to assess the problem and determine the
          necessary action.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Replacement:</h3>
        <ul className="mb-4 space-y-2 list-disc list-inside">
          <li>
            If the issue is found to be a fault on our part, we will arrange for
            a courier to collect the faulty artwork and send a replacement at no
            additional cost to you. The replacement will be dispatched with
            priority shipping to minimize any inconvenience.
          </li>
          <li>
            If the issue is found to be a fault at the delivery partner's end
            (damage or breakage), then we are not responsible, but we will try
            our best to resolve the issue to the best of our capacity for our
            valuable customer.
          </li>
          <li>
            If the issue is found to be a fault at the customer's end, such as
            wrong delivery address, contact details, or customs issues, then we
            will not be responsible. If any customer is found to place false
            allegations, we reserve the right to not cater to their grievances.
          </li>
        </ul>

        <h3 className="mt-6 mb-2 text-xl font-semibold">Reporting Issues:</h3>
        <p className="mb-4">
          No Returns for Change of Mind: Each piece of our artwork is unique.
          Due to this nature, we do not accept returns or offer refunds for
          changes of mind or incorrect measurements provided by the customer. If
          the customer has ordered the wrong product, print, color, or size, no
          replacement or returns will be provided.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold">
          Checking Your Order:
        </h3>
        <p className="mb-4">
          Please inspect your artwork upon delivery and before installation. We
          are unable to offer compensation for third-party installation or any
          issues that arise after the artwork has been installed or during
          installation.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Contact Us:</h2>
        <p className="mb-4">
          If you have any questions or concerns about your purchase or our
          returns policy, please don't hesitate to contact us. Our customer
          support team is here to assist you and ensure your satisfaction.
        </p>
        <p className="mb-4">
          For any issues or questions regarding your order, please reach out to
          us at ____. We are here to ensure you have a satisfying experience
          with {process.env.ORG_NAME}.
        </p>

        <p className="mt-8 mb-4">
          Thank you for choosing {process.env.ORG_NAME}. We appreciate your
          support and strive to provide you with the best possible service and
          products.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Delivery Timeline</h2>
        <p className="mb-4">
          The products will be dispatched within 4 to 7 Indian working days,
          upon receipt of payment and design confirmation. Orders placed after 7
          pm IST will be processed the following business day.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Quality Assurance and Packaging
        </h2>
        <p className="mb-4">
          Each piece undergoes quality checks before being securely packed in
          protective materials to ensure it reaches you in perfect condition. We
          are available to assist you with any installation queries.
        </p>
      </div>
    </div>
  );
}
