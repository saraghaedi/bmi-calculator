// User Story 1 : As a person unsure about my weight, I want to know if I am overweight or not, so I can be informed.
// User Story 2 : As a person unsure about my weight, I want to know what my ideal weight is, so I have a target I can work towards.
// User Story 3 : As a person who is trying to lose weight, I want to know how many calories I should eat everyday, so I can make progress towards my weight goal.
// User Story 4 : As a person who is trying to lose weight, I want to have a timeline in which I can reach my weight goal, so I can make a plan.
// User Story 5 : As a person who is trying to lose weight, I want the amount of exercise taken into account when creating my diet plan, so I can be motivated to work out.
// User Story 6 : As a woman who is trying to lose weight, I want gender to be taken into account when creating my diet plan, so the information is more relavant to me.
// User Story 7 : As a person who is trying to gain weight, I want to know how much calories I should eat every day (OR on a daily basis), so I can make progress towards my weight goal.
// User Story 8 : As a person who is trying to gain weight, I want to have a timeline in which I can reach my weight goal, so I can make a plan.
// User Story 9 : As a user, I want the program to give me feedback when I input the wrong information, so I can learn how to use the program.

if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
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

const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];

if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

if (age < 20) {
    console.log (
        `
        This BMI calculator is designed for people over 20.`
    )
    process.exit();
}

if (weightInKg > 300 || weightInKg < 30) {
    console.log (`
        Please provide a number for weight in kilograms between 30 and 300

        $ node index.js 82 1.79 32 yes m `
    )
    process.exit();
}

if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
        Please specify if you exercise daily with "yes" or "no".

        $ node index.js 82 1.79 32 yes m 
        $ node index.js 82 1.79 32 no m `
    )
    process.exit();
}

if (gender !== "f" && gender !== "m") {
    console.log(`
        Please specify your gender with "m" for male or "f" for female.
        
        $ node index.js 82 1.79 32 yes m 
        $ node index.js 82 1.79 32 yes f `
    )
    process.exit();
}

const idealBMI = 22.5;
const BMI = weightInKg / (heightInM * heightInM);

const idealWeight = idealBMI * heightInM * heightInM;
const BMR = gender === 'm' ? 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * age + 50 : 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * age - 150;
const dailyCalorieUsage = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;

let dietCalories;
if (weightInKg - idealWeight > 0) {
    dietCalories = Math.round(dailyCalorieUsage) - 500;
} else {
    dietCalories = Math.round(dailyCalorieUsage) + 500;
}

const roundWeekToGo = Math.abs(Math.round((weightInKg - idealWeight) / 0.5));

// OUTPUT

console.log(`
**************
BMI CALCULATOR
**************

height: ${heightInM}
weight: ${weightInKg}

****************
FACING THE FACTS
****************

Your BMI is ${Math.round(BMI)}.

A BMI under 18.5 is considered underweight.
A BMI above 25 is considered overweight.

Your ideal weight is ${Math.round(idealWeight)}.
With a normal lifestyle you burn ${Math.round(dailyCalorieUsage)} calories a day.

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${Math.round(idealWeight)} kg:

Eat ${dietCalories} calories a day
For ${roundWeekToGo} weeks
`);
