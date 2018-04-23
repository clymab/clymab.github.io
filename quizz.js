
  var quiztitle = "";

    var quiz = [
        {
            "question"      :   "Selon vous, à quel moment de la journée les accidents de la route ont généralement lieu ? ",
            "image"         :   "",
            "choices"       :   [
                                    "Au crépuscule ou à l'aube",
                                    "En plein jour",
                                    "La nuit avec ou sans éclairage",
                                ],
            "correct"       :   "En plein jour",
            "explanation"   :   "C'est bizzare non ? Evidemment que non, contrairement aux idées reçues, la majorité des accidents ont lieu en journée. En effet, en 2016, 2/3 des accidents de la route se sont produit en plein jour et 4/5 par beau temps (source: fichier BAAC).",
        },
        {
            "question"      :   "Selon vous, où ont lieu la plupart des accidents de la route ?",
            "image"         :   "",
            "choices"       :   [
                                    "Sur les routes nationales",
                                    "Sur les autoroutes",
                                    "Sur les voies communales",
                                    "Sur les routes départementales",
                                ],
            "correct"       :   "Sur les routes départementales",
            "explanation"   :   "Selon les statistiques du fichier national des accidents de la route (BAAC), les accidents ont majoritairement lieu sur les routes departementales (72%) et sur les voies communales (9%).",
        },
        {
             "question"      :   "... sont majoritairement à l'origine des accidents de la route en france.",
            "image"         :   "",
            "choices"       :   [
                                    "Les jeunes",
                                    "Les adultes",
                                    "Les personnes agées",
                                ],
            "correct"       :   "Les jeunes",
            "explanation"   :   "Chaque année, la route fait de nouvelles victimes. Les jeunes (agés entre 18 et 24 ans) sont particulièrement concernés : lorsque les premières responsabilités de l’âge adulte côtoient l’envie de liberté, les prises de risques sont trop fréquentes.",
        },

        {
             "question"      :   "Une dernière pour la fin, dans quel état se trouvait la plupart des responsables des accidents?",
            "image"         :   "",
            "choices"       :   [
                                    "Ivresse avancée",
                                    "Fatigue chronique",
                                    "Sommeil au volant",
                                ],
            "correct"       :   "Ivresse avancée",
            "explanation"   :   "En 2014, 92% des présumés étant à l'origine d'un accident mortel étaient alcoolisés ; 91% d'eux ont été controlés positifs aux stupéfiants (source: fichier BAAC)",
        },

        {
             "question"      :   "Et non voici la toute dernière, selon vous, quel est le sexe le plus susceptible d'avoir un accident ?",
            "image"         :   "",
            "choices"       :   [
                                    "Féminin",
                                    "Masculin",
                                ],
            "correct"       :   "Masculin",
            "explanation"   :   "Haha, le meilleur toujours pour la fin. Les hommes sont hélas les fameux «chauffards au volant»... (75% en 2015, source: BAAC)",
        },

    ];
    /******* No need to edit below this line *********/
    var currentquestion = 0, score = 0, submt=true, picked;
    jQuery(document).ready(function($){
        /**
         * HTML Encoding function for alt tags and attributes to prevent messy
         * data appearing inside tag attributes.
         */
        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }
        /**
         * This will add the individual choices for each question to the ul#choice-block
         *
         * @param {choices} array The choices from each question
         */
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
                }
            }
        }

        /**
         * Resets all of the fields to prepare for next question
         */
    function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[currentquestion]['question']);
            $('#pager').text('Question ' + Number(currentquestion + 1) + ' sur ' + quiz.length);
            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
                }
            } else {
                $('#question-image').remove();
            }
            addChoices(quiz[currentquestion]['choices']);
            setupButtons();
        }

        /**
         * After a selection is submitted, checks if its the right answer
         *
         * @param {choice} number The li zero-based index of the choice picked
         */
     function processQuestion(choice){
            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#146b01'});
                $('#explanation').html('<strong>Bonne réponse!</strong> ' + htmlEncode(quiz[currentquestion]['explanation'])).css({'color':'#146b01'});
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
                $('#explanation').html('<strong>Mauvaise réponse!</strong> ' + htmlEncode(quiz[currentquestion]['explanation'])).css({'color':'#D92623'});
            }
                currentquestion++;
            $('#submitbutton').html('QUESTION SUIVANTE &raquo;').on('click', function(){
                if(currentquestion == quiz.length){
                    endQuiz();
                } else {
                    $(this).text('Vérifier sa réponse').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            })
        }
        /**
         * Sets up the event listeners for each button.
         */
        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'rgba(174,194,203,0.5)'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'rgb(174,194,203)'});
            })
            $('.choice').on('click', function(){
                picked = $(this).attr('data-index');
                $('.choice').removeAttr('style').off('mouseout mouseover');
                $(this).css({'border-color':'#222','font-weight':700,'background-color':'rgba(170,198,186,0.7)'});
                if(submt){
                    submt=false;
                    $('#submitbutton').css({'color':'#000'}).on('click', function(){
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            })
        }

        /**
         * Quiz ends, display a message.
         */
        function endQuiz(){
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text("Vous avez " + score + " réponse(s) sur " + quiz.length + " correctes.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
        }
        /**
         * Runs the first time and creates all of the elements for the quiz
         */
        function init(){
            //add title
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }
            //add pager and questions
            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
                //add pager
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 sur ' + quiz.length).appendTo('#frame');
                //add first question
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
                //add image if present
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');

                //questions holder
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

                //add choices
                addChoices(quiz[0]['choices']);

                //add submit button
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Vérifier sa réponse').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');

                setupButtons();
            }
        }

        init();
    });
