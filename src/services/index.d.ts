export type Ttoken = {
    username:string,
    password:string,
    request_token:string
}
export type TResponseToken = {
    success:boolean,
    expires_at:string,
    status_code:number,
    request_token:string
}

export type createSession = {
    success:boolean,
    session_id:string
}
