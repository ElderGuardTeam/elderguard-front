interface Login {
  password: string;
  login: string;
}

interface ResetPassword {
  newPassword: string;
  token: string;
}

interface ChangePassword {
  userId: string;
  newPassword: string;
}