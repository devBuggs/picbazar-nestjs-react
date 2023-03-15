import { Injectable } from '@nestjs/common';

@Injectable()
export class WebHookService {
  razorPay() {
    return `this action is for razorpay pay`;
  }
  stripe() {
    return `this action is for stripe pay`;
  }
  paypal() {
    return `this action is for paypal pay`;
  }
}
