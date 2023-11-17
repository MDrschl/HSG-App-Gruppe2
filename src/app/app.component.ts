import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChatApp';
  messageHistory: Message[] = [];
  userHistory: string[] = [];

  messageSubmitted(message: Message): void {
    this.messageHistory.push(message);
    console.log('Message History:', this.messageHistory);
  }

  userSubmitted(username: string): void {
    this.userHistory.push(username);
  }
}

interface Message {
  timestamp: string;
  username: string;
  content: string;
}
