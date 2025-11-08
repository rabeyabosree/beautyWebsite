import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

function ContactPage() {
  // ✅ Dummy contact info
  const contactInfo = [
    { type: "Address", value: "123, Main Street, Dhaka, Bangladesh" },
    { type: "Phone", value: "+880 1234 567890" },
    { type: "Email", value: "info@example.com" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="py-16 bg-[#9ec458b9] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Contact Page</h1>
        <p className="mt-2 text-sm opacity-90">
          We’d love to hear from you! Reach out for any inquiries or assistance.
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-bold mb-2">{item.type}</h3>
              <p className="text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-lg shadow max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Your Message"
              className="border p-2 rounded h-32"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
