export interface IDiscount {
    _id?: string | undefined
    name: string;
    percentage: number;
    discountCode?: string;
    createdAt?: string;
    updatedAt?: string;
}