// Questions Data
const questions = [
    {
        q: '1. From which language did Hindi originate?',
        o: ['(a) Pali Sanskrit', '(b) Vedic Sanskrit', '(c) Apabhramsha', '(d) Classical Sanskrit'],
        a: 2
    },
    {
        q: '2. How many languages are included in the Eighth Schedule of the Indian Constitution?',
        o: ['(a) 26', '(b) 22', '(c) 15', '(d) 24'],
        a: 1
    },
    {
        q: '3. From which Apabhramsha did Eastern Hindi originate?',
        o: ['(a) Paishachi Apabhramsha', '(b) Shauraseni Apabhramsha', '(c) Ardhamagadhi Apabhramsha', '(d) Nagari Apabhramsha'],
        a: 2
    },
    {
        q: '4. When is World Hindi Day celebrated?',
        o: ['(a) January 10', '(b) August 15', '(c) September 14', '(d) January 26'],
        a: 0
    },
    {
        q: '5. Which was the first Indian state formed on linguistic basis?',
        o: ['(a) Punjab', '(b) Jammu & Kashmir', '(c) Andhra Pradesh', '(d) Bihar'],
        a: 2
    },
    {
        q: '6. Which script is used for writing Hindi?',
        o: ['(a) Devanagari', '(b) Gurumukhi', '(c) Bengali', '(d) Telugu'],
        a: 0
    },
    {
        q: '7. Hindi is primarily spoken in which Indian state?',
        o: ['(a) Tamil Nadu', '(b) Uttar Pradesh', '(c) Kerala', '(d) West Bengal'],
        a: 1
    },
    {
        q: '8. Which is NOT a dialect of Hindi?',
        o: ['(a) Bhojpuri', '(b) Awadhi', '(c) Malayalam', '(d) Braj'],
        a: 2
    },
    {
        q: '9. When was Hindi declared as the official language of India?',
        o: ['(a) September 14, 1949', '(b) January 26, 1950', '(c) August 15, 1947', '(d) November 26, 1949'],
        a: 0
    },
    {
        q: '10. Which language family does Hindi belong to?',
        o: ['(a) Dravidian', '(b) Indo-European', '(c) Sino-Tibetan', '(d) Austroasiatic'],
        a: 1
    },
    {
        q: '11. Which Hindi dialect is known as the language of Krishna?',
        o: ['(a) Awadhi', '(b) Bhojpuri', '(c) Braj', '(d) Maithili'],
        a: 2
    },
    {
        q: '12. Where is the Central Hindi Directorate located?',
        o: ['(a) Hyderabad', '(b) New Delhi', '(c) Agra', '(d) Guwahati'],
        a: 1
    },
    {
        q: '13. Which of these is a Rajasthani dialect?',
        o: ['(a) Marwari', '(b) Konkani', '(c) Tulu', '(d) Kodava'],
        a: 0
    },
    {
        q: '14. When was the first World Hindi Conference held?',
        o: ['(a) 1975', '(b) 1980', '(c) 1970', '(d) 1985'],
        a: 0
    },
    {
        q: '15. Which Hindi dialect is spoken in Chhattisgarh?',
        o: ['(a) Chhattisgarhi', '(b) Bundeli', '(c) Haryanvi', '(d) Kumaoni'],
        a: 0
    },
    {
        q: '16. Which is the official language of Himachal Pradesh?',
        o: ['(a) Hindi', '(b) Punjabi', '(c) Himachali', '(d) Tibetan'],
        a: 0
    },
    {
        q: '17. Which of these is NOT a scheduled language?',
        o: ['(a) Sindhi', '(b) Dogri', '(c) Bhojpuri', '(d) Manipuri'],
        a: 2
    },
    {
        q: '18. Which Hindi poet wrote "Godan"?',
        o: ['(a) Premchand', '(b) Harivansh Rai Bachchan', '(c) Mahadevi Verma', '(d) Suryakant Tripathi'],
        a: 0
    },
    {
        q: '19. Which state has Konkani as its official language?',
        o: ['(a) Goa', '(b) Maharashtra', '(c) Karnataka', '(d) Kerala'],
        a: 0
    },
    {
        q: '20. Which is the most widely spoken language in India?',
        o: ['(a) Hindi', '(b) Bengali', '(c) Telugu', '(d) Marathi'],
        a: 0
    }
];

// Application State
let currentIndex = 0;
let answers = [];
let qSeconds = 0;
let testSeconds = 900; // 15 minutes
let userId = null;
let qTimer = null;
let testTimer = null;

