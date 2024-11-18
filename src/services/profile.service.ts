import { Gender } from "@prisma/client";
import { updateProfileDto } from "../dto/profile.dto";
import * as profileRepo from "../repositories/profile.repository";

export async function findProfileByUserId(userId: number) {
    const profile = await profileRepo.findProfile(userId);
    if (!profile) {
        throw new Error("Profile not found");
    }
    return profile
}


export async function updateProfie(data: updateProfileDto, userId: number) {
    const profile = await profileRepo.findProfile(userId);
    if (!profile) {
        throw new Error("Profile not found");
    }
    const updatedData = {
        id: data.id,
        username: data.username == "" ? profile.username : data.username,
        address: data.address == "" ? profile.address : data.address,
        gender: (data.gender !== undefined ? data.gender : profile.gender) as Gender | null,
        phone: data.phone !== undefined ? Number(data.phone) : Number(profile.phone)
    }
    if (data.image && profile.image?.id !== undefined) {
        await profileRepo.editProfileImage(profile.image?.id, data.image.url);
    }
    const updatedProfile = await profileRepo.editProfile(updatedData, userId);
    if (!updatedProfile) {
        throw new Error("Profile not updated");
    }
    return updatedProfile
}