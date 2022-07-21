import { tesloApi } from '../../../api';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { IQuery } from '../../../interfaces/queries';
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardActionArea, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Queries = () => {
    const [queries, setQueries] = useState<IQuery[]>()
    const getQueries = async () => {
        const res = await tesloApi.get('/queries')
        setQueries(res.data)
    }
    useEffect(() => {
        getQueries()
    }, [])

    useEffect(()=>{
        getQueries()
    },[queries])

    const deleteQuery = async (query: any) => {
        try {
            await tesloApi({
                url: '/queries',
                method: 'DELETE',
                data: query
            });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AdminLayout title='Queries' subTitle='Una vez resuelta no olvides eliminarla'>
            <Grid container spacing={2}>
                {queries != undefined && queries.length != 0 ?
                    queries.map(query_ => (
                        <Card key={query_.name} sx={{ p: 3, m: 3, mt:5}} >
                            <Box>
                                <Typography variant='h6'>{query_.product}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                <Typography>{query_.name}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                <Typography>{query_.email}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                <Typography>{query_.query}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                <Typography>{query_.createdAt}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='end'>
                                <Button
                                sx={{mt:2}}
                                    startIcon={<DeleteForeverIcon />}
                                    color='error'
                                    onClick={() => deleteQuery(query_)}
                                >Eliminar consulta</Button>
                            </Box>
                        </Card>
                    ))
                    : (
                        <Box  sx={{mt:10}}>
                            <Typography variant='h4'> No hay consultas pendientes</Typography>
                        </Box>
                    )
                }
            </Grid>
            
        </AdminLayout>
    )
}




export default Queries

