const initState = {
    authError: null,
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'CLEAR_ERROR':
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Neuspešno logovanje'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success', action.user)
            return {
                ...state,
                authError: null,
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return {
                ...state,
                user: null
            }
            
        default:
            return state;
    }
}

export default authReducer;