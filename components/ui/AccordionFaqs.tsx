import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from 'react';
import QuizIcon from '@mui/icons-material/Quiz';


interface Props{
pregunta:string,
respuesta:string
}
export const AccordionFaqs:FC<Props> = ({pregunta, respuesta}) => {
    return (
        <>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant='h2' sx={{fontWeight: 600}}>{pregunta}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                       {respuesta}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

