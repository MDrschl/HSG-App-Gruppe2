import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {
  @Output() userCreated = new EventEmitter<string>();

  public username = '';
  public errorMessage = '';
  public disableInput = false;

  public createUser(): void {
    if (this.username.trim() === '') {
      this.errorMessage = 'Bitte fügen Sie einen Benutzer hinzu';
    } else if (this.username.length > 12) {
      this.errorMessage = 'Warnung: Der Benutzername überschreitet 12 Zeichen!';
      this.disableInput = true;
    } else {
      this.errorMessage = '';
      this.userCreated.emit(this.username);
      this.username = '';
      this.disableInput = false;
    }
  }

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}
