import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionModel } from "../shared/models/transaction.model";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
    private _baseUrl: string;

    constructor(private _http: HttpClient) {
        this._baseUrl = 'https://transactions-challenge.test.stockopedia.com//api/v1';
    }

    public getTransactions(): Observable<{ transactions: TransactionModel[] }> {
        return this._http.get<{ transactions: TransactionModel[] }>(`${this._baseUrl}/transactions`)
    }

    public createTransaction(transaction: any): Observable<TransactionModel> {
        return this._http.post<TransactionModel>(
            `${this._baseUrl}/transactions`, 
            transaction, 
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
    }

    public updateTransaction(transaction: TransactionModel): Observable<TransactionModel> {
        return this._http.put<TransactionModel>(
            `${this._baseUrl}/transactions/${transaction.id}`, 
            transaction,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
    }

    public deleteTransaction(transactionId: number): Observable<TransactionModel> {
        return this._http.delete<TransactionModel>(`${this._baseUrl}/transactions/${transactionId}`);
    }

}