import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionService } from 'src/app/sevices/transactions.service';
import { TransactionTypeEnum } from 'src/app/shared/models/transaction-type.enum';
import { TransactionModel } from 'src/app/shared/models/transaction.model';


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
                this.newTransactionForm.patchValue(transaction);
            }

        })
    }

    onSubmit(submittedTransaction: TransactionModel) {
        submittedTransaction.cashflow = submittedTransaction.type === ('buy' || 'withdraw') ? submittedTransaction.value : -submittedTransaction.value;
        submittedTransaction.id = this.currentTransactionID;
        if (this.editing) {
            this._transactionService.updateTransaction(submittedTransaction);
        } else {
            this._transactionService.addTransaction(submittedTransaction);

        }
        this.newTransactionForm.reset();
    }

    cancelEditing(): void {
        this._transactionService.isEditingState$.next(false);
        // this._transactionService.editingTransaction$.next(null);
        this.newTransactionForm.reset();
    }
}
