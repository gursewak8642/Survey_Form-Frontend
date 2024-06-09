// import React, { useEffect, useState } from "react";
// import "./QuizPage.css";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// const StaticQuiz = () => {
//   const dispatch = useDispatch();
//   const surveyId = useSelector((state) => state.user.surveyId);
//   const userId = localStorage.getItem('UserID');
//   const [questions, setQuestions] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/questions/${surveyId}`
//         );
//         setQuestions(response.data.data);
//         dispatch({
//           type: "SET_QUESTIONS",
//           payload: response.data.data,
//         });
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchQuestions();
//   }, [surveyId, dispatch]);

//   useEffect(() => {
//     const fetchOptionsByQuestionId = async (questionId) => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/options/${questionId}`
//         );
//         setOptions(response.data.data);
//         dispatch({
//           type: "SET_OPTIONS",
//           payload: response.data.data,
//         });
//       } catch (error) {
//         console.error("Error fetching options:", error);
//       }
//     };

//     if (questions.length > 0) {
//       const currentQuestionId = questions[currentQuestionIndex]?.QuestionID;
//       fetchOptionsByQuestionId(currentQuestionId);
//     }
//   }, [questions, currentQuestionIndex, dispatch]);

//   const handleAnswerButtonClick = async (optionId) => {
//     const option = options.find((opt) => opt.OptionID === optionId);
//     if (!option) return;

//     const currentQuestion = questions[currentQuestionIndex];
//     const nextQuestionId =
//       currentQuestionIndex % 2 !== 0
//         ? option.NextQuestionEven
//         : option.NextQuestionOdd;

//     const nextQuestionIndex = questions.findIndex(
//       (question) => question.QuestionID === nextQuestionId
//     );

//     // Store user response
//     try {
//       const responsePayload = {
//         UserID: userId,
//         QuestionID: currentQuestion.QuestionID,
//         OptionID: optionId
//       };

//       await axios.post("http://localhost:8000/api/user-response", responsePayload);
//       console.log("User response stored successfully:", responsePayload);

//       if (nextQuestionIndex !== -1) {
//         setCurrentQuestionIndex(nextQuestionIndex);
//       } else {
//         console.error("Next question not found!");
//       }
//     } catch (error) {
//       console.error("Error storing user response:", error);
//     }
//   };

//   return (
//     <div className="quiz">
//       <div className="question-section">
//         <div className="question-count">
//           <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
//         </div>
//         <div className="question-text">
//           {questions[currentQuestionIndex]?.QuestionText}
//         </div>
//       </div>
//       <div className="answer-section">
//         {options.map((option) => (
//           <button
//             key={option.OptionID}
//             onClick={() => handleAnswerButtonClick(option.OptionID)}
//           >
//             {option.OptionText}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StaticQuiz;


import React, { useEffect, useMemo, useState } from "react";
import "./QuizPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaticQuiz = () => {
  const dispatch = useDispatch();
  const surveyId = useSelector((state) => state.user.surveyId);
  const userId = localStorage.getItem('UserID');
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const navigate = useNavigate();
const TotalScore=5;
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/questions/${surveyId}`
        );
        setQuestions(response.data.data);
        dispatch({
          type: "SET_QUESTIONS",
          payload: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [surveyId, dispatch]);

  useEffect(() => {
    const fetchOptionsByQuestionId = async (questionId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/options/${questionId}`
        );
        setOptions(response.data.data);
        dispatch({
          type: "SET_OPTIONS",
          payload: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    if (questions.length > 0) {
      const currentQuestionId = questions[currentQuestionIndex]?.QuestionID;
      fetchOptionsByQuestionId(currentQuestionId);
    }
  }, [questions, currentQuestionIndex, dispatch]);

  useMemo(() => {
    if(TotalScore===score){
        navigate('/survey/quiz/response');
        setShowSubmitButton(true);
    }
  }, [score, setScore]);
  useEffect(() => {
    const handleWindowReload = () => {
      localStorage.setItem("UserID", false);
      window.location.href = "/";
    };

    window.addEventListener("beforeunload", handleWindowReload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowReload);
    };
  }, []);
  const handleAnswerButtonClick = async (optionId) => {
    const option = options.find((opt) => opt.OptionID === optionId);
    if (!option) return;

    const currentQuestion = questions[currentQuestionIndex];
    const nextQuestionId =
      currentQuestionIndex % 2 == 0
        ? option.NextQuestionEven
        : option.NextQuestionOdd;

    const nextQuestionIndex = questions.findIndex(
      (question) => question.QuestionID === nextQuestionId
    );

    try {
      const responsePayload = {
        UserID: userId,
        QuestionID: currentQuestion.QuestionID,
        OptionID: optionId
      };

      await axios.post("http://localhost:8000/api/user-response", responsePayload);
      console.log("User response stored successfully:", responsePayload);

      if (nextQuestionIndex !== -1) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setScore(score + 1);
      } else {
        console.error("Next question not found!");
        setShowSubmitButton(true);
      }
    } catch (error) {
      console.error("Error storing user response:", error);
    }
  };

  const handleSubmit = () => {
    alert("Quiz submitted successfully!");
    navigate("/survey/quiz/response"); // Navigate to the response page
  };

  return (
    <div className="quiz">
      <div className="question-section">
        <div className="question-count">
          <span>Question {score + 1}</span>/{TotalScore}
        </div>
        <div className="question-text">
          {questions[currentQuestionIndex]?.QuestionText}
        </div>
      </div>
      <div className="answer-section">
        {options.map((option) => (
          <button
            key={option.OptionID}
            onClick={() => handleAnswerButtonClick(option.OptionID)}
          >
            {option.OptionText}
          </button>
        ))}
      </div>
      {showSubmitButton && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default StaticQuiz;
 
