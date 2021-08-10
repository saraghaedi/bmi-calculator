/*jshint esversion: 6 */
///////////////////////
// CALCULATION FUNCTIONS
///////////////////////

function calculateBMI(weight, height) {
    return Math.round(weight / (height * height));
}

function calculateBMR(weight, height, gender, age) {
    if (gender === 'm') {
        return 10 * weight + 6.25 * (height * 100) - 5 * age + 50;
    } else {
        return 10 * weight + 6.25 * (height * 100) - 5 * age - 150;
    }
}

function calculateIdealWeight(height) {
    return 22.5 * height * height;
}

function calculateDailyCalories(bmr, dailyexercise) {
    if (dailyexercise === "yes") {
        return bmr * 1.6;
    } else {
        return bmr * 1.4;
    }
}

function calcDietWeeks(weight, idealWeight) {
    return Math.abs(Math.round((weight - idealWeight) / 0.5));
}

function calcDietCalories(weight, idealWeight, dailyCalUsage) {
    if (weight - idealWeight > 0) {
        return Math.round(dailyCalUsage) - 500;
    } else {
        return Math.round(dailyCalUsage) + 500;
    }
}

///////////////////////
// VALIDATION FUNCTIONS
///////////////////////

function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
          You gave ${argv.length - 2} arguments(s) to the program
      
          Please provide 5 arguments for
          
          weight (kg), 
          height (m), 
          age (years), 
          whether you exercise daily (yes or no)
          and your gender (m or f)
          
          Example:
      
          $ node index.js 82 1.79 32 yes m
        `);

        process.exit();
    }
}

function validateWeightHeightAndAge(weight, height, age, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        console.log(`
          Please make sure weight, height and age are numbers:
      
          weight (kg) example: 82 | your input: ${rgv[2]}
          height (m) example 1.79 | your input: ${argv[3]}
          age (years) example 32  | your input: ${argv[4]} 
      
          $ node index.js 82 1.79 32 yes m
        `);

        process.exit();
    }

    if (age < 20) {
        console.log(
            `
            This BMI calculator is designed for people over 20.`
        );
        process.exit();
    }

    if (weight > 300 || weight < 30) {
        console.log(`
            Please provide a number for weight in kilograms between 30 and 300
    
            $ node index.js 82 1.79 32 yes m `);
        process.exit();
    }
}

function validateDailyExercise(dailyexercise) {
    if (dailyexercise !== "yes" && dailyexercise !== "no") {
        console.log(`
            Please specify if you exercise daily with "yes" or "no".
    
            $ node index.js 82 1.79 32 yes m 
            $ node index.js 82 1.79 32 no m `);
        process.exit();
    }
}

function validateGender(gen) {
    if (gen !== "f" && gen !== "m") {
        console.log(`
            Please specify your gender with "m" for male or "f" for female.
            
            $ node index.js 82 1.79 32 yes m 
            $ node index.js 82 1.79 32 yes f `);
        process.exit();
    }

}

///////////////////////
// OUTPUT
/////////////////////// 

function formatOutput(userObject) {
    return `
      **************
      BMI CALCULATOR
      **************
  
      age: ${userObject.age} years
      gender: ${userObject.gender}
      height: ${userObject.heightInM} m
      weight: ${userObject.weightInKg} kg
      do you exercise daily? ${userObject.dailyExercise}
  
      ****************
      FACING THE FACTS
      ****************
  
      Your BMI is ${userObject.BMI}
  
      A BMI under 18.5 is considered underweight
      A BMI above 25 is considered overweight
  
      Your ideal weight is ${userObject.idealWeight} kg
      With a normal lifestyle you burn ${userObject.dailyCalories} calories a day
  
      **********
      DIET PLAN
      **********
  
      If you want to reach your ideal weight of ${userObject.idealWeight} kg:
  
      Eat ${userObject.dietCalories} calories a day
      For ${userObject.dietWeeks} weeks
      `;
}

///////////////////////
// MAIN FUNCTION
///////////////////////

function bmiCalculator() {

    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercise(dailyExercise);
    validateGender(gender);

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, gender, age);
    const idealWeight = calculateIdealWeight(heightInM);
    const dailyCalorieUsage = calculateDailyCalories(BMR, dailyExercise);
    const dietCalories = calcDietCalories(weightInKg, idealWeight, dailyCalorieUsage);
    const weekToGo = calcDietWeeks(weightInKg, idealWeight);
    const weightToLose = weightInKg - idealWeight;

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalorieUsage,
        weightToLose: weightToLose,
        dietWeeks: weekToGo,
        dietCalories: dietCalories,
    };

    console.log(formatOutput(user));
}

bmiCalculator();