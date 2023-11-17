// user-history.component.ts
import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements AfterViewChecked {
  @Input() userhistory: string[] = [];
  @ViewChild('userHistoryBox', { static: false }) private userHistoryBox!: ElementRef;

  get usernames(): Username[] {
    return this.userhistory.map(user => {
      return { content: user.trim() };
    }).filter(user => user.content !== '');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.userHistoryBox.nativeElement.scrollTop = this.userHistoryBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}

interface Username {
  content: string;
}
