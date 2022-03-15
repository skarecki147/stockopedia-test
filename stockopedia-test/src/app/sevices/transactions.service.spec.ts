import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from '@jest/globals';
import { createSpyObj } from "jest-createspyobj";
import { ApiService } from "./api.service";
import { TransactionService } from "./transactions.service";

describe("TransactionService", () => {
  let service: TransactionService;
  let fake_api: jest.Mocked<ApiService>;

  beforeEach(async () => {
    fake_api = createSpyObj<ApiService>(ApiService, ["getTransactions", "createTransaction", "updateTransaction", "deleteTransaction"]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useFactory: () => fake_api },
        TransactionService
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  describe("METHOD: getTransactions", () => {
    it.skip("NOT IMPLEMENTED: should do something", () => {
      // TODO implement test
      // service.getTransactions();
    });
  });

  describe("METHOD: addTransaction", () => {
    it.skip("NOT IMPLEMENTED: should do something", () => {
      // TODO implement test
      // service.addTransaction();
    });
  });

  describe("METHOD: editTransaction", () => {
    it.skip("NOT IMPLEMENTED: should do something", () => {
      // TODO implement test
      // service.editTransaction();
    });
  });

  describe("METHOD: updateTransaction", () => {
    it.skip("NOT IMPLEMENTED: should do something", () => {
      // TODO implement test
      // service.updateTransaction();
    });
  });

  describe("METHOD: deleteTransaction", () => {
    it.skip("NOT IMPLEMENTED: should do something", () => {
      // TODO implement test
      // service.deleteTransaction();
    });
  });

});
