import type { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

type Data = any;

interface IEmail {
  name: string;
  email: string;
  consulta: string;
  product: string;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return sendEmail_(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const sendEmail_ = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "royerstorearg@gmail.com",
      pass: `ksnddqttbntnujrp`,
    },
  });

  transporter.sendMail(
    {
      from: '"Royer - Store <royerstorearg@gmail.com>',
      to: `${req.body.email}`,
      subject: `Sales - Royer Store`,
      text: ``,
      html: `<h3>${req.body.name},</h3><p>We are preparing your order, as soon as your package is dispatched, we will send you the invoice and the FedEx air waybill so that you can track it.</p><h3>Thank you very much for trusting Royer</h3></br> <h5>Royer Store</h5><h5>Buenos Aires</h5> <img src="https://res.cloudinary.com/djk4q3tys/image/upload/v1670678797/v18nsd4oxf9oo7nukesw.jpg" alt='Logo'/><br/><a href='https://www.royer.store'>Website</a>`,
    },
    (err: any) => {
      if (err) {
        console.log(err);
        res.send("error" + JSON.stringify(err));
      } else {
        console.log("Email Enviado");
        res.send("sucesso");
      }
    }
  );

  return res.status(200).json({ message: `${req.body.email}` });
};
