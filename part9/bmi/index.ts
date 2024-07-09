import express from 'express';
//in typescript note you can actually use import instead of requires,
//assuming you install the devDependency of "@types/express"
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

//with import instead of require and "@types/express"
//vscode recognizes the type of req and res variables.

app.use(express.json()) //necessary middleware for app.POST

app.get('/hello', (_req, res) => {

  res.send('Hello Full Stack!');
  
});

app.get('/bmi', (req,res) => {

    if(!req.query.height || !req.query.weight){
        return res.status(400).json({error:'Height and weight is required!'});
    }


    if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){

        return res.status(400).json({error:'height and weight must be numbers!'});
    }

    const height:number = Number(req.query.height);
    const weight:number = Number(req.query.weight);

    
    if(height <= 0 || weight <= 0 ){

        return res.status(400).json({error:'height and weight must be positive numbers!'});
    }

    return res.status(200).json({height:height,weight:weight,bmi:calculateBmi(height,weight)});
})

app.post('/exercises', (req,res)=>{

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyHours:any = req.body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target:any = req.body.target;

    //set every value of daily hours to a number on this new list
    const numberHours:number[] = [];

    if(!dailyHours || !target){
        return res.status(400).json({error:"parameters missing."});
    }

    if(isNaN(Number(target)) || Number(target) < 0 ){
        return res.status(400).json({error:"malformatted parameters"});
    }

    if(dailyHours.length === 0){
        return res.status(400).json({error:"parameters missing."});
    }


    for(const value of dailyHours){
        if(!isNaN(Number(value))){

            if(Number(value) < 0){
                return res.status(400).json({error:"malformatted parameters"});
            }

            numberHours.push(Number(value));
        } else {
            return res.status(400).json({error:"malformatted parameters"});
        }
    }


    const result = calculateExercises(numberHours,Number(target));


    return res.status(200).json(result);




})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});