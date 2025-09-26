export const welcomeConfig = {
    steps: [
      {
        id: 'welcome',
        message: 'Привет! Я ваш виртуальный помощник',
        buttons: [
          {
            text: 'Начать разговор',
            nextStepId: 'start',
            type: 'button'
          }
        ]
      },
      {
        id: 'start',
        message: 'Помогу вам выбрать подходящий вариант',
        buttons: [
          {
            text: 'Попробовать себя в центре'
          }
        ]
      }, 
      {
        id: 'try',
        messages: [
          'У нас есть подготовительные курсы, которые длятся всего 2 недели. За это время вы знакомитесь с основами программирвоания, пробуете его на практике и плавной подойдете к старту обучения в основной программе. Все это под руководством опытного программиста. Он поможет, если будут сложности. Курс стоит всего 990 рублей',
        ],
        buttons: [
          {
            text: 'Вернуться назад',
            nextStepId: 'start',
            type: "button",
          },
          {
            text: 'На главную',
            nextStepId: 'welcome',
            type: "button",
          },
        ],
      },
    ]
  };
  
  export const steps = welcomeConfig.steps;
