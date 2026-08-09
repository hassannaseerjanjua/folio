import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  color: string;
  linkText: string;
  onSelect: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  color,
  linkText,
  onSelect,
}) => {
  return (
    <div className="project-card hover-lift" onClick={onSelect}>
      <div className="project-card-image" style={{ backgroundColor: color }}>
        <div className="project-mockup-browser">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-bar">kristi.digital/work/{title.toLowerCase().replace(/\s+/g, '-')}</div>
        </div>
        <div className="project-preview-content">
          <span className="project-preview-icon">✨</span>
          <h4 className="project-preview-title">{title}</h4>
        </div>
      </div>
      <div className="project-card-body">
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <button type="button" className="project-link">
          {linkText} <span className="arrow-right">→</span>
        </button>
      </div>

      <style>{`
        .project-card {
          background: #FFFFFF;
          border: 4px solid #1e1e1e;
          box-shadow: var(--shadow-md);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          text-align: left;
        }

        .project-card-image {
          height: 180px;
          border-bottom: 4px solid #1e1e1e;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .project-mockup-browser {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          height: 28px;
          background: #FFFFFF;
          border: 2px solid #1e1e1e;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 6px;
        }

        .browser-dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid #1e1e1e;
        }

        .dot.red { background-color: #FF5C9D; }
        .dot.yellow { background-color: #FFDE4D; }
        .dot.green { background-color: #00D2C4; }

        .browser-bar {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.6rem;
          color: #666;
          flex: 1;
          text-align: center;
          background: #F1F1F1;
          border-radius: 3px;
          padding: 2px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project-preview-content {
          text-align: center;
          transform: translateY(10px);
        }

        .project-preview-icon {
          font-size: 2.2rem;
          display: block;
          margin-bottom: 4px;
        }

        .project-preview-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #1e1e1e;
        }

        .project-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .project-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 4px 10px;
          background: #FAF6F0;
          border: 2px solid #1e1e1e;
          border-radius: 4px;
        }

        .project-title {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .project-desc {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 20px;
          flex: 1;
        }

        .project-link {
          background: none;
          border: none;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #1e1e1e;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          width: fit-content;
          padding: 0;
          transition: transform 0.2s ease;
        }

        .project-card:hover .project-link {
          transform: translateX(4px);
        }

        .arrow-right {
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
