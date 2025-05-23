export class Transaction {
  constructor(
    public id_transaction: number | null,
    public card_number: number,
    public status_transaction: number
  ) {}
}
