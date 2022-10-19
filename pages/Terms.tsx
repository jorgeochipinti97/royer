import React from 'react'
import { Box, Divider, Typography } from "@mui/material"
import { ShopLayout } from "../components/layouts";
import QuizIcon from '@mui/icons-material/Quiz';
import { AccordionFaqs } from "../components/ui"

const Terms = () => {
    return (
        <>
            <ShopLayout title='Terms Of Service' pageDescription="faqs">
                <Box sx={{ width: '100vw !important' }}>

                    <Box display='flex' justifyContent='center' sx={{ mb: 2 }}>
                        <div data-aos="fade-up">
                            <Box display='flex'>
                                <QuizIcon />
                                <Typography variant='h1' sx={{ ml: 2 }}>Terms Of Service</Typography>
                            </Box>
                        </div>
                    </Box>
                    <Box>

                        <div data-aos="fade-up-right">
                            <AccordionFaqs pregunta="General conditions" respuesta='Please read these Terms and Conditions of Use (hereinafter "Terms and Conditions") carefully before using this site. By using this website you acknowledge and agree to abide by all of the above. If you do not accept them, do not use the website, or purchase or download any material. The RoyerStore operation is located in Argentina, Buenos Aires.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>

                    </Box>
                    <Box>

                        <div data-aos="fade-up-left">
                            <AccordionFaqs pregunta="Products" respuesta='The information and photos of the products that appear in RoyerStore are referential, assuming that they are the best approximation of the final product. RoyerStore is not responsible for erroneous interpretations of the information published in the store that result in wrong decisions when buying, nor for the usefulness or adaptation of the product to the specific needs of the buyer, being the sole responsibility of the buyer to be informed about of adapting the product to your needs.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>
                    </Box>
                    <Box>

                        <div data-aos="fade-up-right">
                            <AccordionFaqs pregunta="Payment Methods" respuesta='Payment method RoyerStore accepts international cards, as well as PayPal, Cryptocurrencies and AIRTM.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>

                    </Box>
                    <Box>

                        <div data-aos="fade-up-left">
                            <AccordionFaqs pregunta="Shipments" respuesta='Shipments are free and times may vary depending on the country where the customer is and the product purchased. It is the customer s responsibility to be in order with Customs, comply with all provisions and check the franchises/quotas that have been used up to now before making a next purchase. In case of not complying with the Customs provisions, the merchandise may be retained and the client must manage the withdrawal or total loss of the order. RoyerStore does not carry out any Customs procedures, but these are managed directly by authorized couriers and/or dispatchers.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>

                    </Box>
                    <Box>

                        <div data-aos="fade-up-right">
                            <AccordionFaqs pregunta="Refund" respuesta='Due to different customs regulation in each country, there are no refunds.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>

                    </Box>
                    <Box>

                        <div data-aos="fade-up-left">
                            <AccordionFaqs pregunta="Privacy Policy" respuesta='We do not share information about our customers without prior authorization. This includes exchange of information between companies or organizations.' />
                            <Divider sx={{ my: 1, m: 2 }} />
                        </div>

                    </Box>


                </Box>
            </ShopLayout>
        </>
    )
}

export default Terms