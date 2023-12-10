import { Component } from '@angular/core';
import { ChatMessage } from 'src/shared/models/chat-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChatApp';
  messageHistory: ChatMessage[] = [];
  userHistory: string[] = [];

  messageSubmitted(message: ChatMessage): void {
    this.messageHistory.push(message);
    console.log('Message History:', this.messageHistory);
  }

  userSubmitted(username: string): void {
    if (username.trim() !== '') {
      if (this.userHistory.length === 0) {
        this.userHistory.push(username);
      } else {
        this.userHistory[0] = username;
      }
    }
  }
}



