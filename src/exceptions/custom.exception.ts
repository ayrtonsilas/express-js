export default class CustomException extends Error {  
    private status: number;

    constructor (message: string, status: number) {
    
      super(message)
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
      this.status = status;
    }
  
    getStatusCode() {
      return this.status;
    }

    toResponse(){
      return {
        message: this.message,
        status: this.getStatusCode()
      }
    }
}