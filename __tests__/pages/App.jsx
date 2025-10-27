import { expect } from 'vitest'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import App from '../../src/App'
import {
  startButtonText,
  modalTitleText,
  submitButtonText,
  closeButtonLabel,
  formLabels,
  formValues,
} from '../../__fixtures__/texts'

class AppPage {
  static render() {
    render(<App />)
  }

  static openWidget() {
    fireEvent.click(screen.getByText(startButtonText))
  }

  static closeWidget() {
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }))
  }

  static expectWidgetOpened() {
    expect(screen.getByText(modalTitleText)).toBeInTheDocument()
  }

  static async expectWidgetClosed() {
    await waitFor(() => {
      expect(screen.queryByText(modalTitleText)).not.toBeInTheDocument()
    })
  }

  static submitForm() {
    fireEvent.click(screen.getByText(submitButtonText))
  }

  static getFormInputLabel(label) {
    return screen.getByLabelText(formLabels[label])
  }

  static fillForm() {
    fireEvent.change(this.getFormInputLabel(formLabels.email), { target: { value: formValues.email } })
    fireEvent.change(this.getFormInputLabel(formLabels.password), { target: { value: formValues.password } })
    fireEvent.change(this.getFormInputLabel(formLabels.address), { target: { value: formValues.address } })
    fireEvent.change(this.getFormInputLabel(formLabels.city), { target: { value: formValues.city } })
    fireEvent.change(this.getFormInputLabel(formLabels.country), { target: { value: formValues.country } })
    fireEvent.click(this.getFormInputLabel(formLabels.rules))
  }

  static expectFormValues() {
    expect(this.getFormInputLabel(formLabels.email).value).toBe(formValues.email)
    expect(this.getFormInputLabel(formLabels.password).value).toBe(formValues.password)
    expect(this.getFormInputLabel(formLabels.address).value).toBe(formValues.address)
    expect(this.getFormInputLabel(formLabels.city).value).toBe(formValues.city)
    expect(this.getFormInputLabel(formLabels.country).value).toBe(formValues.country)
    expect(this.getFormInputLabel(formLabels.rules).checked).toBe(true)
  }

  static expectFormSubmission() {
    return waitFor(async () => {
      const resultTable = screen.getByRole('table')
      expect(resultTable).toBeInTheDocument()

      expect(await screen.findByText(formLabels.email).nextSibling).toHaveTextContent('test@example.com')
      expect(await screen.findByText(formLabels.password).nextSibling).toHaveTextContent('testpassword')
      expect(await screen.findByText(formLabels.address).nextSibling).toHaveTextContent('Арбат 1234')
      expect(await screen.findByText(formLabels.city).nextSibling).toHaveTextContent('Москва')
      expect(await screen.findByText(formLabels.country).nextSibling).toHaveTextContent('Россия')
      expect(await screen.findByText(formLabels.rules).nextSibling).toHaveTextContent('true')
    })
  }
}

export default AppPage
