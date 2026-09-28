const characters = ["Sylvia", "Lidia", "Madison", "Wale", "Alex", "Anthony", "Shimo", "Henry", "Bagel", "Bebok"];

const quiz = [
    {
        question: "It seems that you and your friends are getting into something dangerous! How do you approach the situation?",
        answers: 
            [
                "Sylvia: I ignore whatever I can ignore, but do my best if it's needed to help someone",
                "Lidia: I help the best I can from the very beginning, and enthusiastically try to do the most so others won't have to.",
                "Madison: I'm scared but also curious what's gonna happen, so I try to gather my courage",
                "Wale: I'll offer practical help, and will do as much as I can, though I'm getting more and more worried with the situation getting more serious.",
                "Alex: I don't like it, but if it can't be helped, I'll stick around to make sure they at least THINK about different possible solutions.",
                "Anthony: Let's go and see what happens, we'll figure something out on the go.",
                "Shimo: I'll stick around, but OMG WHAT ARE THEY DOING??? WHY ARE THEY DOING IT???",
                "Henry: I'll run to help without thinking about the risks, but I wouldn't want others to do the same for me.",
                "Bagel: I'm scared and I don't like it, but will fight anyone who tries to hurt my friends.",
                "Bebok: Let's just run away"
            ]
    },
    {
        question: "How do you act when meeting new people?",
        answers: [
            "Sylvia: I can be quite reserved at first.",
            "Lidia: Friendly, I like talking with people, especially when I can get to know a lot about them!",
            "Madison: I'm shy at first but I'll pretend I'm not and try to act confident.",
            "Wale: Friendly and welcoming, I love small talks!",
            "Alex: I don't like approaching new people, but if they talk to me, I'll keep the conversation going.",
            "Anthony: Will throw a joke or two as an icebreaker.",
            "Shimo: Nah, I'll pass, people are stupid.",
            "Henry: Normal…? What do you even mean?",
            "Bagel: I'm sometimes friendly, sometimes cautious, depending on the vibes",
            "Bebok: I love meeting new people! I will stick around anyone I find interesting!"
        ]
    },
    {
        question: "What is your favourite food?",
        answers: [
            "Sylvia: Curry",
            "Lidia: Pizza or pasta",
            "Madison: Sushi",
            "Wale: Dumplings or pork chop with potatoes",
            "Alex: Something with a lot of seasonal vegetables",
            "Anthony: I'll eat anything as long as I don't have to cook it myself",
            "Shimo: Anything sweet!",
            "Henry: I like soups, especially chicken broth",
            "Bagel: Eggs",
            "Bebok: Favourite food is more food."
        ]
    }
]

let selectedAnswers = [];


// ---------------------
const startPage = document.querySelector('.startPage');
const testPage = document.querySelector('.testPage');
const resultPage = document.querySelector('.resultPage');

const startBtn = document.querySelector('.startBtn');
const questionHeader = document.querySelector('.questionHeader');
const answerBox = document.querySelector('.answerBox');
const nextBtn = document.querySelector('.nextBtn');
let result = "";
let i = 0;



function shuffle(arr) {
    let array = arr;
    let currentIndex = array.length;
    
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function endTest() {
    let counterTable = [];
    selectedAnswers.forEach(ans => {
        let modified = false;
        counterTable.forEach((tab) => {
            if (tab.char == ans) {
                tab.counter += 1;
                modified = true;
                return;
            }
        })
        if (!modified){
            counterTable.push({
                char: ans,
                counter: 1
            });
        }
    });

    let counterShuffled = shuffle(counterTable);
    counterShuffled.sort((a,b) => a.counter < b.counter);
    result = counterShuffled[0].char.toUpperCase();
    document.querySelector('.you').innerHTML = 'You are ' + result;
    let imgSrc = result.toLowerCase() + ".png";

    resultPage.classList.remove('elhide');
    resultPage.classList.add('elshow');
    testPage.classList.add('elhide');
    document.querySelector('.resultImg').src = imgSrc;
}


function testFunc() {
    if (i > 0 && !selectedAnswers[i-1]) {
        return;
    }

    if (i >= quiz.length) {
        endTest();
        return;
    }
    
    questionHeader.innerHTML = "[" + (i+1) + "/8]: " + quiz[i].question;
    answerBox.innerHTML = '';
    const shuffled = shuffle(quiz[i].answers);
    shuffled.forEach(answer => {
        const node = document.createElement('button');
        node.classList.add('answer');
        node.textContent = answer.split(':')[1];
        node.value = answer.split(':')[0];
        node.addEventListener('click', () => {
            const otherBtns = document.querySelectorAll('.answer');
            otherBtns.forEach(btn => {
                btn.classList.remove('selected');
            });
            node.classList.add('selected');
            selectedAnswers[i-1] = node.value;
            console.log(selectedAnswers);
        });
        answerBox.appendChild(node);
    });
    i = i+1;
}

nextBtn.addEventListener('click', () => {
    testFunc();
})

startBtn.addEventListener('click', () => {
    startPage.classList.add('elhide');
    testPage.classList.remove('elhide');
    testPage.classList.add('elshow');
    testFunc();
})

document.querySelector('.reTest').addEventListener('click', () => {
    window.location.reload();
});
