export interface IQuery {
    _id: string;
    name: string;
    email:string;
    query: string;
    product?: string;
    createdAt: string;
    updatedAt: string;
}