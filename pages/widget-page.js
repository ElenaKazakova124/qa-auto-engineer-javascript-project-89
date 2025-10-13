import { expect } from 'vitest'
import textSet from '../__fixtures__/text-set.js'
import '@testing-library/jest-dom/vitest'

export class WidgetPage {
  constructor(screen) {
    this.screen = screen
  }

  checkOpenChatButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.openChatButton,
      }),
    )
  }

  async clickOpenChatButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.openChatButton,
      }),
    )
  }

  checkStartConversationButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.startConversationButton,
      }),
    )
  }

  async clickStartConversationButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.startConversationButton,
      }),
    )
  }

  checkChangeProfessionButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.changeProfessionButton,
      }),
    )
  }

  async clickChangeProfessionButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.changeProfessionButton,
      }),
    )
  }

  checkTryITButton() {
    expect(this.screen.getByRole('button', { name: textSet.tryITButton }))
  }

  async clickTryITButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.tryITButton }),
    )
  }

  checkDeveloperButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.developerButton,
      }),
    )
  }

  async clickDeveloperButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.developerButton,
      }),
    )
  }

  checkTellMoreButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.tellMoreButton,
      }),
    )
  }

  async clickTellMoreButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.tellMoreButton }),
    )
  }

  checkSimplerButton() {
    expect(this.screen.getByRole('button', { name: textSet.simplerButton }))
  }

  async clickSimplerButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.simplerButton }),
    )
  }

  checkBackButton() {
    expect(this.screen.getByRole('button', { name: textSet.backButton }))
  }

  async clickBackButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.backButton }),
    )
  }

  checkInterestingButton() {
    expect(
      this.screen.getByRole('button', { name: textSet.interestingButton }),
    )
  }

  async clickInterestingButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.interestingButton }),
    )
  }

  checkChangingProfessionsButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.aboutChangingProfessionsButton,
      }),
    )
  }

  async clickChangingProfessionsButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.aboutChangingProfessionsButton,
      }),
    )
  }

  checkGoBackButton() {
    expect(this.screen.getByRole('button', { name: textSet.goBackButton }))
  }

  async clickGoBackButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.goBackButton }),
    )
  }

  checkTakeMeBackButton() {
    expect(
      this.screen.getByRole('button', { name: textSet.takeMeBackButton }),
    )
  }

  async clickTakeMeBackButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.takeMeBackButton }),
    )
  }

  checkStayHereButton() {
    expect(
      this.screen.getByRole('button', {
        name: textSet.stayHereButton,
      }),
    )
  }

  async clickStayHereButton(user) {
    await user.click(
      this.screen.getByRole('button', {
        name: textSet.stayHereButton,
      }),
    )
  }

  async clickCloseButton(user) {
    await user.click(this.screen.getByLabelText(textSet.closeButton))
  }

  checkTextOpenChat() {
    expect(this.screen.getByText(textSet.openChat)).toBeVisible()
  }

  checkTextStartConversation() {
    expect(this.screen.getByText(textSet.startConversation)).toBeVisible()
  }

  checkTextChangeProfession() {
    expect(this.screen.getByText(textSet.changeProfession)).toBeVisible()
  }

  checkTextTryIT() {
    expect(this.screen.getByText(textSet.tryIT)).toBeVisible()
  }

  checkTextDeveloperText1() {
    expect(this.screen.getByText(textSet.developerText1)).toBeVisible()
  }

  checkTextDeveloperText2() {
    expect(this.screen.getByText(textSet.developerText2)).toBeVisible()
  }

  checkTextTellMoreText1() {
    expect(this.screen.getByText(textSet.tellMoreText1)).toBeVisible()
  }

  checkTextTellMoreText2() {
    expect(this.screen.getByText(textSet.tellMoreText2)).toBeVisible()
  }

  checkTextSimpler() {
    expect(this.screen.getByText(textSet.simpler)).toBeVisible()
  }

  checkTextStayHereText1() {
    expect(this.screen.getByText(textSet.stayHereText1)).toBeVisible()
  }

  checkTextStayHereText2() {
    expect(this.screen.getByText(textSet.stayHereText2)).toBeVisible()
  }

  checkTextInterstingText1() {
    expect(this.screen.getByText(textSet.interstingText1)).toBeVisible()
  }

  checkTextInterstingText2() {
    expect(this.screen.getByText(textSet.interstingText2)).toBeVisible()
  }

  checkChangingProfessionsText() {
    expect(
      this.screen.getByText(textSet.aboutChangingProfessions),
    ).toBeVisible()
  }
}