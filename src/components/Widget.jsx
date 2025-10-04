import React from 'react';
import ChatBot from '@hexlet/chatbot-v2';


const Widget = ({ steps = [] }) => {
  // Ensure steps is always an array, even if undefined or null is passed
  const safeSteps = Array.isArray(steps) ? steps : [];
  
  // If no valid steps, don't render the chatbot
  if (safeSteps.length === 0) {
    return null;
  }
  
  return <ChatBot steps={safeSteps} />;
};

export default Widget;