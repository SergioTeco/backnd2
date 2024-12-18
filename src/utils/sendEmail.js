const nodemailer = require('nodemailer'); // Usamos require para nodemailer
const envsConfig = require('../config/envs.config.js'); // Usamos require para cargar el archivo de configuración
const { google } = require('googleapis'); 
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  'GOOGLE_CLIENT_ID', 
  'GOOGLE_CLIENT_SECRET', 
  'https://developers.google.com/oauthplayground' // Redireccionamiento, puedes usar la URL del playground de Google para pruebas
);

oauth2Client.setCredentials({
  refresh_token: 'REFRESH_TOKEN' 
});

const accessToken = await oauth2Client.getAccessToken();

const sendMail = async (name, subject, to) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'barrientossergio23@gmail.com', 
      clientId: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET',
      refreshToken: 'REFRESH_TOKEN',
      accessToken: accessToken
    }
  });

  await transporter.sendMail({
    from: 'barrientossergio23@gmail.com',
    to: to,
    subject: subject,
    html: `<h1>Bienvenido ${name}</h1>
<div>
  <p>Este es un curso de Backend</p>
  <img src="cid:gatito" />
</div>`,
    attachments: [
      {
        filename: 'gatito.jpg',
        path: 'public/images/gatito.jpg',
        cid: 'gatito',
      },
    ],
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

// Función para enviar el correo con el ticket
const sendTicketMail = async (to, ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: 'OAuth2',
      user: 'barrientossergio23@gmail.com', 
      clientId: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET',
      refreshToken: 'REFRESH_TOKEN',
      accessToken: accessToken
    },
  });

  // Configuramos el envío del correo electrónico
  await transporter.sendMail({
    from: "profeluismeradev@gmail.com",
    to: to,
    subject: `Ticket de compra`,
    html: `<h1>Ticket de compra</h1>
<div>
  <p>Total de compra: ${ticket.amount}</p>
  <p>Código: ${ticket.code}</p>
</div>`,
  });
};

// Exportamos las funciones para que puedan ser usadas en otros archivos
module.exports = {
  sendMail,
  sendTicketMail
};
