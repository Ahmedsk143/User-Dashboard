import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Balance } from './balance.model';
import { AuthService } from '../Auth/auth.service';
import { DistAsic } from './models/dist-asic.model';
import { WorkerPlan } from './models/worker-plan.model';
import { MerchantUser } from './models/merchant-users.model';
import { Merchant } from './models/merchant.model';
import { UserData } from './models/user-data.model';
import { PlanContract } from './models/plan-contract.model';
import { AsicContract } from './models/asic-contract.model';
import { Asic } from './models/asic.model';
import { Plan } from './models/plan.model';
import { TransLog } from './models/trans-log.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  rootURL: string = 'https://cominer.herokuapp.com';
  key: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  //to store the user data
  obj: any;
  //to stor the currency data
  btcPriceObj: any = { USD: 0.0 };
  ethPriceObj: any = { USD: 0.0 };
  rvnPriceObj: any = { USD: 0.0 };
  LTCTPriceObj: any = { USD: 0.0 };
  balances$ = new Subject<Balance[]>();
  constructor(private http: HttpClient) {}
  // Get prices
  getBTCPrice() {
    return this.http.get<{ USD: number }>(
      'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9'
    );
  }
  getETHPrice() {
    return this.http.get<{ USD: number }>(
      'https://min-api.cryptocompare.com/data/price?fsym=Eth&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9'
    );
  }
  getRVNPrice() {
    return this.http.get<{ USD: number }>(
      'https://min-api.cryptocompare.com/data/price?fsym=rvn&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9'
    );
  }
  getLTCTPrice() {
    return this.http.get<{ data: { amount: number } }>(
      'https://api.coinbase.com/v2/prices/LTC-USD/buy'
    );
  }
  // Get user data
  getUserData() {
    return this.http.get<UserData>(
      `${this.rootURL}/api/user/getUserData?key=${this.key}`
    );
  }
  // Get plans' contrats
  getPlansContract() {
    return this.http.get<PlanContract[]>(
      `${this.rootURL}/api/plan/x/contract?key=${this.key}`
    );
  }
  // get company plans
  getCompanyPlans(currency: string, planType: string) {
    return this.http.get<{
      plans: Plan[];
      PlansHashPower: { hashrate: number; planid: string }[];
    }>(
      `${this.rootURL}/api/plan?cryptoName=${currency}&planType=${planType}&key=${this.key}`
    );
  }
  getLongBTC() {
    return this.getCompanyPlans('BTC', 'long');
  }
  getShortBTC() {
    return this.getCompanyPlans('BTC', 'short');
  }
  getLongETH() {
    return this.getCompanyPlans('ETH', 'long');
  }
  getShortETH() {
    return this.getCompanyPlans('ETH', 'short');
  }
  getLongRVN() {
    return this.getCompanyPlans('RVN', 'long');
  }
  getShortRVN() {
    return this.getCompanyPlans('RVN', 'short');
  }
  getLongLTCT() {
    return this.getCompanyPlans('LTCT', 'long');
  }
  getShortLTCT() {
    return this.getCompanyPlans('LTCT', 'short');
  }
  addPlanContract(planID: string, currency: string) {
    return this.http.post<any>(
      `${this.rootURL}/api/plan/x/contract/add?key=${this.key}`,
      {
        planID,
        currency: currency.toUpperCase(),
      }
    );
  }
  //Asic Contracts
  getAsicContracts() {
    return this.http.get<AsicContract[]>(
      `${this.rootURL}/api/asic/x/contract?key=${this.key}`
    );
  }
  getAsicsToBuy() {
    return this.http.get<Asic[]>(`${this.rootURL}/api/asic?key=${this.key}`);
  }
  buyPlan(plan_id: String) {
    return this.http.post<any>(
      `${this.rootURL}/api/plan/x/contract/add?key=${this.key}`,
      {
        planID: plan_id,
        currency: 'ETH',
      }
    );
  }
  addAsicContract(asicID: string, currency: string) {
    return this.http.post<any>(
      `${this.rootURL}/api/asic/x/contract/add?key=${this.key}`,
      {
        asicID,
        currency,
      }
    );
  }
  //Deposite
  getDepositLogs() {
    return this.http.get<TransLog[]>(
      `${this.rootURL}/api/transaction/getdeposits`
    );
  }
  getDepositAddress(currency: string) {
    return this.http.get<{ address: string }>(
      `${this.rootURL}/api/transaction/getdepositaddress?currency=${currency}`
    );
  }

  //Withdraw
  getWithdrawLogs() {
    return this.http.get<TransLog[]>(
      `${this.rootURL}/api/transaction/getwithdraws`
    );
  }
  withdrawRequest(currency: string, amount: string, address: string) {
    return this.http.post<any>(
      `${this.rootURL}/api/transaction/setwithdrawrequest`,
      {
        currency,
        amount,
        address,
      }
    );
  }

  /////////////// User buying//////////////
  getSellers() {
    return this.http.get(
      `${this.rootURL}/api/api/seller/getsellers?key=${this.key}`
    );
  }
  getSellerPlans(sellerID: string) {
    return this.http.get(
      `${this.rootURL}/api/api/seller/getsellerplans/${sellerID}?key=${this.key}`
    );
  }
  buyPlanContact(planID: string, currency: string) {
    return this.http.post(
      `${this.rootURL}/api/api/seller/addplancontarct?key=${this.key}`,
      {
        planID,
        currency,
      }
    );
  }
  ////////////////////// Seller ////////////
  getWorkers() {
    return this.http.get<DistAsic[]>(
      `${this.rootURL}/api/seller/getworkers?key=${this.key}`
    );
  }
  createSeller() {
    return this.http.post(
      `${this.rootURL}/api/seller/createsellerstore?key=${this.key}`,
      {}
    );
  }
  addWorkerPlan(
    workerID: string,
    planName: string,
    price: string,
    hashPower: string
  ) {
    return this.http.post(
      `${this.rootURL}/api/seller/addworkerplan/${workerID}?key=${this.key}`,
      {
        planName,
        price,
        hashPower,
      },
      { responseType: 'text' }
    );
  }
  updateWorkerPlan(
    workerID: string,
    planID: string,
    planName: string,
    price: number,
    hashPower: number
  ) {
    return this.http.put(
      `${this.rootURL}/api/seller/updateworkerplan/${workerID}/${planID}?key=${this.key}`,
      {
        planName,
        price,
        hashPower,
      },
      { responseType: 'text' }
    );
  }
  deleteWorkerPlan(workerID: string, planID: string) {
    return this.http.delete(
      `${this.rootURL}/api/seller/deleteworkerplan/${workerID}/${planID}?key=${this.key}`,
      { responseType: 'text' }
    );
  }
  getWorkerDataById(workerID: string) {
    return this.http.get<DistAsic[]>(
      `${this.rootURL}/api/seller/getworkerdata/${workerID}?key=${this.key}`
    );
  }
  getWorkerPlansById(workerID: string) {
    return this.http.get<{ workerPlans: WorkerPlan[] }>(
      `${this.rootURL}/api/seller/getworkerplans/${workerID}?key=${this.key}`
    );
  }
  getWorkerUsersById(workerID: string) {
    return this.http.get<{ planContracts: MerchantUser[] }>(
      `${this.rootURL}/api/seller/getplancontracts/${workerID}?key=${this.key}`
    );
  }
  ////////////// User ///////////////////
  getAllSellers() {
    return this.http.get<{ sellers: Merchant[] }>(
      `${this.rootURL}/api/seller/getsellers?key=${this.key}`
    );
  }
  getSellerPlansById(sellerID: string) {
    return this.http.get<{ sellerPlans: WorkerPlan[] }>(
      `${this.rootURL}/api/seller/getsellerplans/${sellerID}?key=${this.key}  `
    );
  }
  addPlanContractSeller(planID: string, currency: string) {
    return this.http.post(
      `${this.rootURL}/api/seller/addplancontarct?key=${this.key}`,
      {
        planID,
        currency,
      },
      { responseType: 'text' }
    );
  }
  ///////////////// change password //////////////////
  updatePassword(password: string, newPassword: string) {
    return this.http.put(
      `${this.rootURL}/api/user/updatePassword?key=${this.key}`,
      {
        password,
        newPassword,
      },
      { responseType: 'text' }
    );
  }
}
