import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent {
  @Output() messageToSend = new EventEmitter<string>();

  public chatMessage = '';
  public errorMessage = '';

  public addMessage(message: string): void {
    message = message.replace(/(\r\n|\r|\n)/, '');
    message = message.trim();

    if (!message) {
      this.errorMessage = 'Bitte fügen Sie eine Nachricht hinzu!';
      this.chatMessage = '';

      return;
    }

    const timestamp = new Date().toLocaleString('de');
    const messageToSend = `${timestamp} - ${message}<br>`;

    this.messageToSend.emit(messageToSend);
    this.chatMessage = '';
    this.errorMessage = '';
  }
}