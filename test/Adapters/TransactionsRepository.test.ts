import { SequelizeTransactionRepository } from '../../src/adapters/outbound/db/SequelizeTransactionRepository';
import { TransactionModel } from '../../src/adapters/outbound/models/TransactionModel';
import { Transaction } from '../../src/domains/entities/Transaction';


jest.mock('../../src/adapters/outbound/models/TransactionModel');

describe('SequelizeTransactionRepository', () => {
  let repository: SequelizeTransactionRepository;

  beforeEach(() => {
    repository = new SequelizeTransactionRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a transaction in the database', async () => {
      const transaction = new Transaction(
        '1234-456-7890', 
        'credit_card', 
        'VISA', 
        'John Doe',
        'APPROVED'
      );

      // @ts-ignore
      TransactionModel.create.mockResolvedValue({});

      await repository.create(transaction);

      expect(TransactionModel.create).toHaveBeenCalledWith({
        id_transaction_gateway: '1234-456-7890',
        payment_method: 'credit_card',
        type_card: 'VISA',
        card_holder: 'John Doe',
        status: 'APPROVED',
      });
    });
  });
});
