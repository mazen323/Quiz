/// <reference types="../@types/jquery" />
import { Quiz } from "./quiz.module.js";
export class Setting {
   constructor() {
      // this ->> class main

      // this ==== class tmam

      document.getElementById("start").addEventListener("click", this.startQuestion.bind(this));
   }

   async startQuestion() {
      const category = document.getElementById("category").value;
      const difficulty = document.querySelector('[name="difficulty"]:checked').value; // checked only
      const numberOfQuestion = document.getElementById("amount").value;

      if (numberOfQuestion > 0) {
         // tmam

         const result = await this.getQuestions(numberOfQuestion, category, difficulty);
         // console.log(result);

         $("#setting").removeClass("show");
         $("#quiz").addClass("show");

         // result

         const quiz = new Quiz(result);

         // class Quiz
      } else {
         // we7sh
         $("#alertNumber").fadeIn(1000);
      }
   }

   async getQuestions(amount, cat, difficult) {
      const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${difficult}`);
      const response = await apiResponse.json(); /// data
      return response.results; // {  "response_code": 0, "results":[] } // results
   }
}
