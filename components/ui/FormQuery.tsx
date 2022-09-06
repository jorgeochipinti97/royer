import { Box, Typography, TextField, Button } from "@mui/material"
import { FC, useState } from "react"
import { tesloApi } from "../../api"
import { isValidEmail } from "../../utils/validations"


interface Props {
    product_: string
}

interface IEmail {
    name: string
    email: string
    consulta: string
    product: string
}

const FormQuery: FC<Props> = ({ product_ }) => {

    const [email_, setEmail_] = useState<string>('')
    const [name_, setName_] = useState<string>('')
    const [query_, setQuery_] = useState<string>('')

    const handleClickQuery = async (name: string, email: string, query: string, product: string | '', e: any) => {
        try {
            e.preventDefault();
            const emailQuerys: IEmail = {
                name,
                email,
                consulta: query,
                product,
            }
            let response = await fetch("/api/nodemailer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(emailQuerys),

            });

            alert('Message sent')
        } catch (err) {
            alert('please write a correct email please')
            console.log(err)
        }
    }

    return (
        <Box >
            <div data-aos="zoom-in-down">
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Typography variant='h6'>Any questions ? Contact us!</Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Box display='flex' justifyContent='space-around' flexDirection='column' >
                        <TextField label="name" variant="filled" sx={{ m: 1, width: 250 }} onChange={e => setName_(e.target.value)} />
                        <TextField label="email" variant="filled" sx={{ m: 1, width: 250 }} onChange={e => setEmail_(e.target.value)} />
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
                    <TextField label="question" variant="filled" multiline rows={4} sx={{ width: 300 }} onChange={e => setQuery_(e.target.value)} />
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                    <Button color='secondary' size='large'
                        onClick={(e) => handleClickQuery(name_, email_, query_, product_, e)}
                    >Send</Button>
                </Box>
            </div>
        </Box>
    )
}

export default FormQuery