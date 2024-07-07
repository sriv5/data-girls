document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        displayMessage(userInput, 'user-message');
        document.getElementById('user-input').value = '';
        botResponse(userInput);
    }
}

function displayMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.innerHTML = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const quizTopics = [
    {
        topic: "Introduction to OOP",
        questions: [
            {
                question: "What does OOP stand for?",
                answer: "Object-Oriented Programming",
                attempts: 0
            },
            {
                question: "What are the four pillars of OOP mentioned in the video?",
                answer: "Abstraction, Polymorphism, Inheritance, Encapsulation",
                attempts: 0
            },
            {
                question: "What is OOP based on?",
                answer: "The concept of objects, which can contain data in the form of attributes or properties and actions in the form of functions or methods.",
                attempts: 0
            }
        ]
    },
    {
        topic: "Abstraction",
        questions: [
            {
                question: "What does abstraction mean in OOP?",
                answer: "To only show the necessary details to the user of the object.",
                attempts: 0
            },
            {
                question: "Why is abstraction useful?",
                answer: "It decouples the user from the underlying implementation.",
                attempts: 0
            },
            {
                question: "In the example given, what does the user not care about when turning the monitor on or off?",
                answer: "The inner mechanisms of what's going on inside the monitor.",
                attempts: 0
            }
        ]
    },
    {
        topic: "Inheritance",
        questions: [
            {
                question: "What does inheritance allow in OOP?",
                answer: "Code reusability.",
                attempts: 0
            },
            {
                question: "What are subclasses derived from an existing class also called?",
                answer: "Subclass, extended class, or child class.",
                attempts: 0
            },
            {
                question: "What is the term for the class from which a subclass is derived?",
                answer: "Superclass, parent class, or base class.",
                attempts: 0
            },
            {
                question: "What is the main advantage of using inheritance?",
                answer: "It reduces the amount of code that needs to be written.",
                attempts: 0
            }
        ]
    }
];

let currentTopicIndex = 0;
let currentQuestionIndex = 0;
let quizFinished = false;
let videoPlayer = null;

