import { updateProfileDto } from "../dto/profile.dto";
import { prisma } from "../libs/prisma";

export function findProfile(userId: number) {
    return prisma.profile.findUnique({
        where: {
            userId
        },
        select: {
            username: true,
            address: true,
            gender: true,
            phone: true,
            image: {
                select: {
                    url: true,
                    id: true
                }
            },
            user: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    })
}

export function editProfile(data: updateProfileDto, userId: number) {
    return prisma.profile.update({
        where: {
            userId
        },
        data: {
            username: data.username,
            address: data.address,
            gender: data.gender,
            phone: data.phone
        }
    })
}

export function editProfileImage(id: number, url: string) {
    return prisma.imageProfile.update({
        where: { id },
        data: { url }
    });
}