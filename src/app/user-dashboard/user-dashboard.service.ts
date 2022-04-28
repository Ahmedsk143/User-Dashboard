import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Balance } from './balance.model';
import { AuthService } from '../Auth/auth.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //////our API
  APIBaseUrl: string = 'https://cominer.herokuapp.com/api';
  APIKey: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  /////////////////
  getUserDataAPI: string = `${this.APIBaseUrl}/user/getUserData?key=${this.APIKey}`;
  accessToken: any = localStorage.getItem('accessToken');

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
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.accessToken}`
    ),
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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sharedSerivce: SharedService
  ) {
    this.accessToken = this.authService.getAccessToken();
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
      `${this.APIBaseUrl}/plan/x/contract?key=${this.APIKey}`,
      this.header
    );
  }
  /////////////////////////////////////////////////////////// buy hasherate plans page
  ////////////the generic function
  getHashrateContractPlans(Currency: string, planType: string) {
    return this.http.get<any>(
      `${this.APIBaseUrl}/plan?cryptoName=${Currency}&planType=${planType}&key=${this.APIKey}`,
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
      `${this.APIBaseUrl}/asic/x/contract?key=${this.APIKey}`,
      this.header
    );
  }
  ///////////////////////////////////////////////////////////////mining devices page get data from asics(which i can join)

  getAsicBTCDevicesContractPlans() {
    return this.http.get<any>(
      `${this.APIBaseUrl}/asic?key=${this.APIKey}`,
      this.header
    );
  }

  /////////////////////////////////////buy plan dummy method
  buyplanAPI = `${this.APIBaseUrl}/plan/x/contract/add?key=${this.APIKey}`;
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
      `${this.APIBaseUrl}/asic/x/contract/add?key=${this.APIKey}`,
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
      `${this.APIBaseUrl}/transaction/getdeposits`,
      this.header
    );
  }
  getUserWithdrawLogs() {
    return this.http.get<any>(
      `${this.APIBaseUrl}/transaction/getwithdraws`,
      this.header
    );
  }
  //////////////////////////////////////////////////deposite and withdraw opertaions
  UserWithdrawRequest(Currency: string, Amount: number, Address: string) {
    return this.http.post<any>(
      `${this.APIBaseUrl}/transaction/setwithdrawrequest`,
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
      `${this.APIBaseUrl}/transaction/getdepositaddress?currency=${currency}`,
      this.header
    );
  }
}
