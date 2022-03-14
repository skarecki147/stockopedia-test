import { Injectable } from "@angular/core";
import { TransactionModel } from "../shared/models/transaction.model";
import { Observable, Subject } from 'rxjs';
import { ApiService } from "./api.service";
import { map, tap, combineLatest } from 'rxjs/operators';

@Injectable()
export class TransactionService {
    public transactions$: Observable<TransactionModel[]>;

    private _refresh$: Subject<any>;

    constructor(private _api: ApiService) {
        this._refresh$ = new Subject();

        // this.transactions$ = combineLatest(this._api.getTransactions(), this._refresh$)
    }

    public getTransactions(): void {


    }

    public addTransaction(transaction: TransactionModel): void {

    }

}