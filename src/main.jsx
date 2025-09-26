import React from 'react'; 
import ReactDOM from 'react-dom/client';
import Widget from '@hexlet/chatbot-v2';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Widget steps={steps} />); 
