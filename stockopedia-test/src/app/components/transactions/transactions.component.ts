import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { ApiService } from 'src/app/sevices/api.service';
import { Observable, Subject } from 'rxjs';
import { map, tap, combineLatest, takeUntil } from 'rxjs/operators';
import { CurrencyWithSign } from 'src/app/shared/pipes/currency-with-sign.pipe';
import { TransactionService } from 'src/app/sevices/transactions.service';
import { TransactionStatusEnum } from 'src/app/shared/models/transaction-status.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [CurrencyWithSign]
})
export class TransactionsComponent implements OnInit, OnDestroy, AfterViewInit {
  private _destroy$: Subject<void>;
  public cumulativeCashflow: number;

  public transactions$: Observable<TransactionModel[]>;

  public transactionStatus: TransactionStatusEnum;
  public transactionStatusEnum = TransactionStatusEnum;

  constructor(private _api: ApiService, private _transactionService: TransactionService) {
    this._destroy$ = new Subject();

    this.transactions$ = this._transactionService.transactions$.pipe(
      tap(transactions => this.cumulativeCashflow = transactions.map(el => el.cashflow).reduce((prev, curr) => prev + curr))
    );
  }

  ngOnInit(): void {
    this._transactionService.status$.pipe(takeUntil(this._destroy$)).subscribe(status => this.transactionStatus = status);
  }

  ngAfterViewInit(): void {
    this._transactionService.getTransactions();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  public editTransaction(transaction: TransactionModel): void {
    this._transactionService.editTransaction(transaction);
  }

  public deleteTransaction(id: number): void {
    this._transactionService.deleteTransaction(id);
  }

}

