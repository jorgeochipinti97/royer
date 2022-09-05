import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");

type Data = any


interface IEmail {
    name: string
    email: string
    consulta: string
    product: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return sendEmail_(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const sendEmail_ = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: 'royerstorearg@gmail.com',
            pass: `ksnddqttbntnujrp`
        }
    })

    transporter.sendMail({
        from: '"Royer - Store <royerstorearg@gmail.com>',
        to: "jorgeochipinti97@gmail.com, felanese1996@gmail.com, maurobelli22@gmail.com, gastonezruiz@gmail.com, gerzovichsabrina@gmail.com",
        subject: `Royer - Consulta ${req.body.product}`,
        text: ``,
        html: `<h2>${req.body.name}</h2><br/><p>${req.body.email}</p><br/><h3>${req.body.product}</h3><br/><p>${req.body.consulta}</p>`,
    }, (err: any) => {
        if (err) {
            console.log(err);
            res.send("error" + JSON.stringify(err));
        } else {
            console.log("Email Enviado");
            res.send("sucesso");
        }
    })


    return res.status(200).json({ message: 'enviado' });

}
