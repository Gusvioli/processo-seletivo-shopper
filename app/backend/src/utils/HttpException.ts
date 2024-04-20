class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export default HttpException;

