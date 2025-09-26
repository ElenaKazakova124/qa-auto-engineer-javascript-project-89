import React from 'react';
import ChatBot from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';

const Widget = ({ steps }) => {
  return <ChatBot steps={steps} />;
};


export default Widget;
