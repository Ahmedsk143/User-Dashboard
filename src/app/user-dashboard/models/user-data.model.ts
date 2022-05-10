export class UserData {
  activeDemoPlans: number;
  activePlans: number;
  balance: { rvn: number; ltct: number; eth: number; btc: number };
  createdAt: Date;
  demoBalance: { rvn: number; ltct: number; eth: number; btc: number };
  devices: number;
  email: string;
  phone: string;
  temporary: { code: number };
  userName: string;
}
