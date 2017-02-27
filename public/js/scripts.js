$(document).ready(function() {
    // Form validation regex patterns
    var validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/;
    // Minimum 8 characters, one uppercase, one lowercase, one special character and one number
    var validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;
    // Spinner time delay
    var timeDelay = 1400;

    // Answer input element, to be reused by multiple actions
    var answerInput = '<input type="text" class="form-control answer" name="answer" placeholder="Enter an answer choice">';

    // Process the guest question selection submit via AJAX
    $('#guest-survey-form button').on('click', function(e) {
        e.preventDefault();

        var QuestionId = $('#QuestionId').val();
        console.log('QuestionId: ' + QuestionId);

        var ChoiceId = $("#guest-survey-form input:radio:checked").map(function () {
            return $(this).val();
        }).get();

        // Validate selection
        if (ChoiceId == '') {
            $('.alert-modal .modal-body').html('<p class="text-warning">Form Error:</p><p>You must select an answer before proceeding!</p>');
            $('.alert-modal').modal('show');
            return false;
        }

        var formData = 'QuestionId=' + QuestionId + '&ChoiceId=' + ChoiceId;
        console.log('formData: ' + formData);

        initializeSpinner();

        // Process selection
        $.ajax({
            type: 'POST',
            url: '/processSurveySelection',
            data: formData
        }).done(function(response) {
            setTimeout(function() {
                removeSpinner();

                switch (response) {
                    case 'success':
                        // Answer processed successfully. Show feedback and remove question content
                        $('.success').html('<p>Thank you!  Your answer was submitted successfully. <a href="/" class="text-info"> Answer Another</a></p>');
                        $('.guest-question-container').remove();
                        break;
                    case 'error':
                        // System error
                        $('.error').html('<p>We are sorry, but there was a system error. \n Please contact the administrator if the problem persists.</p>');
                        break;
                    default:
                        // Unknown error
                        $('.error').html('<p>We are sorry, but there was an unknown error. \n Please contact the administrator.</p>');
                }
            }, timeDelay);
        });
    });

    // Process the login modal inputs via AJAX.  Validate first.
    $('#login-btn').on('click', function(e) {
        e.preventDefault();

        var email = $('#login-email').val();
        var password = $('#login-password').val();

        // Validate form inputs
        var errorArr = [];

        if (!validEmail.test(email)) {
            errorArr.push('Please enter a valid email address! \n');
        }

        if (!validPass.test(password)) {
            errorArr.push('Please enter a valid password!');
        }

        // Show form errors, if any
        var errors = '';
        if (errorArr.length > 0) {
            console.log('form errors');
            errorArr.forEach(function(err) {
                errors += '<p>' + err + '</p>';
            });

            $('#login-errors').html(errors);
            return false;
        } else {
            // Serialize form data
            var formData = 'email=' + email + '&password=' + password;

            // Log in the user
            console.log('user passed');
            initializeSpinner();

            $.ajax({
                type: 'POST',
                url: '/users/login',
                data: formData
            }).done(function(response) {
                setTimeout(function() {
                    removeSpinner();

                    switch (response) {
                        case 'success':
                            // User was authenticated
                            window.location.href = '/admin/viewQuestions';
                            break;
                        case 'fail':
                            // User not authenticated
                            $('#login-errors').html('Your username or password was incorrect!');
                            break;
                        case 'error':
                            // System error
                            $('#login-errors').html('We are sorry, but there was a system error. \n Please contact the administrator if the problem persists.');
                            break;
                        default:
                            // Unknown error
                            $('#login-errors').html('We are sorry, but there was an unknown error. \n Please contact the administrator.');
                    }
                }, timeDelay);
            });
        }
    });

    // Add answer rows to question generation form
    $('#add-answer-link').on('click', function(e) {
        e.preventDefault();

        // TODO: make a component to prevent duplication with template input
        $('.panel-create-question .answers').append(answerInput);
    });

    // Process the add question form. Validate inputs first.
    $('#add-question-form button').on('click', function(e) {
        e.preventDefault();

        // Require question and at least two answers (i.e. Yes/No)
        var errorArr = [];
        var fullAnswerArr = [];
        var emptyAnswerArr = [];
        var question = $('#question').val();
        if (!question) {
            errorArr.push('You must provide a question!');
        }

        var answers = $('.answer');

        answers.each(function(i, answer) {
            var ans = $(answer).val();
            if (!ans) {
                emptyAnswerArr.push(i);
            } else {
                fullAnswerArr.push(i);
            }
        });

        if (fullAnswerArr.length < 2) {
            errorArr.push('You must provide a minimum of two answers!');
        }

        if (errorArr.length > 0) {
            // Show alert modal with error feedback
            var errors = '<h4>Please correct the following errors:</h4>';
            errorArr.forEach(function(error) {
                errors += '<p class="error">' + error + '</p>';
            });
            $('.alert-modal .modal-body').html(errors);
            $('.alert-modal').modal('show');
            return false;
        }

        // Only confirm empty answers to user after a minimum of two answers has been verified. If user OK's, proceed with processing
        // Serialize form data to JSON array, as answer inputs may vary in total count (answer rows may be added dynamically by user)
        var formData = $('#add-question-form').serializeArray();

        if (emptyAnswerArr.length > 0) {
            if (!confirm('One of your answers is blank.  Are you sure you want to proceed? \n The answer will not be included in your final answer set.')) {
                return false;
            } else {
                // Send AJAX instruction
                processAddQuestion(formData);
            }
        } else {
            processAddQuestion(formData);
        }
    });

    // Process the delete question link action
    $('.delete-question-link').on('click', function(e) {
        //var questionId = $(this).data('questionId');
        // Save container for later deletion
        var questionContainer = $(this).parent().parent();
        var questionId = $(this).attr('data-questionId');

        var formData = 'questionId=' + questionId;

        initializeSpinner();

        // AJAX call to delete question
        $.ajax({
            type: 'POST',
            url: '/admin/deleteQuestion',
            data: formData
        }).done(function(response) {
            setTimeout(function() {
                removeSpinner();

                switch (response) {
                    case 'success':
                        // Question deleted successfully. Remove from DOM and show alert
                        questionContainer.remove();
                        $('.alert-modal .modal-body').html('<p>The question was deleted successfully!</p>');
                        $('.alert-modal').modal('show');
                        // Update question count using container count
                        var questionCount = $('.panel-question').length;
                        // If last question, reload page to show no questions in system feedback
                        if (questionCount > 0) {
                            $('#question-count').html(questionCount);
                        } else {
                            window.location.href="/admin/viewQuestions";
                        }
                        break;
                    default:
                        // System error
                        $('.alert-modal .modal-body').html('<p>There was an error processing your request! Please contact the administrator.</p>');
                        $('.alert-modal').modal('show');
                }
            }, timeDelay);
        });
    });

    // Instructions for add question AJAX processing
    function processAddQuestion(formData) {
        console.log('formData in script file process fn: ' , formData);
        initializeSpinner();

        var formData = 'data=' + JSON.stringify(formData);

        // Send AJAX instruction
        $.ajax({
            type: 'POST',
            url: '/admin/createQuestion',
            data: formData
        }).done(function(response) {
            // Remove any previous feedback
            $('.error').html('');
            $('.success').html('');

            setTimeout(function() {
                removeSpinner();

                switch (response) {
                    case 'success':
                        // Question added to db successfully
                        $('.success').html('Your question was successfully added to the system!');
                        // Restore inputs to original state
                        restoreAddQuestionInputs();
                        break;
                    case 'error':
                        // System error
                        $('.error').html('We are sorry, but there was a system error. \n Please try again and contact the administrator if the problem  persists.');
                        restoreAddQuestionInputs();
                        break;
                    default:
                        // Unknown error
                        $('.error').html('We are sorry, but there was an unknown error. \n  Please contact the administrator.');
                        restoreAddQuestionInputs();
                }
            }, timeDelay);
        });
    }

    // Load the spinner
    function initializeSpinner() {
        $('div.spinner-div').html('<div class="spinner">Loading...</div>');
    }

    // Remove the spinner
    function removeSpinner() {
        $('div.spinner-div').empty();
    }

    // Clear and restore add question form inputs to original state
    function restoreAddQuestionInputs() {
        $('input').val('');
        $('.panel-create-question .answers').html(answerInput);
    }
});