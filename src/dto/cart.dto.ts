import { CartStatus } from '@prisma/client'

export interface CartDto {
    id: number;
    status: CartStatus;
    createdAt: Date;
    userId: number;
} 
