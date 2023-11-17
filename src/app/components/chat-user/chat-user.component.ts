import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service'; // Passe den Pfad entsprechend an

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
})
export class ChatUserComponent {
  @Output() userCreated = new EventEmitter<string>();

  public username = '';
  public errorMessage = '';
  public disableInput = false;

  private createdUsernames: string[] = [];

  constructor(private userService: UserService) {}

  public createUser(): void {
    const trimmedUsername = this.username.trim();

    if (trimmedUsername === '') {
      this.errorMessage = 'Bitte fügen Sie einen Benutzer hinzu';
    } else if (trimmedUsername.length > 12) {
      this.errorMessage = 'Warnung: Der Benutzername überschreitet 12 Zeichen!';
      this.disableInput = true;
    } else if (trimmedUsername.includes(' ')) {
      this.errorMessage = 'Der Benutzername darf keine Leerzeichen enthalten.';
    } else {
      this.errorMessage = '';
      this.userCreated.emit(trimmedUsername + '\n');
      this.createdUsernames.push(trimmedUsername);
      this.userService.setUsername(trimmedUsername);
      this.username = '';
      this.disableInput = false;
    }
  }


  // else if (this.createdUsernames.includes(trimmedUsername)) {
  // this.errorMessage = 'Dieser Benutzername ist bereits vorhanden.';

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}
