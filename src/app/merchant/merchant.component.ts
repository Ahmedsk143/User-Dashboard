// import { Component, OnInit } from '@angular/core';
// import { Clipboard } from '@angular/cdk/clipboard';
// import { FormGroup } from '@angular/forms';
// export interface plantest {
//   _id: string;
//   planType: string;
//   planName: string;
//   cryptoName: string;
//   algorithm: string;
//   planDuration: number;
//   profitability: number;
//   price: number;
//   availability: boolean;
//   usersNum: number;
//   createdAt: number;
//   updatedAt: number;
// }
// @Component({
//   selector: 'app-merchant',
//   templateUrl: './merchant.component.html',
//   styleUrls: ['./merchant.component.scss'],
// })
// export class MerchantComponent implements OnInit {
//   newPlanForm: FormGroup;
//   editPlanForm: FormGroup;
//   // to control the choose currency dropdown menu
//   dropCollapsed = false;
//   // to control what is displayed on the trigger button
//   selected = 'all';
//   // to toggle the add new form
//   newFormOpend = false;
//   // to toggle the edit form
//   editFormOpend = false;
//   // to toggle the delete confirm
//   deleteConfirmOpend = false;
//   // to show the menu only on the selected miner
//   selectedPlan: any;
//   /// the selected miner to be edit
//   planToEdit: any;
//   // The plans shown to user
//   plans: plantest[] = [
//     {
//       _id: '321ads54das5d',
//       planType: 'short',
//       planName: 'Lite Miners',
//       cryptoName: 'BTC',
//       algorithm: 'SHA-256',
//       planDuration: 10,
//       profitability: 12,
//       price: 500,
//       availability: true,
//       usersNum: 1,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//     {
//       _id: '321ads54das5d',
//       planType: 'short',
//       planName: 'Lite Miners',
//       cryptoName: 'BTC',
//       algorithm: 'SHA-256',
//       planDuration: 10,
//       profitability: 12,
//       price: 500,
//       availability: true,
//       usersNum: 2,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//     {
//       _id: '321ads54das5d',
//       planType: 'short',
//       planName: 'Lite Miners',
//       cryptoName: 'BTC',
//       algorithm: 'SHA-256',
//       planDuration: 10,
//       profitability: 12,
//       price: 500,
//       availability: false,
//       usersNum: 3,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//     {
//       _id: '321ads54das5d',
//       planType: 'short',
//       planName: 'Lite Miners',
//       cryptoName: 'BTC',
//       algorithm: 'SHA-256',
//       planDuration: 10,
//       profitability: 12,
//       price: 500,
//       availability: false,
//       usersNum: 5,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//     {
//       _id: '321ads54das5d',
//       planType: 'short',
//       planName: 'Lite Miners',
//       cryptoName: 'BTC',
//       algorithm: 'SHA-256',
//       planDuration: 10,
//       profitability: 12,
//       price: 500,
//       availability: false,
//       usersNum: 0,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//   ];
//   plansLength: number;
//   BTCNum: number;
//   // error messages
//   newFormError = '';
//   updateFormError = '';
//   /////////////// Tabs
//   users: {
//     userName: string;
//     subs: number;
//     plans: plantest[];
//   }[] = [
//     {
//       userName: 'ahmedKhalil1111111@gmail.com',
//       subs: 2,
//       plans: [],
//     },
//     {
//       userName: 'ahmedKhalil2@gmail.com',
//       subs: 52,
//       plans: [],
//     },
//     {
//       userName: 'ahmedKhalil3333333@gmail.com',
//       subs: 20,
//       plans: [],
//     },
//     { userName: 'ahmedKhalil4444444@gmail.com', subs: 30, plans: [] },
//   ];
//   activeState: boolean[] = [true, false, false];

//   toggle(index: number) {
//     this.activeState[index] = !this.activeState[index];
//   }
//   constructor(private clipboard: Clipboard) {}

