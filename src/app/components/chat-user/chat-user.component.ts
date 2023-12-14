import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatServiceService } from 'src/app/services/chat.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
})
export class ChatUserComponent {
  @Output() userCreated = new EventEmitter<string>();
  private nicknamesSubscription: Subscription | undefined;
  public allNicknames: string[] = [];


  ngOnInit(): void {
    this.nicknamesSubscription = this.chatService.getAllNicknames().subscribe(
      nicknames => {
        this.allNicknames = nicknames;
      },
      error => {
        console.error('Error fetching nicknames:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.nicknamesSubscription) {
      this.nicknamesSubscription.unsubscribe();
    }
  }

  isNameInAllUsernames(name: string): boolean {
    return this.allNicknames.includes(name);
  }
  public username = '';
  public errorMessage = '';
  public disableInput = false;

  private createdUsernames: string[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatServiceService) {}

  public createUser(): void {
    const trimmedUsername = this.username.trim();
    if (trimmedUsername === '') {
      this.errorMessage = 'Bitte fügen Sie einen Benutzer hinzu.';
    }else if (trimmedUsername.length > 12) {
      this.errorMessage = 'Warnung: Der Benutzername überschreitet 12 Zeichen!';
      this.disableInput = true;
    } else if(this.allNicknames.includes(trimmedUsername)){
      this.errorMessage = 'Warnung: Der Benutzername ist bereits vorhanden!';
    }
    else if (trimmedUsername.includes(' ')) {
      this.errorMessage = 'Der Benutzername darf keine Leerzeichen enthalten.';
    }else {
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
