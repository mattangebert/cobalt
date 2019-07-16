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

    expect(service.isPlayerOne).toBeTruthy();
    expect(service.isPlayerTwo).toBeFalsy();
    expect(service.paddleLeftOption).toEqual(paddleOption);
    expect(service.paddleRightOption).toEqual(paddleOption);
  });

  it('should return options', () => {
    const paddleOption =  {height: 100, width: 20, speed: 2.0};
    service.initializeOptions();
    const options =  service.getOptions();

    expect(options.isPlayerOne).toBeTruthy();
    expect(options.isPlayerTwo).toBeFalsy();
    expect(options.paddleLeft).toEqual(paddleOption);
    expect(options.paddleRight).toEqual(paddleOption);
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
      }
    }

    service.setOptions(option);

    expect(service.isPlayerOne).toBeFalsy();
    expect(service.isPlayerTwo).toBeTruthy();
    expect(service.paddleLeftOption).toEqual(paddleOption);
    expect(service.paddleRightOption).toEqual(paddleOption);
  });
});

