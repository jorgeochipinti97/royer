export interface IOrderCrypto {

    _id?: string;
    _idOrder: string;
    total: number;
    isPaid: boolean;
    transactionId?: string;
    isSend:boolean;
    crypto?:string;
    wallet?: string;
    amount?:number;
    createdAt?: string;
    updatedAt?: string;
}
