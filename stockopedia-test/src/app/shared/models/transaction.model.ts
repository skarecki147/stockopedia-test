import { TransactionTypeEnum } from "./transaction-type.enum"

export interface TransactionModel {
  id: number,
  type: TransactionTypeEnum,
  date: string,
  value: number
  cashflow: number,
  security?: string,
  shares?: number,
}