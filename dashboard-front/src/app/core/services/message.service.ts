import { Injectable } from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private notificationService: NotificationsService) {
}

  success(text) {
    this.notificationService.success('Succès', text, {
      timeOut: 3000,
      position: ['top', 'right'],
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
  danger(text) {
    this.notificationService.error('Attention', text, {
      timeOut: 3000,
      position: ['top', 'right'],
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
  warning(text) {
    this.notificationService.warn('Attention', text, {
      timeOut: 3000,
      position: ['top', 'right'],
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

}
