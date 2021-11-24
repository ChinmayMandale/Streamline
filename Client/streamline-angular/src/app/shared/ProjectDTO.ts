import { TicketDTO } from "../ticket/shared/TicketDTO";
import { UserDTO } from "./UserDTO";

export interface ProjectDTO {
    projectId: number,
    projectName: string,
    users: Array<UserDTO>,
    tickets: Array<TicketDTO>,
}