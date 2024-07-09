
interface args {
    height:number
    weight:number
}

const parseArgs = (args: string[]):args => {

    if (args.length < 4) throw new Error('Not enough arguments');
    

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){

        if(Number(args[2]) === 0 || Number(args[3]) === 0){
            throw new Error('Height or weight cannot be zero!')
        }

        return {
            height:Number(args[2]),
            weight:Number(args[3])
        }
    } else {

        throw new Error('Either height or weight is not a number!')
    }

    
}


export const calculateBmi =(height:number,weight:number):string =>{

    const denominator:number = (height/100) * (height/100)

    const BMI:number =  weight / denominator

    if(BMI<18.5){
        return 'Underweight (unhealthy weight)';
    } else if (BMI>=18.5 && BMI<=24.9){
        return 'Normal (healthy weight)';
    } else {
        return 'Overweight (Unhealthy weight)';
    }
    
}

try{

    const { height,weight } = parseArgs(process.argv);

    console.log(calculateBmi(height,weight));
    

}catch(error:unknown){

    let errorMessage = 'Something bad happened.'

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}