import { ShopLayout } from "../../components/layouts"
import { AccordionFaqs } from "../../components/ui"
import { Box, Divider, Typography } from "@mui/material"
import QuizIcon from '@mui/icons-material/Quiz';
const index = () => {
    return (
        <>
            <ShopLayout title='FAQS' pageDescription="faqs">
                <Box display='flex' justifyContent='center'>

                    <Box sx={{ width: '100vw !important' }}>

                        <Box display='flex' justifyContent='center' sx={{ mb: 2 }}>
                            <div data-aos="fade-up">
                                <Box display='flex'>
                                    <QuizIcon />
                                    <Typography variant='h1' sx={{ ml: 2 }}>FAQS</Typography>
                                </Box>
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-right">
                                <AccordionFaqs pregunta="How are shipments made?" respuesta='Shipments are made by DHL or FedEx depending on the most convenient company to ship in your area.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>

                        </Box>
                        <Box>

                            <div data-aos="fade-up-left">
                                <AccordionFaqs pregunta="Are the items refundable?" respuesta='Due to different customs regulation in each country, there are no refunds.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-right">
                                <AccordionFaqs pregunta="How long does it take for my order to arrive?" respuesta='Your order can take between 10 and 21 days depending on the country you are in.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-right">
                                <AccordionFaqs pregunta="Can I cancel my order?" respuesta='Yes, cancellations can only take place within 24 hours of the purchase. A fee of 15% of the purchase should be paid.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-left">

                                <AccordionFaqs pregunta="What are the means of payment?" respuesta='We accept payments through Paypal and remember that by paying with cryptocurrencies you have a 10% discount on all purchases.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-right">
                                <AccordionFaqs pregunta="Can I change the delivery address of my package?" respuesta='Unfortunately, the address cannot be changed once the shipment has been dispatched.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>  
                        <Box>

                            <div data-aos="fade-up-left">
                                <AccordionFaqs pregunta="Where do I receive my order?" respuesta='Your order will be taken to your home or place that you indicate with the address at the time of purchase.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>
                        <Box>

                            <div data-aos="fade-up-right">
                                <AccordionFaqs pregunta="How to track my order in real time?" respuesta='For real-time tracking, enter the air waybill number received in your email on the FedEx or DHL website depending on the company delivering your order.' />
                                <Divider sx={{ my: 1, m: 2 }} />
                            </div>
                        </Box>

                    </Box>
                </Box>
            </ShopLayout>
        </>
    )
}

export default index