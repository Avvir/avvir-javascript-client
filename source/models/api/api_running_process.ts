import ProcessStatus from "../enums/process_status";

export class ApiRunningProcess {
    constructor(runningProcess: ApiRunningProcess) {
        this.id = runningProcess.id;
        this.name = runningProcess.name;
        this.status = runningProcess.status;
        this.startDate = runningProcess.startDate;
        this.endDate = runningProcess.endDate;
        this.message = runningProcess.message;
    }

    id: number;
    name: string;
    status: ProcessStatus;
    startDate: Date;
    endDate?: Date;
    message?: string;
}

export default ApiRunningProcess;