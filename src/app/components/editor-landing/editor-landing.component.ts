import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-landing',
  standalone: true,
  imports: [],
  templateUrl: './editor-landing.component.html',
  styleUrl: './editor-landing.component.scss'
})
export class EditorLandingComponent {
  constructor(private router: Router) { }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageData = e.target?.result as string;
        this.router.navigate(['/editor'], { state: { imageData } });
      };

      reader.readAsDataURL(file);
    }
  }
}
