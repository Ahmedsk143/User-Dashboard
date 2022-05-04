import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Balance } from './balance.model';
import { AuthService } from '../Auth/auth.service';
import { SharedService } from '../shared/shared.service';
import { DistAsic } from './models/dist-asic.model';
import { WorkerPlan } from './models/worker-plan.model';
import { MerchantUser } from './models/merchant-users.model';
import { Merchant } from './models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //////our API
  rootURL: string = 'https://cominer.herokuapp.com/api';
  key: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  /////////////////
  getUserDataAPI: string = `${this.rootURL}/user/getUserData?key=${this.key}`;
  token: any = localStorage.getItem('token');

  //to store the user data
  obj: any;
  //to stor the currency data
  btcPriceObj: any = { USD: 0.0 };
  ethPriceObj: any = { USD: 0.0 };
  rvnPriceObj: any = { USD: 0.0 };
  LTCTPriceObj: any = { USD: 0.0 };

  ////////currencies APIs
  btcAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';
  ethAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=Eth&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';
  rvnAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=rvn&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';

  LTCTAPI = ' https://api.coinbase.com/v2/prices/LTC-USD/buy';
  /////////////////

  ///part of the userData() function to get the user data from the backend
  header: any = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
  };

  userData() {
    return this.http.get<any>(this.getUserDataAPI, this.header);
  }

  /////external api to get the price of the currencies
  getPriceOfBitcoin() {
    return this.http.get<any>(this.btcAPI);
  }
  getPriceOfEth() {
    return this.http.get<any>(this.ethAPI);
  }
  getPriceOfRVN() {
    return this.http.get<any>(this.rvnAPI);
  }
  getPriceOfLTCT() {
    return this.http.get<any>(this.LTCTAPI);
  }

  balances$ = new Subject<Balance[]>();
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  updateBalances() {
    this.balances$.next([
      {
        currency: 'BTC',
        currencyBalance: this.obj.balance.btc,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: String(Number(this.btcPriceObj)),
        miningSpeed: '8,299',
        mined: 0.00999,
        minWithdraw: 0.00005,
      },
      {
        currency: 'ETH',
        currencyBalance: this.obj.balance.eth,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.ethPriceObj,
        miningSpeed: '8,299',
        mined: 0.00999,
        minWithdraw: 0.0021879,
      },
      {
        currency: 'RVN',
        currencyBalance: 0.0,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.rvnPriceObj,
        miningSpeed: '2,222',
        mined: 0.0,
        minWithdraw: 0.000011,
      },
      {
        currency: 'LTCT',
        currencyBalance: 0.0,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.LTCTPriceObj,
        miningSpeed: '9,299',
        mined: 0.0,
        minWithdraw: 0.000099,
      },
    ]);
  }
  ////////////////////////////hashrate plans page
  getPlans() {
    return this.http.get<any>(
      `${this.rootURL}/plan/x/contract?key=${this.key}`,
      this.header
    );
  }
  /////////////////////////////////////////////////////////// buy hasherate plans page
  ////////////the generic function
  getHashrateContractPlans(Currency: string, planType: string) {
    return this.http.get<any>(
      `${this.rootURL}/plan?cryptoName=${Currency}&planType=${planType}&key=${this.key}`,
      this.header
    );
  }
  //////////customized functions
  get_BTC_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('BTC', 'long');
  }
  get_BTC_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('BTC', 'short');
  }
  get_ETH_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('ETH', 'long');
  }
  get_ETH_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('ETH', 'short');
  }
  get_RVN_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('RVN', 'long');
  }
  get_RVN_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('RVN', 'short');
  }
  get_LTCT_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('LTCT', 'long');
  }
  get_LTCT_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('LTCT', 'short');
  }

  ///////////////////////////////////////////////////mining devices page get data from asic contract(my contracts )

  getMyAsicDevices() {
    return this.http.get<any>(
      `${this.rootURL}/asic/x/contract?key=${this.key}`,
      this.header
    );
  }
  ///////////////////////////////////////////////////////////////mining devices page get data from asics(which i can join)

  getAsicBTCDevicesContractPlans() {
    return this.http.get<any>(
      `${this.rootURL}/asic?key=${this.key}`,
      this.header
    );
  }

  /////////////////////////////////////buy plan dummy method
  buyplanAPI = `${this.rootURL}/plan/x/contract/add?key=${this.key}`;
  buyPlan(plan_id: String) {
    return this.http.post<any>(
      this.buyplanAPI,
      {
        planID: plan_id,
        currency: 'ETH',
      },
      this.header
    );
  }

  ///////////////////////////////////////buy asic dummy
  buyAsic(asic_id: String) {
    return this.http.post<any>(
      `${this.rootURL}/asic/x/contract/add?key=${this.key}`,
      {
        asicID: asic_id,
        currency: 'ETH',
      },
      this.header
    );
  }
  //////////////////////////////////////////// deposite and withdraw logs
  getUserDepositLogs() {
    return this.http.get<any>(
      `${this.rootURL}/transaction/getdeposits`,
      this.header
    );
  }
  getUserWithdrawLogs() {
    return this.http.get<any>(
      `${this.rootURL}/transaction/getwithdraws`,
      this.header
    );
  }
  //////////////////////////////////////////////////deposite and withdraw opertaions
  UserWithdrawRequest(Currency: string, Amount: number, Address: string) {
    return this.http.post<any>(
      `${this.rootURL}/transaction/setwithdrawrequest`,
      {
        currency: Currency,
        amount: Amount + '',
        address: Address,
      },
      this.header
    );
  }
  getUserDepositAddress(currency: string) {
    return this.http.get<{ address: string }>(
      `${this.rootURL}/transaction/getdepositaddress?currency=${currency}`,
      this.header
    );
  }
  /////////////// User buying//////////////
  getSellers() {
    return this.http.get(
      `${this.rootURL}/api/seller/getsellers?key=${this.key}`
    );
  }
  getSellerPlans(sellerID: string) {
    return this.http.get(
      `${this.rootURL}/api/seller/getsellerplans/${sellerID}?key=${this.key}`
    );
  }
  buyPlanContact(planID: string, currency: string) {
    return this.http.post(
      `${this.rootURL}/api/seller/addplancontarct?key=${this.key}`,
      {
        planID,
        currency,
      }
    );
  }
  ////////////////////// Seller ////////////
  getWorkers() {
    return this.http.get<DistAsic[]>(
      `${this.rootURL}/seller/getworkers?key=${this.key}`
    );
  }
  createSeller() {
    return this.http.post(
      `${this.rootURL}/seller/createsellerstore?key=${this.key}`,
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
      `${this.rootURL}/seller/addworkerplan/${workerID}?key=${this.key}`,
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
      `${this.rootURL}/seller/updateworkerplan/${workerID}/${planID}?key=${this.key}`,
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
      `${this.rootURL}/seller/deleteworkerplan/${workerID}/${planID}?key=${this.key}`,
      { responseType: 'text' }
    );
  }
  getWorkerDataById(workerID: string) {
    return this.http.get<DistAsic[]>(
      `${this.rootURL}/seller/getworkerdata/${workerID}?key=${this.key}`
    );
  }
  getWorkerPlansById(workerID: string) {
    return this.http.get<{ workerPlans: WorkerPlan[] }>(
      `${this.rootURL}/seller/getworkerplans/${workerID}?key=${this.key}`
    );
  }
  getWorkerUsersById(workerID: string) {
    return this.http.get<{ planContracts: MerchantUser[] }>(
      `${this.rootURL}/seller/getplancontracts/${workerID}?key=${this.key}`
    );
  }
  ////////////// User ///////////////////
  getAllSellers() {
    return this.http.get<{ sellers: Merchant[] }>(
      `${this.rootURL}/seller/getsellers?key=${this.key}`
    );
  }
  getSellerPlansById(sellerID: string) {
    return this.http.get<{ sellerPlans: WorkerPlan[] }>(
      `${this.rootURL}/seller/getsellerplans/${sellerID}?key=${this.key}  `
    );
  }
  addPlanContractSeller(planID: string, currency: string) {
    return this.http.post(
      `${this.rootURL}/seller/addplancontarct?key=${this.key}`,
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
      `${this.rootURL}/user/updatePassword?key=${this.key}`,
      {
        password,
        newPassword,
      },
      { responseType: 'text' }
    );
  }
}
