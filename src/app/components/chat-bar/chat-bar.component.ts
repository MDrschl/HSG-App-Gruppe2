// chat-bar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent {
  @Output() messageToSend = new EventEmitter<Message>();

  public chatMessage = '';
  public errorMessage = '';
  public disableInput = false;

  constructor(private userService: UserService) {}

  public addMessage(message: string): void {
    if (!this.userService.userExists()) {
      this.errorMessage = 'Bitte erstellen Sie zuerst einen Benutzer!';
      return;
    }

    message = message.replace(/(\r\n|\r|\n)/, '');
    message = message.trim();

    if (!message) {
      this.errorMessage = 'Bitte fügen Sie eine Nachricht hinzu!';
      return;
    }

    if (message.length > 500) {
      this.errorMessage = 'Warnung: Die Nachricht überschreitet 500 Zeichen!';
      this.disableInput = true;
      return;
    } else {
      this.errorMessage = '';
      this.disableInput = false;
    }
    
    const timestamp = new Date().toLocaleString('de');
    const username = this.userService.getUsername() || '';
    const content = message;

    const messageToSend: Message = { timestamp, username, content };
    this.messageToSend.emit(messageToSend);
    this.chatMessage = '';
  }

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}

interface Message {
  timestamp: string;
  username: string;
  content: string;
}
