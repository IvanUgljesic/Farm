const initState = {
    news: [
    ],
    progress: 0,
    currentNewsForm: '',
}

const newsReducer = (state = initState, action) => {

    switch(action.type){
        case 'PROGRESS_BAR':
            return {
                ...state,
                progress: action.precentage
            }
        case 'SWITCH_NEWS_FORM':
            return {
                ...state,
                currentNewsForm: action.current,
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