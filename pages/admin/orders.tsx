import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { tesloApi } from '../../api';

import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces';


const handleShipping = async (orderId: string) => {
    const orders = await tesloApi.get('/orders')

    const a: IOrder[] = orders.data

    const b = a.filter(e => e._id == orderId)

    const c = b.map(async e => {
        const order_ = {
            _id: e._id,
            isShipping: true
        }

        await tesloApi({
            url: '/orders',
            method: 'PUT',
            data: order_
        })

    })
    window.location.reload()

}
const handlePay = async (orderId: string) => {
    const orders = await tesloApi.get('/orders')

    const a: IOrder[] = orders.data

    const b = a.filter(e => e._id == orderId)

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
        window.location.reload()
    })
}



const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 250 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer" >
                    Ver orden
                </a>
            )
        }
    },
    { field: 'total', headerName: 'Monto total', width: 100, align: 'center' },
    {
        field: 'isPaid',
        headerName: 'Pago',
        width: 150,
        align: 'center',
        renderCell: ({ row }: GridValueGetterParams) => {
            return row.isPaid
                ? (<Chip variant='outlined' label="Paga" color="success" />)
                : (<Button color='success' onClick={() => handlePay(row.id)}>Poner como paga</Button>)
        }
    },
    { field: 'transtactionId', headerName: 'Transaction ID', align: 'center', width: 150 },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    {
        field: 'isShipping',
        headerName: 'Shipping',
        align: 'center',
        width: 250,
        renderCell: ({ row }: GridValueGetterParams) => {
            return row.isShipping
                ? (<Chip variant='outlined' label="enviado" color="success" />)
                : (<Button color='success' onClick={() => handleShipping(row.id)}>Poner como enviado</Button>)
        }
    },

    { field: 'createdAt', headerName: 'Creada en', width: 300, align: 'center' },

];




const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return (<></>);
    console.log(data)
    // TODO : poder ver que usuario compro que cosa




    const rows = data!.map(order => ({
        id: order._id,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        transtactionId: order.transactionId,
        orderItems: order.orderItems.map(e => e.title),
        createdAt: new Date(order.createdAt!).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' }),
        isShipping: order.isShipping,
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