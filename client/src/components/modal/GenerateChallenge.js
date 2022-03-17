import { useState } from 'react';

const GenerateChallenge = ({
  className,
  answer
}) => {
  const [status, setStatus] = useState('not generated');
  const [challengeId, setChallengeId] = useState('');

  // generate a challenge
  const generate = () => {
    setStatus('loading');
    fetch('http://localhost:8080/api/v1/challenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answer: answer })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      setChallengeId(result.id);
      setStatus('generated');
    })
    .catch(error => {
      console.log(error);
      setStatus('not generated');
    });
  }

  const selectLink = (e) => {
    e.target.select();
  }

  if (status === 'generated') {
    return <input className={`${className} w-full border border-black rounded p-2 caret-transparent text-center`} value={`localhost:3000/${challengeId}`} onFocus={selectLink} readOnly></input>
  } else if (status === 'not generated') {
    return (
      <button onClick={generate} className={`${className} w-full border border-black rounded p-2 hover:border-gray-400 hover:text-gray-500 transition duration-250`}>
        Challenge a friend
      </button>
    )
  } else if (status === 'loading') {
    return (
      <button className={`${className} w-full border border-black rounded p-2 flex justify-center items-center`} disabled>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Generating...
      </button>
    )
  } else {
    return <></>
  }
}


export default GenerateChallenge;
