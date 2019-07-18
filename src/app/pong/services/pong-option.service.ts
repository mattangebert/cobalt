import { Injectable } from '@angular/core';

interface PaddleOption {
  /**
   * Height of paddle
   */
  height: number;
  /**
   * Width of Paddle
   */
  width: number;
  /**
   * Speed of Paddle
   */
  speed: number;
}

export interface PongOption {
  /**
   * If left paddle is controlled by a player
   */
  isPlayerOne: boolean;
  /**
   * If right paddle is controlled by a player
   */
  isPlayerTwo: boolean;
  /**
   * Options for left paddle
   */
  paddleLeft: PaddleOption;
  /**
   * Options for right paddle
   */
  paddleRight: PaddleOption;
}

/**
 * Service to provide pong game options
 * ====================================
 */
@Injectable({
  providedIn: 'root'
})
export class PongOptionService {
  /**
   * If left paddle is controlled by a player
   */
  public isPlayerOne: boolean;
  /**
   * If right paddle is controlled by a player
   */
  public isPlayerTwo: boolean;
  /**
   * Options for left paddle
   */
  public paddleLeftOption: PaddleOption;
  /**
   * Options for right paddle
   */
  public paddleRightOption: PaddleOption;

  constructor() {}

  /**
   * Initalize options with default values
   */
  public initializeOptions(): void {
    this.isPlayerOne = true;
    this.isPlayerTwo = false;
    this.paddleLeftOption = {height: 100, width: 20, speed: 2.0};
    this.paddleRightOption = {height: 100, width: 20, speed: 2.0};
  }

  /**
   * Get current options
   * @return current pong game options
   */
  public getOptions(): PongOption {
    const pongOption = {
      isPlayerOne: this.isPlayerOne,
      isPlayerTwo: this.isPlayerTwo,
      paddleLeft: this.paddleLeftOption,
      paddleRight: this.paddleRightOption
    };

    return pongOption;
  }

  /**
   * Set pong game options
   * @param options The options for the pong game
   */
  public setOptions(options: PongOption): void {
    this.isPlayerOne = options.isPlayerOne;
    this.isPlayerTwo = options.isPlayerTwo;
    this.paddleLeftOption = options.paddleLeft;
    this.paddleRightOption = options.paddleRight;
  }
}
