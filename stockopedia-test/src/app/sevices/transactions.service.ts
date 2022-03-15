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
    public editingTransaction$: Subject<TransactionModel>;

    public status$: BehaviorSubject<TransactionStatusEnum>;
    public isEditingState$: BehaviorSubject<boolean>;

    private _refresh$: Subject<void>;

    constructor(private _api: ApiService) {
        this._refresh$ = new Subject();
        this.editingTransaction$ = new Subject();
        this.status$ = new BehaviorSubject(TransactionStatusEnum.START);
        this.isEditingState$ = new BehaviorSubject(false);
        

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
        this.status$.next(TransactionStatusEnum.ADDED)
    }

    public editTransaction(transaction: TransactionModel): void {
        this.isEditingState$.next(true);
        this.editingTransaction$.next(transaction);
        this._api.updateTransaction(transaction).subscribe(_ => this._refresh$.next());
        this.status$.next(TransactionStatusEnum.UPDATED)
    }

    public deleteTransaction(transactionId: number): void {
        this._api.deleteTransaction(transactionId).subscribe(_ => this._refresh$.next());
        this.status$.next(TransactionStatusEnum.DELETED)
    }

}