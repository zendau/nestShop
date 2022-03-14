export interface IWorkerDTO {
  userId: number;
  name: string;
  birtday: Date;
  phone: string;
  address: string;
  salary: number;
  workerRole: number;
}

export interface IEditWorkerDTO extends IWorkerDTO {
  workerId: number;
}
