import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class ChatBotPage {
  constructor() {
    this.user = userEvent.setup();
  }

  // Селекторы
  get openButton() {
    return screen.getByTestId('chat-open-button');
  }

  get closeButton() {
    return screen.queryByTestId('chat-close-button');
  }

  get chatWindow() {
    return screen.queryByTestId('chat-window');
  }

  get chatHeader() {
    return screen.queryByTestId('chat-header');
  }

  get chatInput() {
    return screen.queryByTestId('user-input');
  }

  get sendButton() {
    const buttons = screen.queryAllByTestId('send-button');
    return buttons.length > 0 ? buttons[buttons.length - 1] : null;
  }

  get welcomeMessage() {
    return screen.queryByTestId('welcome-message');
  }

  get chatMessages() {
    return screen.queryByTestId('chat-messages');
  }

  get chatContainer() {
    return screen.queryByTestId('chatbot-container');
  }

  // Действия
  async openChat() {
    await this.user.click(this.openButton);
  }

  async closeChat() {
    const closeBtn = this.closeButton;
    if (closeBtn) {
      await this.user.click(closeBtn);
    }
  }

  async sendMessage(message) {
    const input = this.chatInput;
    if (input) {
      await this.user.type(input, message);
      const sendBtn = this.sendButton;
      if (sendBtn) {
        await this.user.click(sendBtn);
      }
    }
  }

  async typeMessage(message) {
    const input = this.chatInput;
    if (input) {
      await this.user.type(input, message);
    }
  }

  async clearInput() {
    const input = this.chatInput;
    if (input) {
      await this.user.clear(input);
    }
  }

  // Проверки
  isChatOpen() {
    return this.chatWindow !== null;
  }

  isChatClosed() {
    return this.chatWindow === null;
  }

  isWelcomeMessageVisible() {
    return this.welcomeMessage !== null;
  }

  isChatButtonVisible() {
    return screen.queryByTestId('chat-open-button') !== null;
  }

  getChatTitle() {
    const header = this.chatHeader;
    return header ? header.textContent : null;
  }

  getMessagesCount() {
    const messagesContainer = this.chatMessages;
    if (!messagesContainer) return 0;
    return messagesContainer.children.length;
  }

  getMessage(index) {
    const messagesContainer = this.chatMessages;
    if (!messagesContainer) return null;
    const messages = messagesContainer.children;
    return messages[index] ? messages[index].textContent : null;
  }

  getInputValue() {
    const input = this.chatInput;
    return input ? input.value : '';
  }

  hasQuickReplyButtons() {
    return screen.queryAllByRole('button').length > 2; // More than open/close buttons
  }

  async clickQuickReply(text) {
    const button = screen.queryByRole('button', { name: new RegExp(text, 'i') });
    if (button) {
      await this.user.click(button);
    }
  }

  // Ожидания
  async waitForMessage(text, timeout = 3000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        const messages = screen.queryAllByText(new RegExp(text, 'i'));
        if (messages.length > 0 || Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          resolve(messages.length > 0);
        }
      }, 100);
    });
  }
}

export default ChatBotPage;
