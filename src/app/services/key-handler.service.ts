import { HostListener, Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, distinctUntilKeyChanged } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

export interface CharacterMovement {
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

export const DEFAULT_CHAR_MOVMENT: CharacterMovement = {
    up: false,
    down: false,
    left: false,
    right: false
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
    /** key down events */
    private keyDownEvents$ = fromEvent(window.document, 'keydown');
    /** key up events */
    private keyUpEvents$ = fromEvent(window.document, 'keyup');
    /**
     * Subject to listen to current movement;
     */
    public charMovement: BehaviorSubject<CharacterMovement>;
    /**
     * The input key to handle character movmement
     */
    private charKeys: CharacterMovementKeys;

    constructor(
        // @Inject(DOCUMENT) private document: any
    ) {
        this.charKeys = DEFAULT_CHAR_KEYS;
        this.movement = DEFAULT_CHAR_MOVMENT;
        this.charMovement = new BehaviorSubject(this.movement);

        const keyEvents = merge(
            this.keyDownEvents$,
            this.keyUpEvents$
        ).pipe(
            distinctUntilChanged((prev: KeyboardEvent, curr: KeyboardEvent) => prev.code === curr.code && prev.type === curr.type),
        );


        keyEvents.subscribe(({code, type}) => {
            const movementKey = Object.keys(this.charKeys).find(key => this.charKeys[key] === code);
            this.movement[movementKey] = type === 'keydown';
            this.charMovement.next(this.movement);
        });

    }
}
