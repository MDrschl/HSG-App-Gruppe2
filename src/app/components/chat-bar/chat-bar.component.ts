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
  public disableInput = false;

  public addMessage(message: string): void {
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
    const messageToSend = `${timestamp} - ${message}<br>`;

    this.messageToSend.emit(messageToSend);
    this.chatMessage = '';
  }

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}