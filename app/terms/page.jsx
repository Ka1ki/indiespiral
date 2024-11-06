import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <div className="container px-4 py-8 mx-auto mt-14">
      <Head>
        <title>Terms and Conditions - {process.env.ORG_NAME}</title>
        <meta
          name="description"
          content={`Terms and Conditions for ${process.env.ORG_NAME}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose max-w-none">
        <h1 className="mb-6 text-4xl font-bold">Terms and Conditions</h1>

        <p>
          Welcome to {process.env.ORG_NAME}. By accessing and using our website,
          you agree to comply with the following terms and conditions. Please
          read them carefully before using the website or making a purchase.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Terms</h2>
        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company's terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client's
          needs in respect of provision of the Company's stated services, in
          accordance with and subject to, prevailing law of India. Any use of
          the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">License</h2>
        <p>
          Unless otherwise stated, {process.env.ORG_NAME} and/or its licensors
          own the intellectual property rights for all material on this website.
          All intellectual property rights are reserved. You may access this for
          your own personal use subjected to restrictions set in these terms and
          conditions.
        </p>

        <p>You must not:</p>
        <ul className="pl-6 list-disc">
          <li>Republish material from {process.env.ORG_NAME}</li>
          <li>
            Sell, rent or sub-license material from {process.env.ORG_NAME}
          </li>
          <li>
            Reproduce, duplicate or copy material from {process.env.ORG_NAME}
          </li>
          <li>Redistribute content from {process.env.ORG_NAME}</li>
        </ul>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Content</h2>
        <p>
          {process.env.ORG_NAME} website may allow you to post, link, store,
          share and otherwise make available certain information, text,
          graphics, videos, or other material. You are responsible for the
          content you post on our website.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Links To Other Web Sites
        </h2>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by {process.env.ORG_NAME}
        </p>
        <p>
          {process.env.ORG_NAME} has no control over, and assumes no
          responsibility for, the content, privacy policies, or practices of any
          third party web sites or services. You further acknowledge and agree
          that {process.env.ORG_NAME} shall not be responsible or liable,
          directly or indirectly, for any damage or loss
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Order Process</h2>
        <p>
          <strong>Placing an Order:</strong> Browse our online gallery and
          select your desired artwork. Add the item to your cart and proceed to
          checkout.
        </p>
        <p>
          <strong>Order Confirmation:</strong> Upon placing an order, you will
          receive an email confirmation with the details of your purchase.
          Please review this information carefully and contact us immediately if
          there are any discrepancies.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Payment</h2>
        <p>
          <strong>Payment Methods:</strong> We accept all major secure payment
          methods as indicated at checkout.
        </p>
        <p>
          <strong>Payment Security:</strong> All payment transactions are
          encrypted and processed through secure payment gateways to ensure your
          personal and financial information is protected.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Right to Cancellation
        </h2>
        <p>
          <strong>No Cancellations:</strong> Once an order is placed, it cannot
          be cancelled. Please ensure all details are correct before finalizing
          your purchase.
        </p>
        <p>
          <strong>No Refunds:</strong> All sales are final. We do not offer
          refunds for any orders. This policy is in place due to the
          personalized nature of our products.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Shipping and Delivery
        </h2>
        <p>
          <strong>Shipping:</strong> Customers are responsible for any customs
          fees, duties, or taxes incurred during international shipping in their
          respective countries.
        </p>
        <p>
          <strong>Delivery:</strong> Each piece of art is created with care and
          precision. We offer shipping options at checkout. Delivery times vary
          based on location and shipping method selected. You will receive a
          tracking number once your order has shipped.
        </p>
        <p>
          Ready original artworks will be dispatched for shipping within 2 to 4
          working days. Print artworks will be dispatched for shipping within 4
          to 7 working days.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Quality of Products
        </h2>
        <p>
          <strong>Materials:</strong> We use particle wood frames, good-quality
          prints on 180 GSM paper, 270 GSM to 300 GSM canvas, and pine wood
          frames for stretched canvases. We reserve the rights to change the
          materials we use in our products.
        </p>
        <p>
          <strong>Handmade Products:</strong> As each piece is handmade, slight
          variations in color and design may occur, adding to the unique charm
          of each artwork.
        </p>
        <p>
          <strong>Damage During Shipping:</strong> If your order arrives
          damaged, please contact us within 2 days of delivery with photos of
          the damage. We will work with you to resolve the issue promptly.
        </p>
        <p>
          In case a replacement needs to be dispatched, it will be shipped once
          we receive the damaged package. Please note that you will have to pay
          the shipping cost for the damaged package.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Intellectual Property
        </h2>
        <p>
          All content on this website, including but not limited to images,
          text, designs, and graphics, is the intellectual property of Hiral
          Haria, owner of {process.env.ORG_NAME}. Unauthorized use,
          reproduction, or distribution of any content is strictly prohibited.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Limitation of Liability
        </h2>
        <p>
          {process.env.ORG_NAME} is not liable for any direct, indirect,
          incidental, or consequential damages resulting from the use or
          inability to use our products or website. Our liability is limited to
          the maximum extent permitted by law.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">
          Changes to Terms and Conditions
        </h2>
        <p>
          We reserve the right to modify these terms and conditions at any time.
          Any changes will be posted on this page, and your continued use of the
          website signifies your acceptance of the updated terms.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of Maharashtra, India, and any disputes will be subject
          to the exclusive jurisdiction of the courts of India.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these terms and
          conditions, please contact us at ______
        </p>

        <p className="mt-8">
          Thank you for choosing {process.env.ORG_NAME}. We appreciate your
          support and hope you enjoy your unique purchase.
        </p>
      </main>
    </div>
  );
}
