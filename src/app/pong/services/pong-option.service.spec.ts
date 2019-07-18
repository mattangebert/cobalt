import { PongOptionService } from './pong-option.service';
import { TestBed } from '@angular/core/testing';

let service: PongOptionService;

describe('PongOptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PongOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initalize default options', () => {
    const paddleOption =  {height: 100, width: 20, speed: 2.0};
    service.initializeOptions();

    expect(service.options.isPlayerOne).toBe(true);
    expect(service.options.isPlayerTwo).toBe(false);
    expect(service.options.paddleLeft).toEqual(paddleOption);
    expect(service.options.paddleRight).toEqual(paddleOption);
    expect(service.options.optimizeBallSpeed).toBe(true);
    expect(service.options.ballSpeed).toBe(2);
  });

  it('should return options', () => {
    const paddleOption =  {height: 100, width: 20, speed: 2.0};
    service.initializeOptions();
    const options =  service.getOptions();

    expect(options.isPlayerOne).toBe(true);
    expect(options.isPlayerTwo).toBe(false);
    expect(options.paddleLeft).toEqual(paddleOption);
    expect(options.paddleRight).toEqual(paddleOption);
    expect(options.optimizeBallSpeed).toBe(true);
    expect(options.ballSpeed).toBe(2);
  });

  it('should set options to value', () => {
    const paddleOption =  {height: 200, width: 40, speed: 1.0};
    const option = {
      isPlayerOne: false,
      isPlayerTwo: true,
      paddleLeft: {
        height: 200,
        width: 40,
        speed: 1.0
      },
      paddleRight: {
        height: 200,
        width: 40,
        speed: 1.0
      },
      optimizeBallSpeed: false,
      ballSpeed: 5
    };

    service.setOptions(option);

    expect(service.options.isPlayerOne).toBe(false);
    expect(service.options.isPlayerTwo).toBe(true);
    expect(service.options.paddleLeft).toEqual(paddleOption);
    expect(service.options.paddleRight).toEqual(paddleOption);
    expect(service.options.optimizeBallSpeed).toBe(false);
    expect(service.options.ballSpeed).toBe(5);
  });
});

