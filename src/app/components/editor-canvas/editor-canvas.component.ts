import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor-canvas.component.html',
  styleUrl: './editor-canvas.component.scss'
})
export class EditorCanvasComponent {
  tabActive: string = 'basic';

  constructor() { }

  ngOnInit() {
    const state = history.state;
    if (state && state.imageData) {
      this.displayImageOnCanvas(state.imageData);
    }
  }

  displayImageOnCanvas(imageData: string) {
    const canvas = document.getElementById('jdCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = imageData;
      console.log('image loaded', img.src);
    }
  }

  changeTab(tab: string) {
    this.tabActive = tab;
  }

  rotateImage() {
    console.log('rotate image');
  }
}
