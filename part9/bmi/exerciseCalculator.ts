interface Results { //how the results object should be shaped.
    periodLength: number; 
    trainingDays: number;
    success:boolean;
    rating:number;
    ratingDescription:string;
    target:number;
    average:number;
  }

interface arguments {
    hours:number[];
    target:number;
}

  const parseArguments = (args: string[]): arguments => {

    if (args.length < 4) throw new Error('Not enough arguments');
    
    const hours:number[] = [];


    if(isNaN(Number(args[2]))){
        throw new Error('The target value is not a number!');
    }


    for(let i=3;i<args.length;i++){

        if(!isNaN(Number(args[i]))){

            if(Number(args[i]) < 0){
                throw new Error("No negative hours are allowed!");
            }

            hours.push(Number(args[i]));

        } else {
            throw new Error('One of the provided hours was not a number!');
        }

    }

    

   return {
    hours:hours,
    target:Number(args[2])
   }

  }


  export const calculateExercises = (dailyHours:number[],target:number):Results =>{

    const periodLength:number = dailyHours.length;

    let trainingDays:number = 0;

    let success:boolean =false;

    let rating:number = -1;

    let ratingDescription:string = "";

    let average:number;

    let sum:number = 0;

    for(const hours of dailyHours){

        if(hours>0){
            trainingDays+=1;
        }

        sum+=hours;
    }

    average = sum / periodLength;

    if(average >= target){
        success=true;
        ratingDescription='Target reached,good job';
        rating = 3;
    } else if (average>0 && average<=target){
        success=false;
        ratingDescription='Target not reached,could have done better.';
        rating = 2;
    } else if (average === 0){
        success=false;
        ratingDescription='Didnt workout at all, absolute fail.'
        rating = 1;
    }


    return {
        periodLength:periodLength,
        trainingDays:trainingDays,
        success:success,
        rating:rating,
        ratingDescription:ratingDescription,
        target:target,
        average:average
    }

  }


try{

    const { hours,target } = parseArguments(process.argv)

    console.log(calculateExercises(hours,target));
    

}catch(error:unknown){

    let errorMessage = 'Something bad happened.'

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}