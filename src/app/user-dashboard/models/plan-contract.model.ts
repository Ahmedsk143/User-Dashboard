export class PlanContract {
  '_id': string;
  'demo': boolean;
  'cryptoName': string;
  'startDate': Date;
  'endDate': Date;
  'totalMined': number;
  'planStatus': boolean;
  'hashPower': number;
  'userID': string;
  'planID': string;
  'hourlyGains'?: {
    date: Date;
    profit: number;
    _id: string;
  }[];
  xAxis?: string[];
  yAxis?: number[];
}
