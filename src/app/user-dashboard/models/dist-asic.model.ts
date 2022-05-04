import { UserAsic } from './userAsic.model';
export class DistAsic {
  '_id': string;
  'availableHashrate': number;
  'totalConnectedUsers': number;
  'sellerID': string;
  'workerObjId': string;
  'workerData': UserAsic[];
}
