import { NextRequest, NextResponse } from "next/server";
import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
    data: {
        title: string;
        body: string;
        image: string;
        icon:string;
        click_action: string;
    },
    token: string
}

const sendFCMNotification = async (data: NotificationData) => {
    const serviceAccount: ServiceAccount = {
        projectId: 'test3-cd890',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLoMgJ6NREvtSh\nIWugwnCiwQuswvVkMn03WP8JFA3tu1+yqPp/EWFPnclv78k5GYBhDrfncIlfWbmw\nEjLI3GpVcSzgfcaVaDVHGavpLsfDovRG28Mosw9rfdKreQQVcgmAuffGQTEL2G7c\nGDcxkYIyC09xFYB+hwqvhz7B0UQrVS/091RvoDeMJvkIw1k4W1OiPC9GYcH++wlS\nvrL2InqyEav4EUfyt7ldzFE7deeBZ/KzAK/CDXgrCzjPjr1kSGwPUgA9kxvz4sV9\nFk1cYLU9GA4ehAlXa6HIZhnvI8yJmUwlOgZsqw7bSJOmdeidfMjwCfW8v7qk1msR\nPdP2JgeFAgMBAAECggEARkFpcz3RKwzaSOPCghtECGtpj0hOqSzgVf3PNH8mVR0e\nZgJ2Nuw0smcCzquhNiGt0Q7mdaQ2yV6oOe71dabSyzr6nFPY9ciYBTl+vjvlMYMi\nG+aL3Zl2GwS08HOW7J1FWRQQwGbSuL8KdMaoGGKXVJPha2dbR4xpK+mSRgXhKr+h\n7MM9aFSWiHccCSZwYrANXUmiCZH1fzTXa0/56I8vBT1ZmiVfHOVTVRe4Q1if4u4o\nJoEr82TsAQu0khQgPKvPgAgxrpJ1EWiILSQAFufilppt34/J8g29K4j8srpYrG6I\nW39zoSOz0Ix3EWvbcY5WWVYLIbhVVei+yqju7X/ySwKBgQD4KY9jCQxP/NF9rnbA\npKukurXY+x17dQGQg2WHD7mIJoziHpic610O2ZEn6/g3JelmWc5ql5jp7if370hm\nOubNxHucdcUvDjd06I/OGskmQD1zeovoWc0eKgk7hquNqfaFH6FxwNcSeSquQCvo\nPFrm7gegiOqbT0PZMZDTq7M4TwKBgQDSDycuWxSlEqE2ZpssdYsDAOtW9yE2KQjV\ngSDJfGpYQoBEawAcqr/OP6e3F1BpMFGSbSQ55PVqFRtMz8KHrWQ4aoH0upWzS0Na\nQKnrhVGNEZ4fu4cfG4ArZaOwWV24VE8bY/+PrWRx/W4TKb3aHmqNVMKr4kWF+UtZ\nO4O/57x56wKBgGUPf74kFCiK28FkCCZhqSjXhHDNqu748l8os3LyO2svz9XSAfJ9\ngxMmFQ/978J9pPQyhHYyMGqruwkkIAbJ2+5WIsTPzTJhhsIMZ2vWyq3SIXRippFD\n6N1s3v+n0ztIyQTjobqSfsOeJnx506eq1JYQv3hn6aq/9/B+V+1rkfvPAoGBAMNr\nyX28ymYQAN8FchNYfy0aK9dKLiGe51MJwKDyGFVn+MCt8vq4d5y/Z55UGEDj7N+W\nnf8mXJKGdFFvb4Cd9QDvRVuSQjb9K/nI8svjycy9uSe4ZKqyAPleo3wqh6A2/yly\nTI00OKA7r64wRSmo5mP5mOojpZ5QIKMxVQ6x3oxlAoGBAJ2Zfnhv7sOdalDjVp3g\n6hSW6oKBCu7NfNO2gcDO7EkRO9Lrbsutq9omWAMN8mnnfmsXrfFCxXcEcstUPCBo\nuTbc9qqizwy1yAfMW6cZocxBt9wffaXVd4xCGtXr3VfjaK8Kc1vCX3cJqc9t9/P3\nCNYH3SMZbPOa6mO4kfcX/73n\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-pjsnf@test3-cd890.iam.gserviceaccount.com",
    };

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    const res = await admin.messaging().send(data);
    return res;
};

export async function POST(req: NextRequest) {  
    const { message } = await req.json();
    const fcmNoti = await sendFCMNotification(message);
    return NextResponse.json([]);
};
