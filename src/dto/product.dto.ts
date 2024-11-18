export interface createProductDto {
    productName: string;
    productDesc: string;
    price: number;
    qty: number;
    image: ProductImageDto;
}

export interface editProductDto {
    id: number;
    productName: string;
    productDesc: string;
    price: number;
    qty: number;
    image?: ProductImageDto;
}

export interface ProductImageDto {
    url: string;
}