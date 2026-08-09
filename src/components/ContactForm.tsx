import React, { useState } from 'react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  role: 'educator' | 'growth';
}

export const ContactForm: React.FC<ContactFormProps> = ({
  isOpen,
  onClose,
  accentColor,
  role,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleInterest: role === 'educator' ? 'mentoring' : 'growth-design',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields!');
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      roleInterest: role === 'educator' ? 'mentoring' : 'growth-design',
      message: '',
    });
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ✕
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <h2 className="form-title">Let's work together!</h2>
            <p className="form-subtitle">
              Drop me a message and I'll get back to you within 24 hours.
            </p>

            <label className="form-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              className="neobrutal-input"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <label className="form-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              className="neobrutal-input"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label className="form-label" htmlFor="contact-interest">I'm interested in</label>
            <select
              id="contact-interest"
              className="neobrutal-input"
              value={formData.roleInterest}
              onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
            >
              {/* <option value="mentoring">1:1 Design Mentoring</option> */}
              {/* <option value="education">UX/UI Courses & Work</option> */}
              {/* <option value="growth-design">Growth Audit & Consultancy</option> */}
              <option value="web">Web Development</option>
              <option value="shopify">Shopify Solutions</option>
              <option value="app">App Development</option>
              <option value="hire">Full-time Roles</option>
              <option value="other">Other</option>
            </select>

            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="neobrutal-input text-area"
              placeholder="Tell me about your project, goals or question..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>

            <button
              type="submit"
              className="neobrutal-btn submit-btn"
              style={{ backgroundColor: accentColor }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message 🚀'}
            </button>
          </form>
        ) : (
          <div className="success-screen">
            <div className="success-badge">✓</div>
            <h2 className="success-title">Message Sent!</h2>
            <p className="success-text">
              Thanks for reaching out, <strong>{formData.name}</strong>! I've received your inquiry about{' '}
              <strong>{formData.roleInterest}</strong> and will get back to you shortly.
            </p>
            <button
              type="button"
              className="neobrutal-btn success-btn"
              onClick={handleReset}
              style={{ backgroundColor: accentColor }}
            >
              Send another message
            </button>
          </div>
        )}
      </div>

      <style>{`
        .form-title {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .form-subtitle {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 6px;
        }

        .text-area {
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          border-radius: 8px;
          margin-top: 8px;
        }

        .success-screen {
          text-align: center;
          padding: 20px 0;
        }

        .success-badge {
          width: 64px;
          height: 64px;
          border: var(--border-thick);
          background: var(--color-teal);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: bold;
          margin: 0 auto 20px;
          box-shadow: var(--shadow-sm);
        }

        .success-title {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }

        .success-text {
          font-size: 1rem;
          color: #555;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .success-btn {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
