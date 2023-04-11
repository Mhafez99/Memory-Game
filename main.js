document.querySelector(".control-button span").onclick = function() {

    let yourName = window.prompt("What is your Name ?");
    if (yourName == null || yourName == '') {
        document.querySelector(".info-container .name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    document.querySelector(".control-button").remove();

};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-blocks");
let blocks = Array.from(blocksContainer.children);

// Array(Number) => array of length number with values undefined
let orderRange = [...Array(blocks.length).keys()];
// [0-19]

shuffle(orderRange);


blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function() {
        flipBlock(block);
    });

});

// Shuffle Function
function shuffle(array) {
    let current = array.length
        , temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        // [1] Save Current Element In Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Get ELement From Stach
        array[random] = temp;
    }
    return array;
}

// Flip Block Function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    // Collected All Flipped Cards
    let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains("is-flipped"));
    // Check If allFlippedBlocks Length Is 2 
    if (allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        stopClicking();
        // Check Matched Block Function 
        matchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    // Add Class No Clicking On Main Container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

function matchedBlock(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.game == secondBlock.dataset.game) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.getElementById('fail').play();
    }
}








