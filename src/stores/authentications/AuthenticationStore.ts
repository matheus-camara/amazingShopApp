import { IAction } from "../../actions"

export interface IAuthenticationState {
    token: string,
    authenticated: boolean
}

const AuthenticationInitialState: IAuthenticationState = {
    token: "",
    authenticated: false
}

export const AuthenticationStore = (state = AuthenticationInitialState, action: IAction<null>) => {
    switch (action.type) {
        default:
            return state
    }
}