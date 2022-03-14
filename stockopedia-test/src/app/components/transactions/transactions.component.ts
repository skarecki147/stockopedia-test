import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { ApiService } from 'src/app/sevices/api.service';
import { Observable, Subject } from 'rxjs';
import { map, tap, combineLatest } from 'rxjs/operators';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
    title = 'stockopedia-test';

    private _destroy$: Subject<any>;
    public cumulativeCashflow: number;

    public transactions$: Observable<TransactionModel[]>;

    constructor(private _api: ApiService) {
      this._destroy$ = new Subject();
      this.transactions$ = this._api.getTransactions().pipe(
        map(res => res.transactions),
        tap(transactions => this.cumulativeCashflow = transactions.map(transaction => transaction.cashflow).reduce((prev, curr) => prev + curr)))


    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._destroy$.next();
    }

}

