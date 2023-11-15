import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChatApp';
  messageHistory = '';

  public messageSubmitted(message: string): void {
    this.messageHistory += message;
  }
}