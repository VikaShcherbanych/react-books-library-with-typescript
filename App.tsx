import React from 'react';
import './App.css';
//import { Input } from './input';

//apikey = pjDx1UgcbMBBNQg7RGulL8yTvwUeGYgc'

function App() {
  // const [name, setName] = useState('')
  // const [lastname, setLastname] = useState('')
  // const [experience, setExperience] = useState('junior')

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCdKkZkP9Nhs2RAnhVWdIsglXs0atKxwiU`)
  //   .then(data => data.json())
  //   .then(data => console.log(data))
  // }, [name]);
  
  // const hahdleChangeName = (e) => setName(e.currentTarget.value)
  // const hahdleChangeLastname = (e) => setLastname(e.currentTarget.value)
  // const hahdleChangeExperience = (e) => {
  //   setExperience(e.currentTarget.value)
  //   console.log(e.currentTarget.value)
  // }
  return (
    <div className="App">
      <h2>Typescript</h2>
      {/* <h2>Name: {name}</h2>
      <h2>Lastname: {lastname}</h2>
      <Input
      onChangeName={hahdleChangeName}
      onChangeLastname={hahdleChangeLastname}
      onChangeExp={hahdleChangeExperience}
      experience={experience}
      /> */}
    </div>
  );
}

export default App;