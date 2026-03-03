import React, { useState } from "react";
import "./styles/FAQ.css";

const faqs = [
  {
    q: "How does AuthenChain work?",
    a: "AuthenChain uses advanced AI models to analyze text, images, and videos. Verification results are recorded immutably on blockchain for transparency."
  },
  {
    q: "What makes AuthenChain unique?",
    a: "AuthenChain combines AI detection, blockchain proof, and cross-media verification to deliver unmatched authenticity tracking."
  },
  {
    q: "Who can use AuthenChain?",
    a: "Researchers, journalists, creators, security teams, and everyday users who need reliable digital truth validation."
  },
  {
    q: "Can AuthenChain detect deepfake videos in real-time?",
    a: "Yes — our AI pipelines process and flag deepfake content nearly in real-time depending on video complexity."
  },
  {
    q: "Is the blockchain integration really necessary?",
    a: "Blockchain ensures tamper-proof verification history, offering a level of trust unattainable with centralized systems."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <div className="faq-container">

        {/* Title */}
        <h2 className="faq-title">
          FAQ<span>s</span>
        </h2>

        <div className="faq-items">
          {faqs.map((item, idx) => (
            <div key={idx} className="faq-row">

              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.q}
                <span className="faq-icon">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              <div
                className={`faq-answer ${
                  openIndex === idx ? "open" : ""
                }`}
              >
                {item.a}
              </div>

              {/* Divider */}
              <div className="faq-divider"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
