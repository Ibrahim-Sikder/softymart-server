import mongoose, { Connection } from 'mongoose';

// টেন্যান্ট ভিত্তিক কানেকশন ক্যাশ
const tenantConnections: Record<string, Connection> = {};

/**
 * টেন্যান্টের ডাটাবেজ URI দিয়ে ডাইনামিক MongoDB কানেকশন তৈরি বা রিটার্ন করবে।
 */
export async function getTenantConnection(dbUri: string): Promise<Connection> {
  // যদি আগেই কানেকশন তৈরি হয়ে থাকে → সেটাই রিটার্ন করবো
  if (tenantConnections[dbUri]) {
    return tenantConnections[dbUri];
  }

  // নতুন কানেকশন তৈরি করা
  const connection = await mongoose.createConnection(dbUri).asPromise();

  // ক্যাশে সেভ করা
  tenantConnections[dbUri] = connection;
  console.log(`✅ Tenant DB Connected: ${dbUri}`);

  return connection;
}
