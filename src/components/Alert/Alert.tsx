import React from 'react';
import './Alert.css';

interface AlertProps {
  message: string | null; 
  type: 'error' | 'success' | 'info';
  onClose?: () => void; 
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {

  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      
       
      {onClose && (
        <button onClick={onClose} className="alert-close-btn">
          &times; 
        </button>
      )}
    </div>
  );
};

export default Alert;