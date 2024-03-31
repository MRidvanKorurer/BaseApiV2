import {Document} from "mongoose";


export interface ItemporyToken{
    _id:string,
    email:string
}


interface Reset {
    code: string,
    time: string
}


export default interface IAuth extends Document {
    _id: string,
    name: string;
    lastname: string;
    email: string;
    password: string;
    reset: Reset;
}