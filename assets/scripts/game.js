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
			this.displayTimer = display.empty();
			this.displayTimer.text(this.setTime) ||
				(this.displayTimer.textContent = this.setTime);
			this.setTime = duration;
			this.curTime = this.setTime;
			return;
		},

		startTimer: function() {
			setTimeout(function() {
				this.intervalId = setInterval(this.timerCounting.bind(this), 1000);
			}.bind(this), 1000);
			return;
		},

		stop: function() {
			clearInterval(this.intervalId);
			setTimeout(this.timerReset, 800); // global	
			return;
		},

		// deprecated
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
			return;
		}
	}

	// setup trivia board
	const triviaText = {

		// use setup method to load an object library
		library: {},

		// show library contents, DOM || $(DOM)
		triviaTheme: undefined,

		gameStageQuestion: undefined,

		gameStageAnswers: undefined,

		gamePhaseQuestion: undefined,

		gamePhaseAnswer: undefined,

		// quiz theme, answers
		theme: undefined,

		answerIndex: 0,

		correctAnswers: 0,

		// triviaSetup(trivia_library[n], $('header'), $('btn-list-group'), $('answers'))
		triviaSetup: function(library, showTheme, showQuestion, showAnswers, stageQ, stageA) {
			this.library = library;
			this.theme = this.library[0]['theme'];
			this.triviaTheme = showTheme;
			this.gameStageQuestion = showQuestion;
			this.gameStageAnswers = showAnswers;
			this.gamePhaseQuestion = stageQ;
			this.gamePhaseAnswer = stageA;
			return;
		},

		// questionIndex represent different question
		populateQuestion: function(stageIndex) {
			const defaultPath = this.library[0]['quizes'][stageIndex],
				question = defaultPath['question'],
				answers = defaultPath['answers'];


			// populate game question phase
			this.triviaTheme.text(this.theme) ||
				(this.diplayTheme.textContent = this.theme);

			this.gameStageQuestion.text(question) ||
				(this.gameStageQuestion.textContent = question);

			// this.answers = [ {Q1}, {Q2}, {Q3}, {Q4} ]
			for (let i = 0, l = this.gameStageAnswers.length; i < l; i++) {
				this.gameStageAnswers.eq(i).text(answers[i]['ask']) ||
					(this.gameStageAnswers[i].textContent = answers[i]['ask']);
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
			const $msgArea = this.gamePhaseAnswer.children().eq(0);
			$textArea = this.gamePhaseAnswer.children().eq(1),
				$image = this.gamePhaseAnswer.children().eq(2);

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

	// trivia game handler
	// const triviaGameHandler = {

	// 	// game state flags
	// 	gameStageIndex: 0,

	// 	timeOutId: null,

	// 	// DOM object reference
	// 	$objDomDefault: $('#game').children().eq(0),

	// 	$objDomTriviaTheme: $('.jumbotron').children().eq(0),

	// 	$objDomTimer: $('#game').children().eq(0).children('.timer').eq(0),

	// 	$objDomQuestion: $('#game').children().eq(0).children().eq(0).children('p'),

	// 	$objDomAnsweringBtns: $('#game').children().eq(0).children('.list-group').children(),

	// 	$objDomGameInit: $('#intro'),

	// 	$objDomGameQuestion: $('#question-phase'),

	// 	$objDomGameAnswer: $('#answer-phase'),

	// 	$objDomGameOver: $('#end-game'),

	// 	// obj & library reference
	// 	library: triviaLibrary,

	// 	timer: countDownTimer,

	// 	trivia: triviaText,


	// 	// methods
	// 	gameInit: function(triviaText) {
	// 		triviaText.triviaSetup(
	// 			this.library,
	// 			this.$objDomTriviaTheme,
	// 			this.$objDomQuestion,
	// 			this.$objDomAnsweringBtns,
	// 			this.$objDomGameQuestion,
	// 			this.$objDomGameAnswer
	// 		);
	// 		return;
	// 	},

	// 	stageChangeHandler: function (countDownTimer, triviaText, myAnswer = false) {
	// 		triviaText.showAnswer(
	// 			this.$objDomGameQuestion,
	// 			this.$objDomGameAnswer,
	// 			this.gameStageIndex,
	// 			myAnswer
	// 		);
	// 		this.gameStageIndex += 1;
	// 		countDownTimer.stop().bind(countDownTimer);
	// 		setTimeout(function() {
	// 			triviaText.showAnswer(
	// 				this.$objDomGameAnswer,
	// 				this.$objDomGameQuestion,
	// 				this.gameStageIndex,
	// 				myAnswer
	// 			);
	// 		}, 5000);
	// 	},

	// 	triviaGameStage: function(countDownTimer, triviaText) {
	// 		countDownTimer.setTimer(25, this.$objDomTimer);
	// 		countDownTimer.startTimer();
	// 		triviaText.populateQuestion(this.gameStageIndex);

	// 		this.timeOutId = setTimeout(function() {
	// 			this.stageChangeHandler(false);

	// 			if (this.gameStageIndex < 4) {
	// 				setTimeout(triviaGameStage.call(this), 5000);
	// 			}
	// 			clearTimeout(this.timeOutId);
	// 			return;
	// 		}, 25000);
	// 	}

	// }



	// triviaGameHandler.gameInit(triviaText);
	// triviaGameHandler.triviaGameStage(countDownTimer, triviaText);

	// triviaGameHandler.$objDomDefault
	// 	.children('.list-group')
	// 	.children('button')
	// 	.click(function(event) {
	// 		triviaText.isCorrectAnswer($(this).data('ref'));
	// 		triviaGameHandler.stageChangeHandler(countDownTimer, triviaText, true);
	// 		console.log(triviaGameHandler.gameStageIndex);

	// 		if (triviaGameHandler.gameStageIndex < 4) {
	// 			setTimeout(triviaGameHandler.triviaGameStage.call(triviaGameHandler), 5000);
	// 		}
	// 		clearTimeout(triviaGameHandler.timeOutId);
	// 	});




	let gameStageIndex = 0;
	let timeOutId;
	const $objDomTimer = $('#game').children().eq(1).children('.timer').eq(0);



	function gameInit() {
		triviaText.triviaSetup(
			triviaLibrary,
			$('.jumbotron').children().eq(0),
			$('#game').children().eq(1).children().eq(0).children('p'),
			$('#game').children().eq(1).children('.list-group').children(),
			$('#question-phase'),
			$('#answer-phase')
		);

		$('.theme').text(triviaText.triviaTheme);
		return;
	};

	$('#game-start').click(function() {
		$('#intro').fadeOut(800, function() {
			$('#question-phase').fadeIn(800);
		});

		questions();
		return;
	})




	gameInit();





	// triviaText.populateQuestion(gameStageIndex);

	function stageChangeHandler(myAnswer = false) {
		setTimeout(function() {
			triviaText.showAnswer(triviaText.gamePhaseQuestion, triviaText.gamePhaseAnswer, gameStageIndex, myAnswer);
			gameStageIndex += 1;
			countDownTimer.stop();
			setTimeout(function() {
				triviaText.showAnswer(triviaText.gamePhaseAnswer, triviaText.gamePhaseQuestion, gameStageIndex, myAnswer);
			}, 5000);
		}, 0);
	}

	const questions = function() {
		countDownTimer.setTimer(25, $objDomTimer);
		countDownTimer.startTimer();
		triviaText.populateQuestion(gameStageIndex);

		timeOutId = setTimeout(function() {
			stageChangeHandler(false);

			if (gameStageIndex > 3) {
				endGame();
				clearTimeout(timeOutId);
			}

			setTimeout(questions, 5000);
			clearTimeout(timeOutId);
			return;
		}, 25000);
	}

	function endGame() {
		$('#answer-phase').fadeOut(800, function() {
			$('#end-game').fadeIn(800);
		});
		console.log('dfdjfaidfjiadjfasdf;ijas;df');
	}



	// questions();

	$('#game').children().eq(1).children('.list-group').children('button').click(function(event) {
		const myAnswer = triviaText.isCorrectAnswer($(this).data('ref'));
		stageChangeHandler(myAnswer);
		console.log(gameStageIndex);

		if (gameStageIndex > 3) {
			endGame();
			clearTimeout(timeOutId);
		}

		setTimeout(questions, 5000);
		clearTimeout(timeOutId);
		return;
	});






}(jQuery));