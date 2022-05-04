import { WorkerPlan } from './worker-plan.model';

export class Merchant {
  'subscribers': number;
  'sellerID': string;
  'sellerData': {
    userName: string;
    email: string;
    phone: string;
  }[];
  sellerPlans: WorkerPlan[];
}
