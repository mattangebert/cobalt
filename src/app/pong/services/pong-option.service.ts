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
  isPlayerOne: boolean;
  isPlayerTwo: boolean;
  paddleLeftOption: PaddleOption;
  paddleRightOption: PaddleOption;

  constructor() {}

  initializeOptions(): void {
    this.setIsPlayerOne(true);
    this.setIsPlayerTwo(false);
    this.setPaddleLeftOption({height: 100, width: 20, speed: 2.0});
    this.setPaddleRightOption({height: 100, width: 20, speed: 2.0});
  }

  getOptions(): PongOption {
    const pongOption = {
      isPlayerOne: this.getIsPlayerOne(),
      isPlayerTwo: this.getIsPlayerTwo(),
      paddleLeft: this.getPaddleLeftOption(),
      paddleRight: this.getPaddleRightOption()
    };

    return pongOption;
  }

  setOptions(options: PongOption): void {
    this.setIsPlayerOne(options.isPlayerOne);
    this.setIsPlayerTwo(options.isPlayerTwo);
    this.setPaddleLeftOption(options.paddleLeft);
    this.setPaddleRightOption(options.paddleRight);
  }

  setIsPlayerOne(isPlayer: boolean): void {
    this.isPlayerOne = isPlayer;
  }

  getIsPlayerOne(): boolean {
    return this.isPlayerOne;
  }

  setIsPlayerTwo(isPlayer: boolean): void {
    this.isPlayerTwo = isPlayer;
  }

  getIsPlayerTwo(): boolean {
    return this.isPlayerTwo;
  }

  setPaddleLeftOption(paddleOption: PaddleOption): void {
    this.paddleLeftOption = paddleOption;
  }

  getPaddleLeftOption(): PaddleOption {
    return this.paddleLeftOption;
  }

  setPaddleRightOption(paddleOption: PaddleOption): void {
    this.paddleRightOption = paddleOption;
  }

  getPaddleRightOption(): PaddleOption {
    return this.paddleRightOption;
  }
}
