export const tokenConfig = {
  secret: process.env.JWT_SECRET!,
  jwtExpiration: 14400,
  refreshExpiration: 2630000,
};
