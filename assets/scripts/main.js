
/**
 * Import card library
 */
import { cardLibrary } from './card_library.js';

/**
 * Global Variables accessible to all functions
 */
let controls = {};
let currentCardIndex = 0;
let currentChapter = 0;
let currentChapterCards = [];

/**
 * Main entry point into application
 */
$(document).ready(function () {
    init();
});

/**
 * Initialize the application
 */
function init(){
    init_controls();
}

/**
 * Initializes the controls global variable
 */
function init_controls(){
    controls = {
        chapterSelect: $("#chapter-select"),
        cardDisplay: $('#card-display'),
        cardFront: $("#card-display #front"),
        cardBack: $("#card-display #back"),
        btnPrevious: $("#btn-previous"),
        btnNext: $("#btn-next")
    }

    init_chapter_select();
    init_previous_and_next_buttons();
    init_keyboard_actions();
}

/**
 * Initializes the chapter select dropdown, on change this should
 * update the loaded cards with the selected chapter
 */
function init_chapter_select(){
    controls.chapterSelect.change(function (){
        let currentChapter = parseInt(controls.chapterSelect.val());
        if(currentChapter >= 1){
            load_cards(currentChapter);
        }
    });
}

/**
 * Adds event listeners to the previous and next buttons
 */
function init_previous_and_next_buttons(){
    controls.btnPrevious.click(function (){
        change_card(-1);
    });
    controls.btnNext.click(function (){
        change_card(1);
    });
}

/**
 * Detects and switchs off of keyboard inputs
 */
function init_keyboard_actions(){
    document.addEventListener('keydown', function(event) {
        switch(event.key){
            case "ArrowRight":
                change_card(1);
                break;
            case "ArrowLeft":
                change_card(-1);
                break;
            case "ArrowUp":
                $('.flip-card-inner').addClass("flip-animation");
                break;
            case "ArrowDown":
                $('.flip-card-inner').removeClass("flip-animation");
                break;
        }
    });
}

/**
 * Resets the currentChapterCards global variable with cards from the selected
 * chapter
 * @param {int} chapter - the chapter to load cards from
 */
function load_cards(chapter){
    currentChapterCards = [];
    currentCardIndex = 0;
    if (chapter in cardLibrary){
        currentChapterCards = cardLibrary[chapter];
    }
    display_card();
}

/**
 * Changes card by delta value
 * @param {int} delta 
 */
function change_card(delta){
    currentCardIndex += delta;
    if (currentCardIndex < 0){
        currentCardIndex = 0;
    }
    if (currentCardIndex > currentChapterCards.length - 1){
        currentCardIndex = currentChapterCards.length - 1;
    }
    display_card();
}

/**
 * Handles changing the card's front and back text
 */
function display_card(){
    let card = currentChapterCards[currentCardIndex];
    if(card != undefined){
        console.log(card)
        controls.cardDisplay.show();
        controls.cardFront.html(card.front)
        controls.cardBack.html(card.back)
    } else {
        controls.cardDisplay.hide();
    }
}