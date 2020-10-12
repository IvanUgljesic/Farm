const initState = {
    rams: [
    ],
    progress: [],
    showAddForm: false,
    showDeleteForm: false,
    working: false
}

const ramsReducer = (state = initState, action) => {

    switch(action.type){
        case 'WORKING':
            return {
                ...state,
                working: action.working
            }
        case 'PROGRESS_BAR':
            return {
                ...state,
                progress: action.precentage
            }
        case 'SWITCH_SHOW_ADD_FORM':
            return {
                ...state,
                showAddForm: action.newValue,
                showDeleteForm: false
            }
        case 'SWITCH_SHOW_DELETE_FORM':
            return {
                ...state,
                showDeleteForm: action.newValue,
                showAddForm: false
            }
        case 'CREATE_RAM':
            console.log('creating ram', action.file, action.content);
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