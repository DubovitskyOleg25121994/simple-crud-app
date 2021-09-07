import { config } from 'dotenv';

config();

export const PORT: number = Number(process.env.PORT);

export const MONGO_URL: string = process.env.MONGO_URL as string;
