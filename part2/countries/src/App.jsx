import { useState,useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) =>{

  const languages = country.languages

    let languagesList = []

    //iterate through the languages object

    for(const key in languages){
      languagesList.push(languages[key])
    } //add the languages to the list.

    return(
      <div>
        <br></br>
        <strong>{country.name.common}</strong>
        <br></br>
        <div>
          Capital: {country.capital[0]}
        </div>
        <div>
          Area: {country.area}
        </div>
        <br></br>
        <div>
          <strong>Languages:</strong>
          <ul>
          {languagesList.map((language,i)=><li key={i}>{language}</li>)}
          </ul>
        </div>
        <div>
          <strong>Flag:</strong>
          <br></br>
          <img src={country.flags.svg} width="50" height="50"/>
        </div>
      </div>
    )

}

const ShowCountries = ({ countries, setCountries }) =>{

  if(countries.length>10){
    return(
      <div>
        <strong>Too many matches,specify another filter.</strong>
      </div>
    )
  } else if (countries.length<10 && countries.length >1){


    return(
      <div>
        <strong>Countries:</strong>
        {countries.map(country=>{
          return (
            <div
            key={country.altSpellings[0]}>{country.name.common}
            <button onClick={()=>setCountries([country])}> show </button>
            </div>)
        })}
      </div>
      
    )
  } else if (countries.length === 1){

    const country = countries[0]

    return(
      <ShowCountry country={country}/>
    )

  }

}

const App = () => {

  const [country,setCountry] = useState('')

  const [allCountries,setAll] = useState(null) // all countries.

  const [countries,setCountries] = useState([]) //countries to show


  const handleChange = (event) =>{

    setCountry(event.target.value)
  }

  const allCountriesHook = () =>{

    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response)=>{

      setAll(response.data)
    })
  }

  useEffect(allCountriesHook,[]) //load all the countries once.

  const countryHook = () =>{

    if(allCountries){ //even though both useEffect() functions will run at the second render,
      //the the first useEffect function using the allCountriesHook, will run, it will do the axios.get()
      //while axios is retrieving the data, the retrival happens asychronously, so after the code reaches
      //the .get() the code will move on to the second useEffect() which takes as a function this
      //countryHook here and since the data will not be retrieved yet, our allCountries list will still be
      //null, that's why we need this if statement here.afterwards when we manipulate the 'country'
      //variable when typing in the form value this countryHook function will be executed again 
      //from the useEffect() and the allCountries variable will have the correct data.
      //this countryHook function gets executed every time we change the 'country' variable.

      console.log("ENTERED HERE!");

      //console.log(allCountries[0].name.common)

      //console.log(allCountries);

      console.log(country);

        const Countries = allCountries.filter((c) =>{

          if(c.name.common.toLowerCase().includes(country.toLowerCase()) && country!==''){

            return c

          }

        })

        console.log(Countries)

        setCountries(Countries)
      }
    
  }

  useEffect(countryHook,[country])





  return(

    <div>
      <form>
        find countries: <input value={country} onChange={handleChange}/> 
      </form>

      <ShowCountries countries={countries} setCountries={setCountries}/>
    </div>
    

  )
  
}

export default App
