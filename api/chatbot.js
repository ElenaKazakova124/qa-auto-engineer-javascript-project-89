export const sendMessage = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Ответ на: ${message}`);
      }, 1000);
    });
  };