import { IAction, UserStoreActions } from "../../actions"

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
        case UserStoreActions.Login:
            return Object.assign({}, state, {
                token: action.payload,
                authenticated: !!action.payload
            })
        case UserStoreActions.Logout:
            return Object.assign({}, state, {
                token: "",
                authenticated: false
            })
        default:
            return state
    }
}