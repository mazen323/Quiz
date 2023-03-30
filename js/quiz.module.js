export class Quiz {
   constructor(results) {
      // ----------------- Global Property
      this.results = results; // [{ } , { }, { } ]
      console.log(this.results);
      this.curentIndex = 0;
      document.getElementById("to").innerText = this.results.length;
      this.from = document.getElementById("from");
      this.question = document.getElementById("questionTitle");
      this.questionContent = document.getElementById("questionContent");
      this.showQuestion();
      this.corectAnswer;
      this.score = 0;

      // ----------------- Events
      document.getElementById("nextQuestion").addEventListener("click", () => {
         this.nextQuestion();
      });

      document.getElementById("end").addEventListener("click", () => {
         location.reload();
         // $("#finsish").removeClass("show");
         // $("#setting").addClass("show");
      });
   }

   showQuestion() {
      this.from.innerText = this.curentIndex + 1;

      const curentQuestion = this.results[this.curentIndex]; // [ { } , { }]

      // console.log("curentQuestion", curentQuestion);

      this.question.innerText = curentQuestion.question; // Title Question

      const answers = [...curentQuestion.incorrect_answers]; // [{ } , { } , { } ]  incorrect --- > refrence
      this.corectAnswer = curentQuestion.correct_answer; // Correct Answer

      const randomNumber = Math.ceil(Math.random() * answers.length); /// [0 --- > 1] --  [3 ] --- > [0 -- >3]

      answers.splice(randomNumber, 0, this.corectAnswer); // add elemnth [{} {} {} {}]

      // console.log(randomNumber);
      console.log(answers, this.corectAnswer);

      let answerBox = ``;

      for (let i = 0; i < answers.length; i++) {
         /// ['','','','']
         answerBox += `
         
         <li class="my-3 animate__animated">
         <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${answers[i]}" />
            <div class="state p-success-o">
               <label> ${answers[i]} </label>
            </div>
         </div>
      </li>
         

         `;
      }

      this.questionContent.innerHTML = answerBox;
   }

   nextQuestion() {
      const curentAns = document.querySelector('[name="answer"]:checked')?.value; // curent value // null
      console.log(curentAns);

      if (curentAns != undefined) {
         // Tmam
         $("#alertAns").fadeOut(300);
         this.curentIndex++; // 0 1 2 3 4 5

         if (this.curentIndex > this.results.length - 1) {
            // End Question and show finish
            $("#quiz").removeClass("show");
            $("#finsish").addClass("show");
            document.getElementById("score").innerText = this.score;
         } else {
            // Show Question
            if (curentAns === this.corectAnswer) {
               // True Answer
               $("#correct").fadeIn(0);
               setTimeout(() => {
                  $("#correct").fadeOut(0);
               }, 500);

               this.score++;
            } else {
               $("#inCorrect").fadeIn(0);
               setTimeout(() => {
                  $("#inCorrect").fadeOut(0);
               }, 500);
            }

            this.showQuestion();
         }
      } else {
         // enta we7sh
         $("#alertAns").fadeIn(300);
      }
   }
}
