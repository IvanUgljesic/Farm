const initState = {
    rams: [
    ],
    progress: [],
    currentRamForm: '',
    working: false
}

const ramsReducer = (state = initState, action) => {

    switch(action.type){
        case 'WORKING':
            return {
                ...state,
                working: action.working
            }
        case 'EDIT_RAM':
            console.log('ram edited', action.id)
            return{
                ...state,
                currentRamForm: action.current
            }
        case 'EDIT_RAM_ERROR':
            console.log('ram edit error', action.err)
            return{
                ...state
            }
        case 'PROGRESS_BAR':
            return {
                ...state,
                progress: action.precentage
            }
        case 'SWITCH_RAM_FORM':
            return {
                ...state,
                currentRamForm: action.current,
            }
        case 'CREATE_RAM':
            console.log('creating ram', action.res);
            return state;
        case 'CREATE_RAM_ERROR':
            console.log('error ram', action.err);
            return state;
        case 'DELETE_RAM':
            console.log('deleted ram', action.url);
            return state;
        case 'DELETE_RAM_ERROR':
            console.log('deleted ram error', action.err);
            return state;
        default:
            return state;    
    }
}

export default ramsReducer;