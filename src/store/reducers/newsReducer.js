const initState = {
    news: [
    ],
    progress: 0,
    showAddForm: false,
    showDeleteForm: false
}

const newsReducer = (state = initState, action) => {

    switch(action.type){
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
        case 'CREATE_A_PIECE_OF_NEWS':
            console.log('creating news', action.file, action.content);
            return state;
        case 'CREATE_A_PIECE_OF_NEWS_ERROR':
            console.log('error creating a piece of news', action.err);
            return state;
        case 'DELETE_A_PIECE_OF_NEWS':
            console.log('deleted a piece of news', action.url);
            return state;
        case 'DELETE_A_PIECE_OF_NEWS_ERROR':
            console.log('deleted a piece of news error', action.err);
            return state;
        default:
            return state;    
    }
}

export default newsReducer;