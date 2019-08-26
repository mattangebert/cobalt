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
  /**
   * If speed of ball should be optimized
   */
  optimizeBallSpeed: boolean;
  /**
   * Speed of ball if not optimized
   */
  ballSpeed: number;
  /**
   * Points needed to win
   */
  pointsToWin: number;
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
   * Options for pong game
   */
  public options: PongOption;

  constructor() {}

  /**
   * Initalize options with default values
   */
  public initializeOptions(): void {
    this.options = {
      isPlayerOne: true,
      isPlayerTwo: true,
      paddleLeft: {height: 100, width: 20, speed: 2.0},
      paddleRight: {height: 100, width: 20, speed: 2.0},
      optimizeBallSpeed: true,
      ballSpeed: 2,
      pointsToWin: 3,
    };
  }

  /**
   * Get current options
   * @return current pong game options
   */
  public getOptions(): PongOption {
    const pongOption = {
      isPlayerOne: this.options.isPlayerOne,
      isPlayerTwo: this.options.isPlayerTwo,
      paddleLeft: this.options.paddleLeft,
      paddleRight: this.options.paddleRight,
      optimizeBallSpeed: this.options.optimizeBallSpeed,
      ballSpeed: this.options.ballSpeed,
      pointsToWin: this.options.pointsToWin,
    };

    return pongOption;
  }

  /**
   * Set pong game options
   * @param options The options for the pong game
   */
  public setOptions(options: PongOption): void {
    this.options = {
      isPlayerOne: options.isPlayerOne,
      isPlayerTwo: options.isPlayerTwo,
      paddleLeft: options.paddleLeft,
      paddleRight: options.paddleRight,
      optimizeBallSpeed: options.optimizeBallSpeed,
      ballSpeed: options.ballSpeed,
      pointsToWin: options.pointsToWin,
    };
  }
}
