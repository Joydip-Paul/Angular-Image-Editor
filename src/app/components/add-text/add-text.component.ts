import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-text.component.html',
  styleUrl: './add-text.component.scss'
})
export class AddTextComponent {
  text: string = '';
  fontColor: string = '#000000';
  fontSize: number = 100;

  @Output() addText = new EventEmitter<{ text: string; color: string; size: number }>();

  emitText() {
    if (this.text.trim()) {
      this.addText.emit({ text: this.text, color: this.fontColor, size: this.fontSize });
    }
  }
}
