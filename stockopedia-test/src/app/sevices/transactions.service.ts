import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { TransactionStatusEnum } from "../shared/models/transaction-status.enum";
import { TransactionModel } from "../shared/models/transaction.model";
import { ApiService } from "./api.service";

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
                map(res => res.transactions.map(el => {
                    el.value /= 100;
                    el.cashflow /= 100;
                    return el;
                })),
            ))
        )
    }

    public getTransactions(): void {
        this._refresh$.next();
    }

    public addTransaction(transaction: TransactionModel): void {
        this._api.createTransaction(transaction).subscribe(_ => {
            this._refresh$.next();
            this.status$.next(TransactionStatusEnum.ADDED);
        });

    }

    public editTransaction(transaction: TransactionModel): void {
        this.isEditingState$.next(true);
        this.editingTransaction$.next(transaction);
    }

    public updateTransaction(transaction: TransactionModel): void {
        this._api.updateTransaction(transaction).subscribe(_ => {
            this._refresh$.next();
            this.status$.next(TransactionStatusEnum.UPDATED);
            this.isEditingState$.next(false);
        }
        );
    }

    public deleteTransaction(transactionId: number): void {
        this._api.deleteTransaction(transactionId).subscribe(_ => {
            this.status$.next(TransactionStatusEnum.DELETED)
            this._refresh$.next();
        });
    }

}