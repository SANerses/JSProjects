function main() {
    const finalResultEl = document.getElementById('finalResult');
    const wrongLattersEl = document.getElementById('wrongLatters');
    const popup = document.getElementById('popup-container');
    const playAgainBtn = document.getElementById('play-button');
    const notificationEl = document.getElementById('notification');
    let popupTitle = document.getElementById('popupTitle');
    const words = ['include', 'iostream', 'notification', 'message', 'undefined'];
    let rightLettersCount = 0;
    const tools = document.getElementById('tools');
    
    function createResultLatterElements(resultWorld) {
        finalResultEl.innerHTML = resultWorld
        .split('').map(() => `
            <span class="latter">
            </span>
        `).join('');
    }

    function showSvgPart(partNumber) {
        tools.children[3 + partNumber].classList.add('show');
    }

    function hideSvgParts() {
        tools.querySelectorAll('.show').forEach((e) => {
            e.classList.remove('show');
        })  
    }

    function showNotification() {
        notificationEl.classList.add('show');
    }

    function hideNotification() {
        notificationEl.classList.remove('show');
    }

    function showPopup(isWin) {
        popup.classList.add('open');

        if(isWin){
            popupTitle.innerText = 'Congratulations! You won! 😃';
        }else{
            popupTitle.innerText = 'Unfortunately you lost. 😕';
        }  
    }

    function start(resultWorld) {
        let lattersInfo;
        let correctLetters;
        let wrongLetters;

        function cleanBoard() {
            finalResultEl.innerHTML = '';
            wrongLattersEl.innerHTML = '';
            rightLettersCount = 0;
            hideSvgParts();
            hideNotification();

            popup.classList.remove('open');
        }

        function init(initWorld) {
            correctLetters = [];
            wrongLetters = [];

            lattersInfo = initWorld
               .toLowerCase()
               .split('')
               .reduce((obj, latter, i) => {
                   if(obj[latter]) {
                       return {
                           ...obj,
                           [latter]: [...obj[latter], i]
                       }
                   }
   
                   return {
                       ...obj,
                       [latter]: [i]
                   }
               }, {});
       }

        function handleKeyDown(e) {
            hideNotification();

            if (e.keyCode >= 65 && e.keyCode <= 90) {
                const letter = e.key.toLowerCase();

                if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
                    showNotification();
                } else if (resultWorld.toLowerCase().includes(letter)) {
                    showRightLetter(letter);
                } else {
                    showWrongLetter(letter);
                }
            }
        }

        function addMissingListeners(handleKeyDown) {
            document.addEventListener('keydown', handleKeyDown);
        }

        function stopListeners(handleKeyDown) {
            document.removeEventListener('keydown', handleKeyDown);
        }
        
        function showRightLetter(letter) {
            correctLetters.push(letter);
            const indexes = lattersInfo[letter];

            indexes.forEach(ind => {
                finalResultEl.children[ind].innerHTML = letter;
            });

            rightLettersCount += indexes.length;

            if(rightLettersCount === resultWorld.length){
                stopListeners(handleKeyDown);
                setTimeout(() => {
                    showPopup(true);
                }, 300);
            }
        }

        function showWrongLetter(letter) {
            wrongLetters.push(letter);
            showSvgPart(wrongLetters.length);
            wrongLattersEl.innerHTML = `Wrong -> ${wrongLetters.join(', ')}`;
            
            if(wrongLetters.length === 6){
                stopListeners(handleKeyDown);
                setTimeout(() => {
                    showPopup(false)
                }, 300); 
            }
        }

                
        cleanBoard();
        createResultLatterElements(resultWorld);
        init(resultWorld);
        addMissingListeners(handleKeyDown);
    }

    playAgainBtn.addEventListener('click', () => {
        start(getRandomeOne(words));
    });

    start(getRandomeOne(words));
}

main();

function getRandomeOne(allWords) {
    return allWords[Math.floor(Math.random() * allWords.length)];
}

