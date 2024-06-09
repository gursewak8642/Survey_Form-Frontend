    // // src/components/SurveySelection.js
    // import React from 'react';
    // import './Survey.css';

    // const SurveySelection = ({ name }) => {
    //   const surveys = ['Survey 1', 'Survey 2', 'Survey 3'];

    //   const handleSelect = (survey) => {
    //     alert(`You selected: ${survey}`);
    //   };

    //   return (
    //     <div className="survey-selection">
    //       <h2>Welcome, {name}</h2>
    //       <h3>Select a survey to fill:</h3>
    //       <ul>
    //         {surveys.map((survey, index) => (
    //           <li key={index}>
    //             <button onClick={() => handleSelect(survey)}>{survey}</button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   );
    // };

    // export default SurveySelection;


    // src/components/SurveySelection.js
    import React, { useEffect, useState } from 'react';
    import './Survey.css';
    import axios from 'axios';
    import { Navigate } from "react-router-dom";
    import { useDispatch, useSelector } from 'react-redux';

    const SurveySelection = ({ name, proceedToNextPage }) => {
    //   const surveys = ['Survey 1', 'Survey 2', 'Survey 3'];
    const [selectedSurvey, setSelectedSurvey] = useState('');
    const [surveys, setSurveys] = useState([]);
    const [redirectToSurvey, setRedirectToSurvey] = useState(false);
    const userName = useSelector(state => state.user.name);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSurveys = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/surveys');
            console.log(response)
            setSurveys(response.data.data);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
        };

        fetchSurveys();
    }, []);
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
    const handleSelectionChange = (e) => {
        const selectedValue = e.target.value;
        const selectedSurvey = surveys.find(survey => survey.Title === selectedValue);
        if (selectedSurvey) {
        console.log('ID:', selectedSurvey.SurveyID, 'Value:', selectedValue);
        setSelectedSurvey(selectedValue);
        dispatch({
            type: 'SET_SURVEY_ID',
            payload: selectedSurvey.SurveyID
        })
        } else {
        console.error('Survey not found for value:', selectedValue);
        }
    };
    const handleNextClick = () => {
        if (selectedSurvey) {
            setRedirectToSurvey(true); // Set redirectToSurvey to true to trigger navigation
        } else {
            alert('Please select a survey to proceed.');
        }
        };

        return redirectToSurvey ? (
            <Navigate to="/survey/quiz" />
        ) : (
            <div className="survey-selection">
            <h2>Welcome, {userName}</h2>
            <h3>Available Surveys:</h3>
            <ul>
                {surveys.map((survey) => (
                <li key={survey.SurveyID}>
                    <label>
                    <input
                        type="radio"
                        name="survey"
                        value={survey.Title}
                        checked={selectedSurvey === survey.Title}
                        onChange={handleSelectionChange}
                    />
                    {survey.Title}
                    </label>
                </li>
                ))}
            </ul>
            <button className="next-button" onClick={handleNextClick}>
                Next
            </button>
            </div>
        );
        };
        
    export default SurveySelection;
