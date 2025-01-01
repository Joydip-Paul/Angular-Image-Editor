import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddTextComponent } from "../add-text/add-text.component";

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTextComponent],
  templateUrl: './editor-canvas.component.html',
  styleUrl: './editor-canvas.component.scss'
})
export class EditorCanvasComponent {
  tabActive: string = 'basic';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private img: HTMLImageElement | null = null;

  private currentRotation: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private scale: number = 1;

  private textObjects: Array<{
    text: string;
    color: string;
    size: number;
    x: number;
    y: number;
    isSelected: boolean;
  }> = [];


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.canvas = document.getElementById('jdCanvas') as HTMLCanvasElement;
      this.ctx = this.canvas?.getContext('2d') || null;
      const state = history.state;
      if (state && state.imageData) {
        this.loadImage(state.imageData);
      }
    });
  }

  changeTab(tab: string) {
    this.tabActive = tab;
  }

  loadImage(imageData: string) {
    this.img = new Image();
    this.img.onload = () => {
      if (this.canvas && this.ctx && this.img) {
        this.canvas.width = this.img.width;
        this.canvas.height = this.img.height;
        this.drawCanvas();
      } else {
        console.error('Canvas, context, or image is not initialized.');
      }
    };
    this.img.src = imageData;
  }

  drawCanvas() {
    if (this.canvas && this.ctx && this.img) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.rotate((this.currentRotation * Math.PI) / 180);
      this.ctx.scale(this.scale, this.scale);
      this.ctx.drawImage(
        this.img,
        -this.img.width / 2 + this.offsetX,
        -this.img.height / 2 + this.offsetY
      );
      this.ctx.restore();
    }
  }


  rotateImage() {
    this.currentRotation = (this.currentRotation + 90) % 360;
    this.drawCanvas();
  }

  zoomIn() {
    this.scale += 0.1;
    this.drawCanvas();
  }

  zoomOut() {
    this.scale = Math.max(this.scale - 0.1, 0.1);
    this.drawCanvas();
  }

  private flipHorizontal: boolean = false;
  private flipVertical: boolean = false;

  flipImage(mode: 'horizontal' | 'vertical') {
    if (this.canvas && this.ctx && this.img) {
      if (mode === 'horizontal') {
        this.flipHorizontal = !this.flipHorizontal;
      } else if (mode === 'vertical') {
        this.flipVertical = !this.flipVertical;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.translate(
        this.flipHorizontal ? this.canvas.width : 0,
        this.flipVertical ? this.canvas.height : 0
      );
      this.ctx.scale(this.flipHorizontal ? -1 : 1, this.flipVertical ? -1 : 1);
      this.ctx.drawImage(this.img, 0, 0);
      this.ctx.restore();
    }
  }

  moveImage(direction: 'up' | 'down' | 'left' | 'right') {
    const step = 10;
    switch (direction) {
      case 'up':
        this.offsetY -= step;
        break;
      case 'down':
        this.offsetY += step;
        break;
      case 'left':
        this.offsetX -= step;
        break;
      case 'right':
        this.offsetX += step;
        break;
    }
    this.drawCanvas();
  }

  addTextToCanvas(textData: { text: string; color: string; size: number }) {
    if (this.canvas && this.ctx) {
      const { text, color, size } = textData;
      this.ctx.save();
      this.ctx.fillStyle = color;
      this.ctx.font = `${size}px Arial`;
      this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.restore();
    }
  }


  downloadImage(): void {
    if (this.canvas) {
      const imageDataURL = this.canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageDataURL;
      link.download = 'jd-edit.png';
      link.click();
    } else {
      console.error('Canvas not available for download.');
    }
  }

  resetCanvas() {
    this.currentRotation = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1;
    this.drawCanvas();
  }
}
