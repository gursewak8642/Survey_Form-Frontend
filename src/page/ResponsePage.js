// import React, { useState, useEffect } from 'react';
// import './ResponsePage.css';

// const ResponsePage = () => {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Replace 'http://localhost:5000/api/responses' with your actual API endpoint
//     fetch('http://localhost:5000/api/responses')
//       .then(response => response.json())
//       .then(data => {
//         setResponses(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching responses:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="response-page">
//       <h1>Survey Responses</h1>
//       {responses.length > 0 ? (
//         responses.map((response, index) => (
//           <div key={index} className="response-item">
//             <h2>User: {response.userId}</h2>
//             <h3>Survey: {response.surveyId}</h3>
//             <ul>
//               {response.answers.map((answer, i) => (
//                 <li key={i}>
//                   <strong>Question:</strong> {answer.questionText}
//                   <br />
//                   <strong>Answer:</strong> {answer.optionSelected}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No responses available.</p>
//       )}
//     </div>
//   );
// };

// export default ResponsePage;


// ---------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './ResponsePage.css';

// const ResponsePage = () => {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/userResponses/1') // Replace '1' with the actual user ID
//       .then(response => response.json())
//       .then(data => {
//         setResponses(data.data); // Assuming response data is in the format { status: true, data: [] }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching responses:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="response-page">
//       <h1>Survey Responses</h1>
//       {responses.length > 0 ? (
//         responses.map(response => (
//           <div key={response.ResponseID} className="response-item">
//             <h2>User: {response.User.Name}</h2>
//             <h3>Survey: {response.Question.SurveyID}</h3>
//             <ul>
//               <li>
//                 <strong>Question:</strong> {response.Question.QuestionText}
//                 <br />
//                 <strong>Answer:</strong> {response.AnswerOption.OptionText}
//               </li>
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No responses available.</p>
//       )}
//     </div>
//   );
// };

// export default ResponsePage;


import React, { useEffect, useState } from 'react';
import './ResponsePage.css';
import axios from 'axios';
import { Link} from "react-router-dom";

const ResponsePage = () => {
  const [responses, setResponses] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const UserID = localStorage.getItem("UserID");
        const response = await axios.get(`http://localhost:8000/api/userResponses/${UserID}`);
        if (response.data.success) {
          setResponses(response.data.data);
          if (response.data.userName) {
            setUserName(response.data.userName);
          }
        } else {
          setError('Error fetching responses: ' + response.data.error);
        }
      } catch (error) {
        setError('Error fetching responses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log('responses', responses)
  return (
    <div className="response-page">
      <h1>Survey Responses</h1>
      <h2>User: {userName}</h2>
      {responses && responses.map((response, index) => (
        <div key={index} className="response-item">
          <ul>
              <li key={index}>
                <strong>{response.Question}</strong>: {response.Answer}
              </li>
          </ul>
        </div>
      ))}
       <Link to="/">
        <button type="button" onClick={()=>localStorage.setItem("UserID",false)}>Reset</button>
      </Link>
    </div>
  );
};

export default ResponsePage;
