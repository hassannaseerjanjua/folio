import React from 'react';

interface RoleToggleProps {
  role: 'educator' | 'growth';
  onChange: (role: 'educator' | 'growth') => void;
}

export const RoleToggle: React.FC<RoleToggleProps> = ({ role, onChange }) => {
  return (
    <div className="role-toggle-wrapper">
      <div className="role-toggle-container">
        <button
          type="button"
          onClick={() => onChange('educator')}
          className={`toggle-option ${role === 'educator' ? 'active educator' : ''}`}
        >
          🎨 Frontend Mode
        </button>
        <button
          type="button"
          onClick={() => onChange('growth')}
          className={`toggle-option ${role === 'growth' ? 'active growth' : ''}`}
        >
          ⚙️ Backend Mode
        </button>
      </div>

      <style>{`
        .role-toggle-wrapper {
          display: inline-flex;
          align-items: center;
        }

        .role-toggle-container {
          display: flex;
          background: #FFFFFF;
          border: 3px solid #1e1e1e;
          border-radius: 50px;
          padding: 4px;
          position: relative;
          box-shadow: 4px 4px 0px #1e1e1e;
          gap: 4px;
        }

        .toggle-option {
          border: none;
          background: none;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 8px 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          color: #1e1e1e;
          user-select: none;
        }

        .toggle-option.active {
          border: 2px solid #1e1e1e;
          box-shadow: 2px 2px 0px #1e1e1e;
          transform: translate(-1px, -1px);
        }

        .toggle-option.active.educator {
          background-color: var(--color-yellow);
        }

        .toggle-option.active.growth {
          background-color: var(--color-teal);
        }

        @media (max-width: 600px) {
          .toggle-option {
            font-size: 0.8rem;
            padding: 6px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default RoleToggle;
