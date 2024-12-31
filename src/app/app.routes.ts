import { Routes } from '@angular/router';
import { EditorLandingComponent } from './components/editor-landing/editor-landing.component';
import { EditorCanvasComponent } from './components/editor-canvas/editor-canvas.component';

export const routes: Routes = [
    { path: '', component: EditorLandingComponent },
    { path: 'editor', component: EditorCanvasComponent }
];
