document.addEventListener("DOMContentLoaded", () => {
    const deck = document.querySelector(".deck");
    const allCards = Array.from(deck.children); // Store original card order
    let removedCards = []; // Cache removed cards

    // Stagger cards on load
    setTimeout(() => {
        deck.classList.add("is-scattered");
    }, 100);

    // Remove top card
    function removeTopCard() {
        const topCard = deck.lastElementChild;
        if (!topCard) return;

        topCard.classList.add("is-offscreen--l");

        setTimeout(() => {
            removedCards.unshift(topCard); // Cache card in order
            topCard.remove();
        }, 500);
    }

    // Add back removed cards (in original order)
    function addBackCard() {
        if (removedCards.length === 0) return; // Stop if no cards to add back

        const restoredCard = removedCards.shift(); // Get the first removed card
        deck.appendChild(restoredCard);

        // Reset its position & remove off-screen class
        restoredCard.classList.remove("is-offscreen--l", "is-offscreen--r");
        restoredCard.style.opacity = "0";

        setTimeout(() => {
            restoredCard.style.opacity = "1";
        }, 100);
    }

    // Remove top card when clicking the deck
    deck.addEventListener("click", (event) => {
        event.stopPropagation();
        removeTopCard();
    });

    // Add back a card when clicking anywhere else
    document.body.addEventListener("click", (event) => {
        if (!deck.contains(event.target)) {
            addBackCard();
        }
    });
});