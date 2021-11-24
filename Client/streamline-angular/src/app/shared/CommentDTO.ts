import { TicketDTO } from "../ticket/shared/TicketDTO";
import { UserDTO } from "./UserDTO";

export interface CommentsDTO {
    commentId: number,
    timestamp: Date,
    commentText: string,
    user: UserDTO,
    ticket: TicketDTO,
}