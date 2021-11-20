export interface CreateEditTicketPayload {
    ticketId: string;
    createDate: Date;
    estimatedTime: number;
    actualTime: number;
    status: string;
    assignedTo: string;
    assignee: string;
    dueDate: Date;
    summary: string;
    description: string;
    priority: string;
}