import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan.model';
import { Miner } from './models/miner.model';
import { RequestNew } from './models/req-new.model';
import { RequestApproved } from './models/req-approved.model';
import { User } from './models/user.model';
import { UserPlan } from './models/user-plan.model';
import { UserAsic } from './models/userAsic.model';
import { Log } from './models/log.model';
import { Worker } from './models/worker.model';
import { AdminAuthService } from '../Auth/admin-auth.service';
import { catchError, tap, throwError } from 'rxjs';

let accessToken = localStorage.getItem('token');
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private rootURL = 'https://cominer.herokuapp.com';
  private key =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  constructor(
    private http: HttpClient,
    private authService: AdminAuthService
  ) {}

  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    ),
  };
  ////////////////////             Plans               ////////////////////////
  getPlans() {
    return this.http.get<Plan[]>(
      `${this.rootURL}/api/plan/admin?key=${this.key}`,
      this.header
    );
  }

  addNewPlan(plan: Plan) {
    return this.http.post(
      `${this.rootURL}/api/plan/add?key=${this.key}`,
      {
        planType: plan.planType,
        planName: plan.planName,
        cryptoName: plan.cryptoName,
        algorithm: plan.algorithm,
        planDuration: plan.planDuration,
        profitability: plan.profitability,
        price: plan.price,
        availability: plan.availability,
      },
      this.header
    );
  }

  updatePlan(plan: Plan) {
    return this.http.put(
      `${this.rootURL}/api/plan/update/${plan._id}?key=${this.key}`,
      {
        planType: plan.planType,
        planName: plan.planName,
        cryptoName: plan.cryptoName,
        algorithm: plan.algorithm,
        planDuration: plan.planDuration,
        profitability: plan.profitability,
        price: plan.price,
        availability: plan.availability,
      },
      this.header
    );
  }
  deletePlan(plan: Plan) {
    return this.http.delete(
      `${this.rootURL}/api/plan/delete/${plan._id}?key=${this.key}`,
      this.header
    );
  }
  ////////////////////             Miners               ////////////////////////
  getMiners() {
    return this.http.get<Miner[]>(
      `${this.rootURL}/api/asic/admin?key=${this.key}`,
      this.header
    );
  }

  addNewMiner(miner: Miner) {
    return this.http.post(
      `${this.rootURL}/api/asic/add?key=${this.key}`,
      {
        asicName: miner.asicName,
        cryptoName: miner.cryptoName,
        algorithm: miner.algorithm,
        hashPower: miner.hashPower,
        price: miner.price,
        hostFees: miner.hostFees,
      },
      this.header
    );
  }

  updateMiner(miner: Miner) {
    return this.http.put(
      `${this.rootURL}/api/asic/update/${miner._id}?key=${this.key}`,
      {
        asicName: miner.asicName,
        cryptoName: miner.cryptoName,
        algorithm: miner.algorithm,
        hashPower: miner.hashPower,
        price: miner.price,
        hostFees: miner.hostFees,
        availability: miner.availability,
      },
      this.header
    );
  }
  deleteMiner(miner: Miner) {
    return this.http.delete(
      `${this.rootURL}/api/asic/delete/${miner._id}?key=${this.key}`,
      this.header
    );
  }
  ////////////////////             Buy requests               ////////////////////////

  getRequests() {
    return this.http.get<RequestNew[]>(
      `${this.rootURL}/api/asic/x/contract/ondemand?key=${this.key}`,
      this.header
    );
  }
  getAddress(asicID: string) {
    return this.http.get<{
      address: string;
    }>(
      `${this.rootURL}/api/transaction/admin/getdepositaddressForAsicContarct?asicID=${asicID}`,
      this.header
    );
  }
  acceptRequest(
    asicID: string,
    address: string,
    workerID: string,
    pool: string
  ) {
    return this.http.put(
      `${this.rootURL}/api/asic/x/contract/activate/${asicID}?key=${this.key} `,
      {
        address,
        workerID,
        pool,
      },
      this.header
    );
  }
  getApprovedRequests() {
    return this.http.get<RequestApproved[]>(
      `${this.rootURL}/api/asic/x/contract/activeContracts?key=${this.key} `,
      this.header
    );
  }
  endContract(contractID: string) {
    return this.http.put(
      `${this.rootURL}/api/asic/x/contract/expire/${contractID}?key=${this.key}`,
      {},
      this.header
    );
  }
  ////////////////////////////// subscribed users ////////////////////////
  getSubscribedUsers() {
    return this.http.get<User[]>(
      `${this.rootURL}/api/admin/getUsers?key=${this.key}`,
      this.header
    );
  }
  getUserData(userID: string) {
    return this.http.get<User>(
      `${this.rootURL}/api/admin/getUserData/${userID}?key=${this.key}`,
      this.header
    );
  }
  getUserPlans(userID: string) {
    return this.http.get<UserPlan[]>(
      `${this.rootURL}/api/plan/admin/getUserContracts/${userID}?key=${this.key}`,
      this.header
    );
  }
  getUserAsics(userID: string) {
    return this.http.get<[]>(
      `${this.rootURL}/api/asic/admin/getUserContracts/${userID}?key=${this.key}`,
      this.header
    );
  }
  getUserDepositLogs(userID: string) {
    return this.http.get<Log[]>(
      `${this.rootURL}/api/transaction/admin/${userID}/getUserdeposits`,
      this.header
    );
  }
  getUserWithdrawLogs(userID: string) {
    return this.http.get<Log[]>(
      `${this.rootURL}/api/transaction/admin/${userID}/getUserwithdraws`,
      this.header
    );
  }

  //////////////////// Overview page /////////////////////////
  getOverviewData() {
    return this.http.get<any>(
      `${this.rootURL}/admin/OVERVIEW?key=${this.key}`,
      this.header
    );
  }

  //////////////////// Farm ///////////////////////
  getActiveWorkers() {
    return this.http.get<Worker[]>(
      `${this.rootURL}/api/farm/getactiveworkers?key=${this.key}`,
      this.header
    );
  }
  getInactiveWorkers() {
    return this.http.get<Worker[]>(
      `${this.rootURL}/api/farm/getnotactiveworkers?key=${this.key}`,
      this.header
    );
  }
  addNewWorker(worker: Worker) {
    return this.http.post(
      `${this.rootURL}/api/farm/addworker?key=${this.key}`,
      worker,

      this.header
    );
  }
  endWorker(workerID: string) {
    return this.http.put(
      `${this.rootURL}/api/farm/endworker/${workerID}?key=${this.key}`,
      {},
      this.header
    );
  }
  deleteWorker(workerID: string) {
    return this.http.delete(
      `${this.rootURL}/api/farm/deleteworker/${workerID}?key=${this.key}`,
      this.header
    );
  }
  errorHandler(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.authService.removeAuthData();
      return throwError(() => new Error(this.setErrors(err)));
    }
  }
  setErrors(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      if (err.status != 0) {
        errorMessage = err.error.message;
      }
    }
    return errorMessage;
  }
}
