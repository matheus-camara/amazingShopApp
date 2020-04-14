import { IAction, UserStoreActions } from "../../actions"

export interface IAuthenticationState {
    token: string,
    authenticated: boolean
}

const AuthenticationInitialState: IAuthenticationState = {
    token: "",
    authenticated: true
}

export const AuthenticationStore = (state = AuthenticationInitialState, action: IAction<string>) => {
    switch (action.type) {
        case UserStoreActions.Login:
            return Object.assign({}, state, {
                token: action.payload,
                authenticated: !!action.payload
            })
        case UserStoreActions.Logout:
            console.log("faio")
            return Object.assign({}, state, {
                token: "",
                authenticated: false
            })
        default:
            console.log(state)
            return state
    }
}