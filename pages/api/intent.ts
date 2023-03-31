import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
  try {

    if (req.method == 'POST') {
      const body = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: 'usd',
        payment_method_types: ['card'],
        description: body.description
      })
      return res.status(200).json(paymentIntent)
    }
  } catch (error: any) {
    console.log(error)
    res.status(402).json(error)
  }

}