// DOM Elements
const leftSidebar = document.getElementById('leftSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const questionGrid = document.getElementById('questionGrid');
const testTimerEl = document.getElementById('testTimer');
const qTimerEl = document.getElementById('qTimer');
const qnoEl = document.getElementById('qno');
const currentQEl = document.getElementById('currentQ');
const totalQEl = document.getElementById('totalQ');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitTestBtn = document.getElementById('submitTestBtn');
const submitPopup = document.getElementById('submitPopup');
const timeUpPopup = document.getElementById('timeUpPopup');
const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
const viewResultsBtn = document.getElementById('viewResultsBtn');
const loadingScreen = document.getElementById('loadingScreen');
const userIdDisplay = document.getElementById('userIdDisplay');

// Initialize the application
function init() {
    // Generate or load User ID
    userId = localStorage.getItem('quizUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('quizUserId', userId);
    }
    
    userIdDisplay.textContent = `User ID: ${userId.substring(0, 12)}...`;
    totalQEl.textContent = questions.length;
    
    // Render first question
    renderQuestion();
    
    // Start timers
    startTestTimer();
    startQuestionTimer();
    
    // Add event listeners
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    menuBtn.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    
    submitTestBtn.addEventListener('click', () => {
        submitPopup.classList.add('active');
    });
    
    cancelSubmitBtn.addEventListener('click', () => {
        submitPopup.classList.remove('active');
    });
    
    confirmSubmitBtn.addEventListener('click', submitTest);
    viewResultsBtn.addEventListener('click', submitTest);
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

// Start test timer
function startTestTimer() {
    testTimerEl.textContent = formatTime(testSeconds);
    testTimer = setInterval(() => {
        testSeconds--;
        testTimerEl.textContent = formatTime(testSeconds);
        
        // Change color when less than 5 minutes
        if (testSeconds <= 300) {
            testTimerEl.parentElement.style.background = 'rgba(239, 68, 68, 0.3)';
            testTimerEl.parentElement.querySelector('i').style.color = '#ef4444';
        }
        
        if (testSeconds <= 0) {
            clearInterval(testTimer);
            showTimeUpPopup();
        }
    }, 1000);
}

// Start question timer
function startQuestionTimer() {
    clearInterval(qTimer);
    qSeconds = 0;
    qTimer = setInterval(() => {
        qSeconds++;
        qTimerEl.textContent = qSeconds;
    }, 1000);
}

// Generate question grid
function generateQuestionGrid() {
    let gridHTML = '';
    
    questions.forEach((_, index) => {
        let itemClass = 'grid-item';
        
        // Current question
        if (index === currentIndex) {
            itemClass += ' current';
        }
        
        // Answered question
        if (answers[index] !== undefined) {
            itemClass += ' answered';
        }
        
        gridHTML += `<div class="${itemClass}" onclick="jumpToQuestion(${index})">${index + 1}</div>`;
    });
    
    questionGrid.innerHTML = gridHTML;
}

// Render current question
function renderQuestion() {
    // Update question number
    qnoEl.textContent = currentIndex + 1;
    currentQEl.textContent = currentIndex + 1;
    
    // Set question text
    questionText.textContent = questions[currentIndex].q;
    
    // Generate options
    let optionsHTML = '';
    questions[currentIndex].o.forEach((option, index) => {
        let optionClass = 'option';
        let iconText = String.fromCharCode(65 + index); // A, B, C, D
        
        if (answers[currentIndex] === index) {
            optionClass += ' selected';
        }
        
        optionsHTML += `
            <div class="${optionClass}" onclick="selectOption(${index})">
                <div class="option-icon">${iconText}</div>
                <div class="option-text">${option}</div>
            </div>
        `;
    });
    
    optionsContainer.innerHTML = optionsHTML;
    
    // Update grid
    generateQuestionGrid();
    
    // Update button states
    updateButtonStates();
    
    // Scroll to top
    document.querySelector('.question-scroll-container').scrollTop = 0;
    
    // Restart question timer
    startQuestionTimer();
}

// Select an option
function selectOption(index) {
    answers[currentIndex] = index;
    renderQuestion();
}

// Jump to specific question
function jumpToQuestion(index) {
    currentIndex = index;
    renderQuestion();
    toggleSidebar();
}

// Go to previous question
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

// Go to next question
function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    }
}

// Update button states
function updateButtonStates() {
    // Previous button
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    
    // Next button
    const isLastQuestion = currentIndex === questions.length - 1;
    nextBtn.disabled = isLastQuestion;
    nextBtn.style.opacity = isLastQuestion ? '0.5' : '1';
    nextBtn.style.cursor = isLastQuestion ? 'not-allowed' : 'pointer';
    
    // Next button text
    if (isLastQuestion) {
        nextBtn.innerHTML = '<i class="fas fa-check"></i> Last';
    } else {
        nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next';
    }
}

// Toggle sidebar
function toggleSidebar() {
    const isOpen = leftSidebar.classList.contains('open');
    
    if (isOpen) {
        leftSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    } else {
        leftSidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }
}

// Show time up popup
function showTimeUpPopup() {
    timeUpPopup.classList.add('active');
}

// Calculate results
function calculateResults() {
    let correct = 0;
    let wrong = 0;
    
    questions.forEach((q, index) => {
        if (answers[index] !== undefined) {
            if (answers[index] === q.a) {
                correct++;
            } else {
                wrong++;
            }
        }
    });
    
    const attempted = correct + wrong;
    const unattempted = questions.length - attempted;
    const score = correct * 4;
    const totalScore = questions.length * 4;
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(2) : 0;
    
    return {
        userId,
        score,
        correct,
        wrong,
        attempted,
        unattempted,
        accuracy: parseFloat(accuracy),
        totalQuestions: questions.length,
        totalScore,
        timestamp: Date.now(),
        date: new Date().toISOString()
    };
}

// Save results to localStorage
function saveResultsToLocalStorage(results) {
    const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    existingResults.push(results);
    localStorage.setItem('quizResults', JSON.stringify(existingResults));
    return existingResults
