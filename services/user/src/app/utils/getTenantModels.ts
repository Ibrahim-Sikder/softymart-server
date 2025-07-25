import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { userSchema } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Tenant, tenantSchema } from '../tenant/tenant.model';
import { connectToTenantDatabase } from '../../server';
import {  subscriptionSchema } from '../subscription/subscription.model';

type SchemaMap = {
  [key: string]: mongoose.Schema;
};

const schemas: SchemaMap = {
  User: userSchema,
  Tenant: tenantSchema,
  SubscriptionModel: subscriptionSchema,
};

export const getTenantModel = async (
  tenantDomain: string,
  modelName: keyof typeof schemas,
) => {
  const tenant = await Tenant.findOne({
    domain: { $regex: new RegExp(`^${tenantDomain}$`, 'i') },
  });

  if (!tenant || !tenant.isActive) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant not found or inactive');
  }

  const tenantConnection = await connectToTenantDatabase(
    tenant._id.toString(),
    tenant.dbUri,
  );

  const schema = schemas[modelName];
  if (!schema) {
    throw new Error(`Schema not found for model: ${modelName}`);
  }

  const modelNameStr = String(modelName);
  const Model =
    tenantConnection.models[modelNameStr] ||
    tenantConnection.model(modelNameStr, schema);

  // Add connection to the returned object here
  return { Model, tenant, connection: tenantConnection };
};
