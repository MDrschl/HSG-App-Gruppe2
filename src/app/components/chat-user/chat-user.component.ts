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
      
      // Regel 1: Mindestens 5 Zeichen
      const hasMinLength = trimmedUsername.length >= 5;
      // Regel 2: Mindestens 1 Zahl
      const hasNumber = /\d/.test(trimmedUsername);
      // Regel 3: Mindestens einen Großbuchstaben
      const hasUpperCase = /[A-Z]/.test(trimmedUsername);
      // Regel 4: Die Ziffern der Zahl müssen sich auf 20 aufaddieren
      const sumToTwenty = trimmedUsername.split('').reduce((sum, char) => {
          return sum + (parseInt(char) || 0);
      }, 0) === 20;
      // Regel 5: Der Benutzername muss mindestens einen Namen der Entwickler enthalten
      const developers = ['Berit', 'Philipp', 'Max', 'Maximilian', 'Nicolas', 'Apisan', 'Joel'];
      const includesDeveloperName = developers.some(name => trimmedUsername.includes(name));
      // Regel 6: Der Benutzername muss mindestens einen Sponsor enthalten
      const sponsors = ['HSG', 'Angular', 'Scrum'];
      const includesSponsor = sponsors.some(sponsor => trimmedUsername.includes(sponsor));
      // Neue Regel 7: Der Benutzername muss das Wort "TeamSprint" enthalten
      const includesTeamSprint = trimmedUsername.includes('TeamSprint');
  
      if (!hasMinLength) {
        this.errorMessage = 'Regel 1: Der Benutzername muss mindestens 5 Zeichen lang sein.';
      } else if (!hasNumber) {
        this.errorMessage = 'Regel 2: Der Benutzername muss mindestens eine Zahl enthalten.';
      } else if (!hasUpperCase) {
        this.errorMessage = 'Regel 3: Der Benutzername muss mindestens einen Großbuchstaben enthalten.';
      } else if (!sumToTwenty) {
        this.errorMessage = 'Regel 4: Die Ziffern im Benutzernamen müssen sich auf 20 aufaddieren.';
      } else if (!includesDeveloperName) {
        this.errorMessage = 'Regel 5: Der Benutzername muss mindestens einen Namen der Entwickler enthalten: Berit, Philipp, Max, Maximilian, Nicolas, Apisan, Joel.';
      } else if (!includesSponsor) {
        this.errorMessage = 'Regel 6: Der Benutzername muss mindestens einen unserer Sponsoren enthalten: HSG, Angular, Scrum.';
      } else if (!includesTeamSprint) {
        this.errorMessage = 'Regel 7: Der Benutzername muss das Wort "TeamSprint" enthalten.';
      } else if (this.allNicknames.includes(trimmedUsername)) {
        this.errorMessage = 'Dieser Benutzername ist bereits vorhanden.';}
      else {
        this.errorMessage = '';
        this.userCreated.emit(trimmedUsername + '\n');
        this.createdUsernames.push(trimmedUsername);
        this.userService.setUsername(trimmedUsername);
        this.username = '';
        this.disableInput = false;
      }
  }
  

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}
