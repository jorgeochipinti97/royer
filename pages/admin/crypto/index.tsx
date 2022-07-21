import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Button, Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { tesloApi } from '../../../api';
import { AdminLayout } from '../../../components/layouts'
import { IOrder, IOrderCrypto } from '../../../interfaces';
import { useRouter } from 'next/router';


const OrdersPage = () => {
    const router = useRouter();
    const handleClick = async (idOrders: string, _idCripto: string) => {

        const orders = await tesloApi.get('/orders')

        const a: IOrder[] = orders.data

        const b = a.filter(e => e._id == idOrders)

        const c = b.map(async e => {
            const order_ = {
                _id: e._id,
                isPaid: true
            }

           await tesloApi({
                url: '/orders',
                method: 'PUT',
                data: order_
            })

        })

       await tesloApi({
            url: '/cripto',
            method: 'PUT',
            data: {
                _id: _idCripto,
                isPaid: true
            }
        })

     router.reload()

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Orden ID', width: 250 },
        {
            field: 'idOrder',
            headerName: 'Ver orden de Productos',align:'center',
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <a href={`/admin/orders/${row.idOrder}`} target="_blank" rel="noreferrer" >
                        Ver orden
                    </a>
                )
            }
        },
        { field: 'total', headerName: 'Monto total', width: 250 ,align:'center'},
        { field: 'transactionId', headerName: 'hash', width: 300,align:'center' },
        { field: 'wallet', headerName: 'wallet', width: 300,align:'center' },
        { field: 'crypto', headerName: 'crypto', width: 100 ,align:'center'},
        {
            field: 'checkPaid',
            headerName: 'Pago',
            width: 140,
            align:'center',
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.isPaid
                ?(<Chip variant='outlined' label="Paga" color="success" />)
                :(<Button color='success' onClick={() => handleClick(row.idOrder, row.id)}>Poner como paga</Button>)
            }
        },
        { field: 'createdAt', headerName: 'Creada en', width: 300 },


    ];

    const { data, error } = useSWR<IOrderCrypto[]>('/api/cripto');

    if (!data && !error) return (<></>);

    console.log(data)

    const rows = data!.map(order => ({
        id: order._id,
        idOrder: order._idOrder,
        total: order.amount,
        transactionId: order.transactionId,
        wallet: order.wallet,
        crypto: order.crypto,
        isPaid: order.isPaid,
        createdAt: order.createdAt,
    }));

    return (

        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimiento de ordenes'}
            icon={<ConfirmationNumberOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
}

export default OrdersPage

