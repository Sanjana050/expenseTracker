const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const API_KEY = 'xsmtpsib-f6cfb73506578376b7e5d79703ee0391ff58525f970881cb91547b6a0faa9f27-4mjtDxSQNn6w0sAT';
const API_K = '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';

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = API_K;
console.log(apiKey.apiKey);

exports.forgotpassword = async (req, res, next) => {
  try {
    const email_id = req.body.email_id;
    const tranEmailApi = new Sib.TransactionalEmailsApi();
console.log(email_id);
    const sender = {
      email: 'sanjanamondal711@gmail.com',
      name: 'Sanjana',
    };

    const receivers = [
      {
        email: email_id,
      },
    ];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Password reset mail',
      textContent: `
          Please reset your password.`,

      htmlContent: `
          <h1>Expense Tracker</h1>
          <a href="https://cules-coding.vercel.app/">Visit</a>
      `,

    });
    if(response)
    {
      console.log(response,"NEHAAAAA")
    }
    console.log(sender, "NEHA", receivers);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
