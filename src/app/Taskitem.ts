
export interface Taskitem {
  name: string;
  complete: boolean;
}
export interface Task {
  id: number;
  name: string;
  taskItemList: Taskitem[];
  timestamp: Date;
}
