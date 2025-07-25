import jwt, { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string; name: string },
  secret: Secret,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
