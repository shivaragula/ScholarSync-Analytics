import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
          >
            Go Back
          </button>
        </div>
        
        <div className="helpful-links">
          <h3>You might be looking for:</h3>
          <ul>
            <li><Link to="/enrollment-overview">Enrollment Overview</Link></li>
            <li><Link to="/renewal-analytics">Renewal Analytics</Link></li>
            <li><Link to="/revenue-intelligence">Revenue Intelligence</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;