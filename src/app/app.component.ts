import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChatApp';
  messageHistory = '';
  currentUser = '';

  public messageSubmitted(message: string): void {
    this.messageHistory += message;
  }

  public userCreated(usrename: string): void{
    this.currentUser = usrename;
  }
}