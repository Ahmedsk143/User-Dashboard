export class Plan {
  _id?: string;
  planType: string;
  planName: string;
  cryptoName: string;
  algorithm: string;
  planDuration: number;
  profitability: number;
  price: number;
  availability: boolean;
  createdAt?: string;
  updatedAt?: string;
}
