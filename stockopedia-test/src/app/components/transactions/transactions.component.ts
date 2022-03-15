import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { TransactionService } from '../../sevices/transactions.service';
import { TransactionStatusEnum } from '../../shared/models/transaction-status.enum';
import { TransactionModel } from '../../shared/models/transaction.model';
import { CurrencyWithSign } from '../../shared/pipes/currency-with-sign.pipe';

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

  constructor(private _transactionService: TransactionService) {
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

