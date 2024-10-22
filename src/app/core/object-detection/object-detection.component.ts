import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as cocoSSD from '@tensorflow-models/coco-ssd';
// Importa TensorFlow.js
import * as tf from '@tensorflow/tfjs';
// Importa el backend WebGL
import '@tensorflow/tfjs-backend-webgl';

@Component({
  selector: 'app-object-detection',
  standalone: true,
  templateUrl: './object-detection.component.html',
  styleUrls: ['./object-detection.component.css']
})
export default class ObjectDetectionComponent implements OnInit, OnDestroy {
  title = 'Real time Object Detection';
  private video!: HTMLVideoElement;
  loading!: boolean;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Ewumesh | AI | Real Time Object Detection');
  }

  ngOnInit() {
    // Inicializa el backend WebGL
    tf.setBackend('webgl').then(() => {
      console.log("Backend webgl inicializado");
      this.webcam_init();
    });
  }

  public async predictWithCocoModel() {
    const model = await cocoSSD.load({ base: 'lite_mobilenet_v2' });
    this.detectFrame(this.video, model);
  }

  webcam_init() {
    if (typeof document !== "undefined") {
      this.loading = true;
      this.video = <HTMLVideoElement>document.getElementById("vid");

      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          }
        })
        .then(stream => {
          this.video.srcObject = stream;
          this.video.onloadedmetadata = () => {
            this.video.play();
            this.loading = false;
            this.predictWithCocoModel();
          };
        })
        .catch(err => {
          console.error("Error al acceder a la webcam:", err);
          this.loading = false;
        });
    }
  }

  stopWebcam() {
    if (this.video) {
      (<MediaStream>this.video.srcObject).getTracks().forEach(stream => stream.stop());
    }
  }

  detectFrame = (video: any, model: any) => {
    model.detect(video).then((predictions: any) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  }

  renderPredictions = (predictions: any) => {
    if (typeof document !== "undefined") {
      const canvas = <HTMLCanvasElement>document.getElementById("canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
          // Configura el tamaño del canvas basado en el video
          canvas.width = this.video.videoWidth;
          canvas.height = this.video.videoHeight;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          // Dibuja el video en el canvas
          ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);

          // Dibuja predicciones
          predictions.forEach((prediction: any) => {
            const [x, y, width, height] = prediction.bbox;
            ctx.strokeStyle = "#00FFFF";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);

            // Dibuja la etiqueta
            ctx.fillStyle = "#00FFFF";
            ctx.fillText(prediction.class, x, y);
          });
        }
      }
    }
  }

  ngOnDestroy() {
    this.stopWebcam();
  }
}