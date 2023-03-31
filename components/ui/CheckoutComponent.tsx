import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IOrder } from "../../interfaces/order";
import { useRouter } from "next/router";

interface Props {
  amount: number;
  order: IOrder;
}

export const CheckoutComponent = ({ amount, order }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();

  const createPayment = async () => {
    try {
      setIsPaying(true);
      const res = await axios.post("/api/intent", {
        amount: amount * 100,
        description: `pago de ${amount} en royer`,
      });
      const data = res.data;
      confirmPayment(data.client_secret);
    } catch (error: any) {
      console.error(error);
    }
  };

  const confirmPayment = async (paymentIntentClientSecret: string) => {
    try {
      if (stripe) {
        const { token } = await stripe?.createToken(
          elements?.getElement(CardElement)!
        );

        const result = await stripe?.confirmCardPayment(
          paymentIntentClientSecret,
          {
            payment_method: {
              card: elements?.getElement(CardElement)!,
              billing_details: {
                name: name,
                email: email,
              },
            },
          }
        );

        result.error && alert(result.error!.message);
        result.error && router.push(`/orders/${order._id}`);
        const updateOrder_ = await axios.put("/api/orders", {
          ...order,
          isPaid: result.paymentIntent?.status == "succeeded" && true,
          transactionId:
            result.paymentIntent?.status == "succeeded" &&
            result.paymentIntent?.id,
        });

        updateOrder_.status == 200 && router.push(`/orders/${order._id}`);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Card>
      <CardContent>
        <TextField
          sx={{ my: 2 }}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ my: 2 }}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Box sx={{ my: 2 }}>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={createPayment}
            variant="contained"
            color="primary"
            disabled={!stripe}
          >
            {"Pagar"}
          </Button>
        </Box>
        {isPaying && (
          <Box sx={{ my: 5 }} display="flex" justifyContent="center">
            <Box sx={{ mx: 2 }}>
              <Box display="flex" justifyContent="center">
                <CircularProgress thickness={2} />
              </Box>
              <Box>
                <Typography variant="body1">Please wait!</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
