import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentList from './Components/Q1.jsx'
import LogMessage from './Components/Q2'
import ProfileCardList from './Components/Q3'
import UserNameField from './Components/Q4'
import Form from './Components/Q5'
import Products from './Components/Q6'
import Q7P from './Components/Q7P'
import Q8 from './Components/Q8'
import Q9 from './Components/Q9'
import Q10 from './Components/Q10'
import Q11 from './Components/Q11'
import Q12 from './Components/Q12'
import Q13 from './Components/Q13'
import Q14 from './Components/Q14'
import Q15 from './Components/Q15'
import Q16 from './Components/Q16'
import Q17 from './Components/Q17'
import Q18 from './Components/Q18'
import Q19 from './Components/Q19'
import Q20 from './Components/Q20'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ padding: '20px' }}>
         <StudentList />
        <hr />
         <LogMessage />
        <hr />
         <ProfileCardList />
        <hr />
         <UserNameField />
        <hr />
         <Form />
        <hr />
         <Products />
        <hr />
        <Q7P />
        <hr />
        <Q8 />
        <hr />
        <Q9 />
        <hr />
        <Q10 />
        <hr />
        <Q11 />
        <hr />
        <Q12 />
        <hr />
        <Q13 />
        <hr />
        <Q14 />
        <hr />
        <Q15 />
        <hr />
        <Q16 />
        <hr />
        <Q17 />
        <hr />
        <Q18 />
        <hr />
        <Q19 />
        <hr />
        <Q20 />
      </div>
    </>
  )
}

export default App
