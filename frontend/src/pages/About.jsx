import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import img1 from '../assets/founder.jpg'
import img2 from '../assets/lead.jpg'
import img3 from '../assets/ux.jpg'

function About() {
  // ✅ Dummy team / info data
  const teamMembers = [
    { name: "Rabeya Bosri", role: "Founder & CEO", img: img1},
    { name: "John Doe", role: "Lead Developer", img: img2 },
    { name: "Jane Smith", role: "UI/UX Designer", img: img3 },
  ];

  const companyInfo = [
    { title: "Our Mission", desc: "To provide quality products with excellent customer service." },
    { title: "Our Vision", desc: "To become a leading e-commerce platform in Bangladesh." },
    { title: "Our Values", desc: "Integrity, Innovation, and Customer Satisfaction." },
  ];

  return (
    <div>
      {/* Header */}
      <div className="py-16 bg-[#9ec458b9] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">About Page</h1>
        <p className="mt-2 text-sm opacity-90">
          We’d love to hear from you! Reach out for any inquiries or assistance.
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/about" className="hover:underline">About</a>
        </div>
      </div>

      {/* Company Info */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">About Our Company</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {companyInfo.map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
              <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"/>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
