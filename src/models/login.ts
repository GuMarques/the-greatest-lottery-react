export default class Login {
  email: string;
  password: string;

  constructor(emailText: string, passwordText: string) {
    this.email = emailText;
    this.password = passwordText;
  }
}