import { useState, useEffect } from 'react'
import { DiaryEntry } from './types';
import { Visibility,Weather } from './types';
import axios from 'axios';

const Display = ({ diary }:{diary:DiaryEntry}) =>{

  return(
    <div>
      <strong> {diary.date} </strong>
      <br></br>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

const Err = ({ err }: {err:string | null}) =>{

  if( err != ''){

    return(
      <div>{err}</div>
    )
  }
}

const App = ()=>{

  const [ diaries,setDiaries ] = useState<DiaryEntry[]>([]);

  //states for all input fields:

  const [ date,setDate ] = useState('');

  const [visibil,setVisibility] = useState('');

  const [weat,setWeather] = useState('');

  const [comment,setComment] = useState('');

  const [error,setError] = useState('');

  //fetch all diaries first.

  useEffect(() =>{

    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response =>{

      setDiaries(response.data);
    })

  },[])

  const handleSubmit = (event:React.SyntheticEvent)=>{
    event.preventDefault();

    axios.post<DiaryEntry>('http://localhost:3000/api/diaries',{weather:weat,visibility:visibil,date:date,comment:comment}).then(
      response =>{

        setDiaries(diaries.concat(response.data));
      }
    ).catch(error =>{

      if(axios.isAxiosError(error)){

        setError(error.response?.data);

        setTimeout(() =>{

          setError('');

        },5000)
      }
    })

  }

  return (
    <div>
      <Err err={error}/>

      <h2>Add new entry</h2>

      <div>
        <strong>Date </strong> <input type='date' onChange={(event) => setDate(event.target.value)}/>
      </div>



      <div>
        <strong>Visibility </strong> 
      great <input type="radio" name="visib"
        onChange={() => setVisibility("great")} />
      good <input type="radio" name="visib"
        onChange={() => setVisibility("good")} />
      ok <input type="radio" name="visib"
        onChange={() => setVisibility("ok")} />
      poor <input type="radio" name="visib"
        onChange={() => setVisibility("poor")} />
      </div>

      <div>
        <strong>weather </strong> 
      sunny <input type="radio" name="wea"
        onChange={() => setWeather("sunny")} />
      rainy <input type="radio" name="wea"
        onChange={() => setWeather("rainy")} />
      cloudy <input type="radio" name="wea"
        onChange={() => setWeather("cloudy")} />
      stormy <input type="radio" name="wea"
        onChange={() => setWeather("stormy")} />
      windy <input type="radio" name="wea"
        onChange={() => setWeather("windys")} />
      </div>

      <form onSubmit={handleSubmit}>
        <div>comment<input value={comment} onChange={(event)=>setComment(event.target.value)}/></div>
        <button type='submit' >submit</button>
      </form>
      <h2>Diary entries</h2>
      <br></br>

      {diaries.map(diary =>{
        return(
          <Display key={diary.id} diary={diary}/>
        )
      })}
    </div>
  )
}

export default App
