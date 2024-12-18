const nodemailer = require('nodemailer'); // Usamos require para nodemailer
const envsConfig = require('../config/envs.config.js'); // Usamos require para cargar el archivo de configuración

// Función para enviar el correo de bienvenida
const sendMail = async (name, subject, to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "barrientossergio23@gmail.com",
      pass: envsConfig.GMAIL_PASS, // revisa que esta variable esté correctamente configurada
    },
  });

  // Configuramos el envío del correo electrónico
  await transporter.sendMail({
    from: "barrientossergio23@gmail.com",
    to: to,
    subject: subject,
    html: `<h1>Bienvenido ${name}</h1>
<div>
  <p>Este es un curso de Backend</p>
  <img src="cid:gatito" />
</div>`,
    attachments: [
      {
        filename: "gatito.jpg",
        path: "public/images/gatito.jpg",
        cid: "gatito",
      },
    ],
  });
};

// Función para enviar el correo con el ticket
const sendTicketMail = async (to, ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "profeluismeradev@gmail.com",
      pass: envsConfig.GMAIL_PASS,
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
