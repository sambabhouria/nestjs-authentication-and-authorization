import { Role } from 'src/users/enums';

export class TokenPayloadDto {
  sub: number;
  username: string;
  iat: number; //"iat" (issued at) claim is a timestamp that indicates the time at which the JWT was issued.
  exp: number; // (expiration time) claim is a timestamp that indicates the expiration time of the JWT.
  roles: Role[];
}
