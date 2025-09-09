
export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface InitialState{
    error: null| boolean,
    isLoading: boolean,
    isLoggedIn: boolean
}
