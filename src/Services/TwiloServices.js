const {twiloURL, twiloSendVerficatioUrl} = require('../Utils/Urls');

const sendVerficationCodeTwilo = async number => {
  try {
    const data = JSON.stringify({
      to: number,
      channel: 'sms',
    });

    const response = await fetch(twiloURL + twiloSendVerficatioUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const json = await response.json();
    return {ok: true, data: json};
  } catch (error) {
    console.error(error);
    return {ok: true, data: error};
  }
};

export {sendVerficationCodeTwilo};
