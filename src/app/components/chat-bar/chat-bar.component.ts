// chat-bar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatServiceService } from 'src/app/services/chat.service.service';
import { ChatMessage } from 'src/shared/models/chat-message';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent {
  @Output() messageToSend = new EventEmitter<ChatMessage>();

  public chatMessage = '';
  public errorMessage = '';
  public disableInput = false;

  constructor(
    private userService: UserService,
    private chatService: ChatServiceService
  ) {}

  public addMessage(message: string): void {
    if (!this.userService.userExists()) {
      this.errorMessage = 'Bitte erstellen Sie zuerst einen Benutzer!';
      return;
    }

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

    const createdAt = new Date();
    const username = this.userService.getUsername() || '';
    const content = message;

    const messageToSend: ChatMessage = {message: content, nickname: username, createdAt};
    
    
    this.messageToSend.emit(messageToSend);
    
    
    this.chatService.addToHistory(messageToSend).subscribe(
      (response) => {
        console.log('Nachricht erfolgreich zur History hinzugefügt:', response);
      },
      (error) => {
        console.error('Error Nachricht zur History hinzuzufügen:', error);
      }
    );

    this.chatMessage = '';
  }

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}


