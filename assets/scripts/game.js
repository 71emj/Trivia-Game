(function($) {


	// timer 
	const countDownTimer = {

		// stored intervalid use in current lap
		intervalId: "",

		// show timer time, DOM object
		displayTimer: "",

		// setTime for custom timer duration
		setTime: 30,

		// keep track of current time, cue stop when curTime === 0
		curTime: this.setTime,

		// setup( seconds, display = DOM || $(DOM) )
		setTimer: function(duration, display) {
			this.displayTimer = display;
			this.displayTimer.text(this.setTime) ||
				(this.displayTimer.textContent = this.setTime);
			this.setTime = duration;
			this.curTime = this.setTime;
			return;
		},

		startTimer: function() {
			this.intervalId = setInterval(this.timerCounting.bind(this), 1000);
			return;
		},

		stop: function() {
			clearInterval(this.intervalId);
			this.timerReset();
			return;
		},

		hideShow: function() {
			this.displayTimer.fadeToggle(300);
			this.stop();
			return;
		},

		timerCounting: function() {
			this.curTime -= 1;
			this.displayTimer.text(this.curTime) ||
				(this.displayTimer.textContent = this.curTime);
			(this.curTime === 0) && this.stop();
			return;
		},

		timerReset: function() {
			this.curTime = this.setTime;
			this.displayTimer.text(this.setTime) ||
				(this.displayTimer.textContent = this.setTime);

			this.startTimer(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! for testing purpose only	
			return;
		}
	}

	// setup trivia board
	const triviaText = {

		// use setup method to load an object library
		library: {},

		// show library contents, DOM || $(DOM)
		displayTheme: undefined,

		displayQuestion: undefined,

		displayAnswers: undefined,

		stageQuestions: undefined,

		stageAnswers: undefined,

		// quiz theme, answers
		theme: undefined,

		answerIndex: 0,

		correctAnswers: 0,

		// triviaSetup(trivia_library[n], $('header'), $('btn-list-group'), $('answers'))
		triviaSetup: function(library, showTheme, showQuestion, showAnswers, stageQ, stageA) {
			this.library = library;
			this.theme = this.library[0]['theme'];
			this.displayTheme = showTheme;
			this.displayQuestion = showQuestion;
			this.displayAnswers = showAnswers;
			this.stageQuestions = stageQ;
			this.stageAnswers = stageA;
			return;
		},

		// questionIndex represent different question
		populateQuestion: function(stageIndex) {
			const defaultPath = this.library[0]['quizes'][stageIndex],
				question = defaultPath['question'],
				answers = defaultPath['answers'];


			// populate game question phase
			this.displayTheme.text(this.theme) ||
				(this.diplayTheme.textContent = this.theme);

			this.displayQuestion.text(question) ||
				(this.displayQuestion.textContent = question);

			// this.answers = [ {Q1}, {Q2}, {Q3}, {Q4} ]
			for (let i = 0, l = this.displayAnswers.length; i < l; i++) {
				this.displayAnswers.eq(i).text(answers[i]['ask']) ||
					(this.displayAnswers[i].textContent = answers[i]['ask']);
				if (answers[i]['isCorrect']) {
					this.answerIndex = i;
				}
			}

			return;
		},

		populateAnswer: function(stageIndex, correct = false) {
			const defaultPath = this.library[0]['quizes'][stageIndex],
				answers = defaultPath['answers'],
				images = defaultPath['image'];

			// populate games answer phase
			const $textArea = this.stageAnswers.children().eq(0),
				$image = this.stageAnswers.children().eq(1);

			const winLose = correct ? 'Correct!!' : "Wrong!!",
				stringWinLose = `<i><b>${winLose}</b></i> The answer was: <em>${answers[this.answerIndex]['ask']}.</em>`;
			
			console.log($textArea);
			console.log($image);

			$textArea.html(stringWinLose);
			$image.attr('src', images);

			return;
		},

		// isCorrectAnswer( event.data() )
		isCorrectAnswer: function(answerSelected) {
			console.log(this.answerIndex + 1);
			if (answerSelected === this.answerIndex + 1) {
				this.correctAnswers += 1;
				return true;
			}
			return false;
		},

		// this method only works in jQuery, will need to revisit it later
		showAnswer: function($domObj1, $domObj2, stageIndex, correct = false) {
			this.populateAnswer(stageIndex, correct);
			
			$domObj1.animate({
				opacity: "toggle",
			}, 800, function() {
				$domObj2.animate({
					opacity: "toggle",
				}, 800);
			});
		}
	}


	let gameStageIndex = 0;
	const $objDomTimer = $('#game').children('.timer').eq(0);

	countDownTimer.setTimer(25, $objDomTimer);
	countDownTimer.startTimer();

	triviaText.triviaSetup(
		triviaLibrary,
		$('.jumbotron').children().eq(0),
		$('#game').children().eq(0).children('p'),
		$('#game').children('.list-group').children(),
		$('#question-phase'),
		$('#answer-phase')
	);

	triviaText.populateQuestion(gameStageIndex);

	$('#game').children('.list-group').children('button').click(function(event) {
		const myAnswer = triviaText.isCorrectAnswer($(this).data('ref'));
		console.log(myAnswer);

		setTimeout(function() {
			triviaText.showAnswer(triviaText.stageQuestions, triviaText.stageAnswers, gameStageIndex, myAnswer);
			countDownTimer.hideShow();
			setTimeout(function() {
				triviaText.showAnswer(triviaText.stageAnswers, triviaText.stageQuestions, gameStageIndex, myAnswer);
				countDownTimer.hideShow();
			}, 5000);
		}, 0);
		console.log(triviaText.correctAnswers);


	});


}(jQuery));