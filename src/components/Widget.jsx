import React from 'react';
import ChatBot from '@hexlet/chatbot-v2';

const Widget = ({ steps }) => {
  const safeSteps = Array.isArray(steps) ? steps : [];
  return <ChatBot steps={safeSteps} />;
};

export default Widget;