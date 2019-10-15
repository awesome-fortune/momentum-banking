import { TestBed } from '@angular/core/testing';
import { ClientDetailsService } from './client-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ClientDetailsService', () => {
  let clientDetailsService: ClientDetailsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ClientDetailsService ]
    });

    clientDetailsService = TestBed.get(ClientDetailsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ClientDetailsService = TestBed.get(ClientDetailsService);
    expect(service).toBeTruthy();
  });

});
