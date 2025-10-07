import { screen, render } from '@testing-library/react';
import getWidget from '@hexlet/chatbot-v2';

export class WidgetPage {
  static renderWidget(steps) {
    render(getWidget(steps));
  }

  static isWidgetVisible() {

    return !!screen.queryByTestId('chatbot-container') || 
           !!screen.queryByText(/добро пожаловать/i);
  }

}