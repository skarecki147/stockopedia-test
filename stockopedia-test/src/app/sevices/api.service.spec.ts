import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let fake_http: jest.Mocked<HttpClient>;

  beforeEach(async () => {
    fake_http = createSpyObj<HttpClient>(HttpClient, ['get', 'post', 'put', 'delete']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useFactory: () => fake_http },
        ApiService
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('METHOD: getTransactions', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // service.getTransactions();
    });
  });

  describe('METHOD: createTransaction', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // service.createTransaction();
    });
  });

  describe('METHOD: updateTransaction', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // service.updateTransaction();
    });
  });

  describe('METHOD: deleteTransaction', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // service.deleteTransaction();
    });
  });

});
