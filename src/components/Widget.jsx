import React from 'react';
import ChatBot from '@hexlet/chatbot-v2';


const Widget = ({ steps = [] }) => {
  // Ensure steps is always an array, even if undefined or null is passed
  const safeSteps = Array.isArray(steps) ? steps : [];
  
  // Always render the chatbot, even with empty steps
  return <ChatBot steps={safeSteps} />;
};

export default Widget;