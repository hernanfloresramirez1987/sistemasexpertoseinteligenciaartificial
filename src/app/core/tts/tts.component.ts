import { Component } from '@angular/core';
import { TtsService } from '../services/tts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-tts',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './tts.component.html',
  styleUrl: './tts.component.css'
})
export default class TtsComponent {
  text: string = 'Hola, este es un ejemplo de texto a voz.';

  constructor(private ttsService: TtsService) {}

  convertText() {
    this.ttsService.convertTextToSpeech(this.text).subscribe(
      (audioBlob) => {
        const url = window.URL.createObjectURL(audioBlob);
        const audio = new Audio(url);
        audio.play();
      },
      (error) => {
        console.error('Error al convertir el texto a voz:', error);
      }
    );
  }
}
