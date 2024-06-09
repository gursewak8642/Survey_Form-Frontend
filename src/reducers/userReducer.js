// reducers/userReducer.js
const initialState = {
    name: '', // Initial state for the user's name
    surveyId:  0,
    questionId: 1,
    nextQuestionId: 1,
    questions: [],
    options: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_NAME':
        return {
          ...state,
          name: action.payload,
        };
      case 'SET_SURVEY_ID':
        return {
          ...state,
          surveyId: action.payload,
        };
      case 'SET_QUESTION_ID':
        return {
          ...state,
          questionId: action.payload,
        };
      case 'SET_Next_QUESTION_ID':
        return {
          ...state,
          nextQuestionId: action.payload,
        };
      case 'All_QUESTIONS':
        return {
          ...state,
          questions: action.payload,
        };
      case 'All_OPTIONS':
        return {
          ...state,
          options: action.payload,
        };
      // Add more cases to handle other actions if needed
      default:
        return state;
    }
  };
  
  export default userReducer;
  