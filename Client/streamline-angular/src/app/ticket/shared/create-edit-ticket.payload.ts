export interface CreateEditTicketPayload {
    ticketId: string;
    createDate: Date;
    estimatedTime: number;
    actualTime: number;
    status: string;
    assignedTo: any;
    assignee: any;
    dueDate: Date;
    summary: string;
    description: string;
    priority: string;
}