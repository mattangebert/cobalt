/*
let posStub: Partial<PongOptionService>;
let fixture;
let comp;
let pos;



beforeEach(() => {
  posStub = {
    isPlayerOne: true,
    isPlayerTwo: false,
    paddleLeftOption: {
      height: 100,
      width: 20,
      speed: 2
    },
    paddleRightOption: {
      height: 100,
      width: 20,
      speed: 2
    }
  };

  TestBed.configureTestingModule({
    //declarations: [ PongGame ],
    providers: [ {provide: PongOptionService, useValue: posStub} ]
  });

  //fixture = TestBed.createComponent(PongGame);
  //comp = fixture.componentInstance;
  pos = TestBed.get('PongOptionService');

});

describe('PongGame', () => {
  it('should create an instance', () => {
    expect(new PongGame(600, 800, pos)).toBeTruthy();
  });
});
*/
