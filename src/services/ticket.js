const { v4: uuid } = require("uuid");
const { ticketDao } = require("../dao/mongo/ticket.js");
const { sendTicketMail } = require("../utils/sendEmail.js");

class TicketService {
  async create(amount, userMail) {
    const newTicket = {
      code: uuid(),
      purchaser: userMail,
      amount,
    };
    const ticket = await ticketDao.create(newTicket);
    await sendTicketMail(userMail, ticket);
    return ticket;
  }
}

const ticketService = new TicketService();

module.exports = { ticketService };
