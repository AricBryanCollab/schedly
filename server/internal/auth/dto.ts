export class SignInData {
  email!: string;
  password!: string;
}

export class SignUpData {
  username!: string;
  email!: string;
  password!: string;
  confirmPassword?: string;
  salt!: string;
  profilePicURL?: string;
}

export class OAuthData {
  username!: string;
  email!: string;
  profilePicURL?: string;
  provider!: string;
  oAuthAccountId!: string;
}
