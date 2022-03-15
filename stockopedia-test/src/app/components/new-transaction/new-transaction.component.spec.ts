import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from '@jest/globals';
import { createSpyObj } from 'jest-createspyobj';
import { TransactionService } from '../../sevices/transactions.service';
import { NewTransactionComponent } from './new-transaction.component';

describe('NewTransactionComponent', () => {
  let component: NewTransactionComponent;
  let fixture: ComponentFixture<NewTransactionComponent>;
  let fake_transactionService: jest.Mocked<TransactionService>;

  beforeEach(async () => {
    fake_transactionService = createSpyObj<TransactionService>(TransactionService, ['updateTransaction', 'addTransaction']);

    await TestBed.configureTestingModule({
      declarations: [NewTransactionComponent],
      providers: [
        { provide: TransactionService, useFactory: () => fake_transactionService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransactionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('METHOD: ngOnInit', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // component.ngOnInit();
    });
  });

  describe('METHOD: onSubmit', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // component.onSubmit();
    });
  });

  describe('METHOD: cancelEditing', () => {
    it.skip('NOT IMPLEMENTED: should do something', () => {
      // TODO implement test
      // component.cancelEditing();
    });
  });

});
