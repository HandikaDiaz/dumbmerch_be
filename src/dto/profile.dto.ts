import { Gender } from '@prisma/client'

export interface updateProfileDto {
    id: number;
    username: string
    address: string | null
    gender?: Gender | null
    phone: number | null
    image?: ProfileImageDto
}

export interface ProfileImageDto {
    url: string;
}