import { Injectable } from '@angular/core';

interface PaddleOption {
  height: number,
  width: number,
  speed: number
}

interface PongOption {
  isPlayerOne: boolean,
  isPlayerTwo: boolean,
  PaddleLeft: PaddleOption,
  PaddleRight: PaddleOption
}


@Injectable()
export class PongOptionService {
  private isPlayerOne: boolean;
  private isPlayerTwo: boolean;
  private paddleLeftOption: PaddleOption;
  private paddleRightOption: PaddleOption;

  constructor() {}

  initializeOptions() {
    this.setIsPlayerOne(true);
    this.setIsPlayerTwo(false);
    this.setPaddleLeftOption({height: 100, width: 20, speed: 1.5});
    this.setPaddleRightOption({height: 100, width: 20, speed: 1.5});
  }

  getOptions(): PongOption {
    const pongOption = {
      isPlayerOne: this.getIsPlayerOne(),
      isPlayerTwo: this.getIsPlayerTwo(),
      PaddleLeft: this.getPaddleLeftOption(),
      PaddleRight: this.getPaddleRightOption()
    }

    return pongOption;
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
