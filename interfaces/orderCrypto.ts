export interface IOrderCrypto {

    _id?: string;
    _idOrder: string;
    total: number;
    isPaid: boolean;
    transactionId?: string;


    createdAt?: string;
    updatedAt?: string;
}
