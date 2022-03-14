import { Injectable } from "@angular/core";
import { TransactionModel } from "../shared/models/transaction.model";
import { Observable, Subject } from 'rxjs';
import { ApiService } from "./api.service";
import { map, tap, combineLatest, concatMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TransactionStatusEnum } from "../shared/models/transaction-status.enum";

@Injectable()
export class TransactionService {
    public transactions$: Observable<TransactionModel[]>;

    public status$: BehaviorSubject<TransactionStatusEnum>;

    private _refresh$: Subject<void>;

    constructor(private _api: ApiService) {
        this._refresh$ = new Subject();
        this.status$ = new BehaviorSubject(TransactionStatusEnum.START);

        this.transactions$ = this._refresh$.asObservable().pipe(
            concatMap(_ => this._api.getTransactions().pipe(
                map(res => res.transactions)
            ))
        )
    }

    public getTransactions(): void {
        this._refresh$.next();
    }

    public addTransaction(transaction: TransactionModel): void {
        this._api.createTransaction(transaction).subscribe(_ => this._refresh$.next());
    }

    public editTransaction(transaction: TransactionModel): void {
        this._api.updateTransaction(transaction).subscribe(_ => this._refresh$.next());
    }

    public deleteTransaction(transactionId: number): void {
        this._api.deleteTransaction(transactionId).subscribe(_ => this._refresh$.next());
    }

}