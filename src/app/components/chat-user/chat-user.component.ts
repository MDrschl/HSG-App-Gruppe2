import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {
 @Output() userCreated = new EventEmitter<string>();

 public username = '';
  public errorMessage = '';

  public createUser(): void {
    if (this.username.trim() === '') {
      this.errorMessage = 'Bitte fügen Sie einen Benutzer hinzu';
    } else {
      this.errorMessage = '';
      this.userCreated.emit(this.username);
      this.username = '';
    }
  }
}
