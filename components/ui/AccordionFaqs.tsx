import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useState } from 'react';
import QuizIcon from '@mui/icons-material/Quiz';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    pregunta: string,
    respuesta: string,
}
export const AccordionFaqs: FC<Props> = ({ pregunta, respuesta }) => {
    const [openFedex, setOpenFedex] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpenFedex = () => setOpenFedex(true);
    const handleOpen = () => setOpen(true);
    const handleCloseFedex = () => setOpenFedex(false);
    const handleClose = () => setOpen(false);
    return (
        <>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant='h2' sx={{ fontWeight: 600 }}>{pregunta}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                        {respuesta}
                    </Typography>
                    {pregunta == 'How to track my order in real time?' && (
                        <>
                            <Box display='flex' justifyContent='space-around' sx={{ mt: 5 }}>
                                <Button onClick={() => handleOpenFedex()}>
                                    <Box sx={{ m: 1 }}>
                                        <Image src='/fedex.jpeg' width={150} height={100} />
                                    </Box>
                                </Button>

                                <Button onClick={() => handleOpen()}>
                                    <Box sx={{ m: 1 }}>
                                        <Image src='/dhl.jpg' width={150} height={100} />
                                    </Box>
                                </Button>
                            </Box>

                            <Modal
                                open={open}
                                onClose={handleClose}
           
                            >
                                <Box sx={style}>
                                    <Image src='/guia.jpg' width={500} height={500} />

                                </Box>
                            </Modal>
                            <Modal
                                open={openFedex}
                                onClose={handleCloseFedex}
   
                            >
                                <Box sx={style}>
                                    <Image src='/guia_fedex.jpg' width={500} height={500} />

                                </Box>
                            </Modal>
                        </>
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

