export class UserWithoutPassword {
  readonly id: string;
  email: string;
  refresh_token_hash: string;
  device_token: string;
  last_login: Date;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
