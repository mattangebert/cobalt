import { Injectable } from '@angular/core';

interface PaddleOption {
  height: number;
  width: number;
  speed: number;
}

export interface PongOption {
  isPlayerOne: boolean;
  isPlayerTwo: boolean;
  paddleLeft: PaddleOption;
  paddleRight: PaddleOption;
}

@Injectable({
  providedIn: 'root'
})
export class PongOptionService {
  public isPlayerOne: boolean;
  public isPlayerTwo: boolean;
  public paddleLeftOption: PaddleOption;
  public paddleRightOption: PaddleOption;

  constructor() {}

  public initializeOptions(): void {
    this.isPlayerOne = true;
    this.isPlayerTwo = false;
    this.paddleLeftOption = {height: 100, width: 20, speed: 2.0};
    this.paddleRightOption = {height: 100, width: 20, speed: 2.0};
  }

  public getOptions(): PongOption {
    const pongOption = {
      isPlayerOne: this.isPlayerOne,
      isPlayerTwo: this.isPlayerTwo,
      paddleLeft: this.paddleLeftOption,
      paddleRight: this.paddleRightOption
    };

    return pongOption;
  }

  public setOptions(options: PongOption): void {
    this.isPlayerOne = options.isPlayerOne;
    this.isPlayerTwo = options.isPlayerTwo;
    this.paddleLeftOption = options.paddleLeft;
    this.paddleRightOption = options.paddleRight;
  }
}
