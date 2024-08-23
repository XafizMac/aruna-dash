enum Status {
    ACTIVE,
    INACTIVE
}

export interface User {
    id: number;
    status: Status;
    email: string;
    username: string;
}

export interface Admin {
    id: number;
    username: string;
    email: string;
}