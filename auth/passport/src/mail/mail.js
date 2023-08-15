const mailer = require('nodemailer');
const welcome = require('./welcome_template');
const goodbye = require('./goodbye_template');

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: '보내는 사람 이름 <보내는 사람 이메일>',
        to,
        subject: `환영합니다, ${name}님!`,
        html: welcome(),
      };
      break;
    case 'goodbye':
      data = {
        from: '보내는 사람 이름 <보내는 사람 이메일>',
        to,
        subject: `안녕히 가세요, ${name}님!`,
        html: goodbye(),
      };
      break;
    default:
      data;
  }

  return data;
};

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: '',
    },
  });

  const mail = getEmailData(to, name, type);

  transporter.sendEmail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent successfully');
    }

    transporter.close();
  });
};

module.exports = sendMail;
