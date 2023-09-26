interface IErrorWithCode {
  code: number;
}

class ErrorWithCode extends Error implements IErrorWithCode {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default ErrorWithCode;
