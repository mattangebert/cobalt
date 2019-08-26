import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CharacterMovement {
    /**
     * If the character moves upwards
     */
    up: boolean;
    /**
     * If the character moves downwards
     */
    down: boolean;
    /**
     * If the character moves toward left
     */
    left: boolean;
    /**
     * If the character moves toward right
     */
    right: boolean;
}

interface CharacterMovementKeys {
    /**
     * The key to move charater upwards
     */
    up: string;
    /**
     * The key to move charater downwards
     */
    down: string;
    /**
     * The key to move charater toward left
     */
    left: string;
    /**
     * The key to move charater toward right
     */
    right: string;
}

const DEFAULT_CHAR_KEYS: CharacterMovementKeys = {
    up: 'KeyW',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD'
};

/**
 * KeyHandlerService
 * =================
 */
@Injectable({
    providedIn: 'root',
  })
export class KeyHandlerService {
    /**
     * The directions the charavter moves towards
     */
    private movement: CharacterMovement;
    /**
     * Subject to listen to current movement;
     */
    public charMovement  = new BehaviorSubject(this.movement);
    /**
     * The input key to handle character movmement
     */
    private charKeys: CharacterMovementKeys;

    constructor(charKeys: CharacterMovementKeys) {
        this.charKeys = charKeys || DEFAULT_CHAR_KEYS;
    }

    /**
   * Handle user keydown events
   * @param event Keys user presses down
   */
  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if (this.charKeys.up === event.code) {
        this.movement.up = true;
    }
    if (this.charKeys.down === event.code) {
        this.movement.down = true;
    }
    if (this.charKeys.left === event.code) {
        this.movement.left = true;
    }
    if (this.charKeys.right === event.code) {
        this.movement.right = true;
    }

    this.charMovement.next(this.movement);
  }

  /**
   * Handle user keyup events
   * @param event Keys user releases
   */
  @HostListener('window:keyup', ['$event'])
  public keyEvent2(event: KeyboardEvent): void {
    if (this.charKeys.up === event.code) {
        this.movement.up = false;
    }
    if (this.charKeys.down === event.code) {
        this.movement.down = false;
    }
    if (this.charKeys.left === event.code) {
        this.movement.left = false;
    }
    if (this.charKeys.right === event.code) {
        this.movement.right = false;
    }

    this.charMovement.next(this.movement);
  }
}
