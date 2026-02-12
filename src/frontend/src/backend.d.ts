import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QRCodeData {
    backgroundColor?: string;
    content: string;
    contentType: QRContentType;
    createdAt: Time;
    color?: string;
    size?: bigint;
    lastModified: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum QRContentType {
    sms = "sms",
    url = "url",
    contactInfo = "contactInfo",
    text = "text",
    wifi = "wifi",
    email = "email",
    event = "event",
    phoneNumber = "phoneNumber",
    geoLocation = "geoLocation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserQRCodeHistory(): Promise<Array<QRCodeData>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveQRCode(qrData: QRCodeData): Promise<void>;
}
