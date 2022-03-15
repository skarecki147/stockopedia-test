import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionService } from '../../sevices/transactions.service';
import { TransactionTypeEnum } from '../../shared/models/transaction-type.enum';
import { TransactionModel } from '../../shared/models/transaction.model';


@Component({
    selector: 'app-new-transaction',
    templateUrl: './new-transaction.component.html',
    styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

    title = 'stockopedia-test';
    editing = false;
    currentTransactionID: number;
    public transactionTypeEnum = TransactionTypeEnum;
    newTransactionForm = new FormGroup({
        value: new FormControl(),
        type: new FormControl(),
        date: new FormControl(),
        security: new FormControl(),
        shares: new FormControl(),
    });

    submittedTransaction: TransactionModel;

    constructor(private _transactionService: TransactionService) { }

    ngOnInit(): void {
        this._transactionService.isEditingState$.subscribe(state => this.editing = state)
        this._transactionService.editingTransaction$.subscribe((transaction) => {
            if (transaction) {
                this.currentTransactionID = transaction.id;
                this.newTransactionForm.patchValue({ ...transaction, date: new Date(transaction.date).toISOString().slice(0, 10) });
            }
        })
    }

    onSubmit(submittedTransaction: TransactionModel) {
        submittedTransaction.cashflow = ['buy', 'withdraw'].includes(submittedTransaction.type) ? submittedTransaction.value : -submittedTransaction.value;
        submittedTransaction.id = this.currentTransactionID;
        submittedTransaction.value = +(submittedTransaction.value * 100).toFixed(2)
        submittedTransaction.cashflow = +(submittedTransaction.cashflow * 100).toFixed(2)
        submittedTransaction.date = new Date(submittedTransaction.date).toISOString()
        if (this.editing) {
            this._transactionService.updateTransaction(submittedTransaction);
        } else {
            this._transactionService.addTransaction(submittedTransaction);
        }
        this.newTransactionForm.reset();
    }

    cancelEditing(): void {
        this._transactionService.isEditingState$.next(false);
        this.newTransactionForm.reset();
    }
}
