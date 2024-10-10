import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1y",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    console.log({ token, envKey: process.env.JWT_SECRET_KEY });

    const secret_key = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    console.log({ secret_key, decoded });

    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
