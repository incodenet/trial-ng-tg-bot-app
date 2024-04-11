import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  styles: `
  .form {
    height: 70vh;
    justify-content: center;
  }`,
  template: `
    <form class="form centered">
      <h2 class="mb">Add feedback</h2>
      <textarea
        [value]="feedback()"
        (input)="handleChange($event)"
        class="form-control"
      ></textarea>
    </form>
  `,
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedback = signal('');

  constructor(private telegram: TelegramService) {
    this.sendData = this.sendData.bind(this);
  }

  handleChange(event: any) {
    this.feedback.set(event.target.value);

    if (this.feedback().trim()) {
      this.telegram.MainButton.show();
    } else {
      this.telegram.MainButton.hide();
    }
  }

  sendData() {
    this.telegram.sendData({ feedback: this.feedback() });
  }

  ngOnInit(): void {
    this.telegram.MainButton.setText('Send message');
    // this.telegram.MainButton.show();
    // this.telegram.MainButton.disable();
    this.telegram.MainButton.hide();
    this.telegram.MainButton.onClick(this.sendData);
  }

  ngOnDestroy(): void {
    this.telegram.MainButton.offClick(this.sendData);
  }
}
