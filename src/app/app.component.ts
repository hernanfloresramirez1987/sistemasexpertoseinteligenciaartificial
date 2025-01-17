import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectdetectionface';

  constructor(private config: PrimeNGConfig) {
    // this.config.theme.set({ preset: Aura });
    this.config.ripple = true;
  }
}
