import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI!;


export const SITE_COLLECTION = "media";
export const SITE_DOC_ID = "main";


export const ADMIN_COLLECTION = "admin";
export const ADMIN_DOC_ID = "main";

let cached: { client: MongoClient; db: Db } | null = null;

export async function getDb(): Promise<Db> {
  if (cached) return cached.db;
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db();
  cached = { client, db };
  return db;
}