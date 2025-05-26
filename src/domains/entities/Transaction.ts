export class Transaction {
  constructor(
    public readonly id_transaction_gateway: string,
    public readonly payment_method: string,
    public readonly type_card: string,
    public readonly card_holder: string,
    public status: string
  ) {}

    updateTransaction(status: string): void {
    this.status = status;
  }

}