function botResponse(userInput) {
    let response;
    if (userInput.toLowerCase().includes('object oriented programming') || userInput.toUpperCase() === 'OOP') {
        response = `Great choice! Here's a great video for you: 
        <a href="https://www.youtube.com/watch?v=1ONhXmQuWP8" target="_blank">https://www.youtube.com/watch?v=1ONhXmQuWP8</a>
        <br><iframe id="video" width="300" height="200" src="https://www.youtube.com/embed/1ONhXmQuWP8?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br><button onclick="generateGlossary()">Click here if you want to generate a glossary from this video</button>`;
    } else if (userInput.toLowerCase().includes('video')) {
        response = `Here's a great video for you: 
        <a href="https://www.youtube.com/watch?v=1ONhXmQuWP8" target="_blank">https://www.youtube.com/watch?v=1ONhXmQuWP8</a>
        <br><iframe id="video" width="300" height="200" src="https://www.youtube.com/embed/1ONhXmQuWP8?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (userInput.toLowerCase().includes('glossary')) {
        response = getGlossary();
    } else {
        response = "I'm sorry, I didn't understand that. Could you please specify the topic or type 'glossary' for key terms?";
    }
    setTimeout(() => displayMessage(response, 'bot-message'), 1000);
    if (response.includes('iframe')) {
        setTimeout(() => {
            videoPlayer = document.querySelector('#video');
            startQuizTimer();
        }, 2000);
    }
}

function generateGlossary() {
    const glossaryMessage = getGlossary();
    displayMessage(glossaryMessage, 'bot-message');
}

function getGlossary() {
    return `Here's a glossary of key terms and concepts mentioned in the video:
    <ul>
        <li><strong>Object-Oriented Programming (OOP):</strong> A programming paradigm based on the concept of objects, which can contain data in the form of attributes or properties and actions in the form of functions or methods.</li>
        <li><strong>PIE Acronym:</strong> Represents the four pillars of OOP - Abstraction, Polymorphism, Inheritance, and Encapsulation.</li>
        <li><strong>Objects:</strong> Representations of real-world entities in code, containing attributes (properties) and actions (methods).</li>
        <li><strong>Abstraction:</strong> Showing only the necessary details to the user of an object, hiding the inner mechanisms or implementation.</li>
        <li><strong>Inheritance:</strong> A feature allowing code reusability by deriving new classes from existing ones.</li>
        <li><strong>Subclass/Extended class/Child class:</strong> A class derived from an existing class.</li>
        <li><strong>Superclass/Parent class/Base class:</strong> The original class from which a subclass is derived.</li>
        <li><strong>Polymorphism:</strong> The ability to determine what kind of function to run while the program is running.</li>
        <li><strong>Encapsulation:</strong> The concept of data hiding, restricting access to certain properties or methods of an object.</li>
        <li><strong>Class:</strong> A blueprint for creating objects in OOP.</li>
        <li><strong>Method:</strong> A function associated with an object or class.</li>
        <li><strong>Property/Attribute:</strong> Data contained within an object.</li>
        <li><strong>Override:</strong> Implementing a method in a subclass that is already defined in its superclass.</li>
        <li><strong>Extends:</strong> A keyword used in Java to indicate that a class inherits from another class.</li>
        <li><strong>Public:</strong> An access modifier that allows unrestricted access to a class, method, or property.</li>
        <li><strong>Private:</strong> An access modifier that restricts access to a property or method within the same class.</li>
        <li><strong>Getter/Setter:</strong> Methods used to access (get) or modify (set) private properties of an object.</li>
        <li><strong>Runtime:</strong> The period during which a program is executing.</li>
        <li><strong>Pointer:</strong> A reference to an object in memory.</li>
        <li><strong>Array:</strong> A data structure that can hold multiple objects of the same type.</li>
    </ul>`;
}

function startQuizTimer() {
    if (!quizFinished) {
        setTimeout(() => {
            showQuizModal();
        }, 60000);
    }
}

function showQuizModal() {
    if (quizFinished) return;

    const modal = document.getElementById("quiz-modal");
    const questionElement = document.getElementById("quiz-question");
    const answerInput = document.getElementById("quiz-answer");

    const topic = quizTopics[currentTopicIndex];
    const question = topic.questions[currentQuestionIndex];

    questionElement.innerText = question.question;
    answerInput.value = '';
    modal.style.display = "block";

    if (videoPlayer) {
        const videoIframe = videoPlayer.contentWindow;
        videoIframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    document.getElementById("submit-quiz").onclick = function() {
        const userAnswer = answerInput.value.trim();
        topic.questions[currentQuestionIndex].attempts++;
        if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
            currentQuestionIndex++;
            if (currentQuestionIndex < topic.questions.length) {
                const nextQuestion = topic.questions[currentQuestionIndex];
                questionElement.innerText = nextQuestion.question;
                answerInput.value = '';
            } else {
                currentQuestionIndex = 0;
                currentTopicIndex++;
                if (currentTopicIndex < quizTopics.length) {
                    modal.style.display = "none";
                    startQuizTimer();
                } else {
                    modal.style.display = "none";
                    quizFinished = true;
                    showMetricsModal();
                }
            }
        } else {
            alert("Incorrect. Please try again.");
            answerInput.value = ''; // Clear the input field for another attempt
        }
    };

    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            if (videoPlayer) {
                const videoIframe = videoPlayer.contentWindow;
                videoIframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        }
    });
}

function showMetricsModal() {
    const modal = document.getElementById("metrics-modal");
    const metricsContent = document.getElementById("metrics-content");

    let metricsHtml = '<ul>';
    quizTopics.forEach(topic => {
        metricsHtml += `<li><strong>${topic.topic}</strong><ul>`;
        topic.questions.forEach(question => {
            metricsHtml += `<li>${question.question}: ${question.attempts} attempts</li>`;
        });
        metricsHtml += '</ul></li>';
    });
    metricsHtml += '</ul>';

    metricsContent.innerHTML = metricsHtml;
    modal.style.display = "block";

    document.getElementById("close-metrics").onclick = function() {
        modal.style.display = "none";
    };
}
