import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeTotal = 0;
    let outcomeTotal = 0;

    this.transactions.filter(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.value;
      } else if (transaction.type === 'outcome') {
        outcomeTotal += transaction.value;
      }
    });
    const total = incomeTotal - outcomeTotal;
    const balance = { income: incomeTotal, outcome: outcomeTotal, total };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