//   ngOnInit(): void {}
//   copyText(link: any) {
//     this.clipboard.copy(link);
//     console.log(link);
//   }
//   checkDisplayedPlans(plan: any) {
//     // if (plan.cryptoName.includes('BTC') && this.selected == 'tap1') {
//     //   return true;
//     // } else if (plan.cryptoName.includes('ETH') && this.selected == 'tap2') {
//     //   return true;
//     // } else if (plan.cryptoName.includes('RVN') && this.selected == 'tap3') {
//     //   return true;
//     // } else if (plan.cryptoName.includes('LTCT') && this.selected == 'tap4') {
//     //   return true;
//     // } else if (this.selected == 'all') {
//     //   return true;
//     // }
//     return true;
//   }
//   checkSelected(plan: any) {
//     // assign the plan name to the selected plan and editplan
//     // if (this.selectedPlan._id != plan._id) {
//     //   this.selectedPlan = plan;
//     //   this.planToEdit = plan;
//     //   this.editPlanForm.setValue({
//     //     _id: this.selectedPlan._id,
//     //     planType: this.selectedPlan.planType,
//     //     planName: this.selectedPlan.planName,
//     //     cryptoName: this.selectedPlan.cryptoName,
//     //     algorithm: this.selectedPlan.algorithm,
//     //     planDuration: this.selectedPlan.planDuration,
//     //     profitability: this.selectedPlan.profitability,
//     //     price: this.selectedPlan.price,
//     //     availability: true,
//     //     createdAt: this.selectedPlan.createdAt,
//     //   });
//     // } else {
//     //   this.selectedPlan = '';
//     // }
//   }
//   onNew() {
//     // if (this.newPlanForm.valid) {
//     //   const plan = this.newPlanForm.value;
//     //   console.log(plan);
//     //   this.dashboardService.addNewPlan(plan).subscribe({
//     //     next: () => {
//     //       window.location.reload();
//     //     },
//     //     error: (err) => {
//     //       this.dashboardService.errorHandler(err);
//     //       this.newFormError = 'Some errors occured, try again!';
//     //     },
//     //   });
//     // } else return;
//   }
//   onUpdate() {
//     // if (this.editPlanForm.valid) {
//     //   const plan = this.editPlanForm.value;
//     //   this.dashboardService.updatePlan(plan).subscribe({
//     //     next: () => {
//     //       const message = `'${this.editPlanForm.value.planName}' has been edited `;
//     //       //to update the view of the component without refersh
//     //       const updatedInedx = this.plans.findIndex((e) => {
//     //         return e._id == plan._id;
//     //       });
//     //       this.plans[updatedInedx] = plan;
//     //       // console.log(this.plans[updatedInedx]);
//     //       this.editPlanForm.reset();
//     //       this.editFormOpend = false;
//     //       //tp send message to the notification component
//     //       this.sharedSerivce.sentMessage.next({
//     //         message: message,
//     //         error: false,
//     //       });
//     //     },
//     //     error: (err) => {
//     //       this.dashboardService.errorHandler(err);
//     //       this.updateFormError = 'Some error occured, try again!';
//     //       console.log(err);
//     //     },
//     //   });
//     // } else return;
//   }
//   onDelete() {
//     // this.dashboardService.deletePlan(this.planToEdit).subscribe({
//     //   next: () => {
//     //     const message = `'${this.planToEdit.planName}' has been deleted `;
//     //     //to update the view of the component without refersh
//     //     const updatedInedx = this.plans.findIndex((e) => {
//     //       return e._id == this.planToEdit._id;
//     //     });
//     //     if (updatedInedx > -1) {
//     //       this.plans.splice(updatedInedx, 1);
//     //       this.plansLength = this.plans.length;
//     //     }
//     //     this.deleteConfirmOpend = false;
//     //     //to send message to the notification component
//     //     this.sharedSerivce.sentMessage.next({
//     //       message: message,
//     //       error: false,
//     //     });
//     //   },
//     //   error: (err) => {
//     //     this.dashboardService.errorHandler(err);
//     //   },
//     // });
//   }
//   updateAval(plan: any) {
//     //   this.editPlanForm.setValue({
//     //     _id: plan._id,
//     //     planType: plan.planType,
//     //     planName: plan.planName,
//     //     cryptoName: plan.cryptoName,
//     //     algorithm: plan.algorithm,
//     //     planDuration: plan.planDuration,
//     //     profitability: plan.profitability,
//     //     price: plan.price,
//     //     availability: !plan.availability,
//     //     createdAt: plan.createdAt,
//     //   });
//     //   this.dashboardService.updatePlan(this.editPlanForm.value).subscribe({
//     //     next: () => {
//     //       const message = `'${this.editPlanForm.value.planName}' availability has been changed  `;
//     //       //to update the view of the component without refersh
//     //       const updatedInedx = this.plans.findIndex((e) => {
//     //         return e._id == plan._id;
//     //       });
//     //       this.plans[updatedInedx] = plan;
//     //       // console.log(this.plans[updatedInedx]);
//     //       this.editPlanForm.reset();
//     //       //tp send message to the notification component
//     //       this.sharedSerivce.sentMessage.next({
//     //         message: message,
//     //         error: false,
//     //       });
//     //     },
//     //     error: (err) => {
//     //       this.dashboardService.errorHandler(err);
//     //       console.log(err);
//     //     },
//     //   });
//   }
//   onTabOpen(e: any) {
//     var index = e;
//     // console.log(index);
//   }
//   getUserPlans(user: any) {
//     console.log(user);
//     const index = this.users.findIndex((e) => {
//       return e.userName == user.userName;
//     });
//     this.users[index].plans = [
//       {
//         _id: '321ads54das5d',
//         planType: 'short',
//         planName: 'Lite Miners',
//         cryptoName: 'BTC',
//         algorithm: 'SHA-256',
//         planDuration: 10,
//         profitability: 12,
//         price: 500,
//         availability: true,
//         usersNum: 1,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//       },
//       {
//         _id: '321ads54das5d',
//         planType: 'short',
//         planName: 'Lite Miners',
//         cryptoName: 'BTC',
//         algorithm: 'SHA-256',
//         planDuration: 10,
//         profitability: 12,
//         price: 500,
//         availability: true,
//         usersNum: 1,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//       },
//       {
//         _id: '321ads54das5d',
//         planType: 'short',
//         planName: 'Lite Miners',
//         cryptoName: 'BTC',
//         algorithm: 'SHA-256',
//         planDuration: 10,
//         profitability: 12,
//         price: 500,
//         availability: true,
//         usersNum: 1,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//       },
//       {
//         _id: '321ads54das5d',
//         planType: 'short',
//         planName: 'Lite Miners',
//         cryptoName: 'BTC',
//         algorithm: 'SHA-256',
//         planDuration: 10,
//         profitability: 12,
//         price: 500,
//         availability: true,
//         usersNum: 1,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//       },
//     ];
//   }
// }
