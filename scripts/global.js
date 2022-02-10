const EventSwitch = {
    /**
     * @param {Event} event
     */
    onInput(event) {
        const eventId = event.target.dataset.eventId;

        if (eventId) {
            switch (eventId) {
                case "input-color-text":
                case "input-color-background":
                    displayColorContrastRatio(event);
                    break;
            }
        }
    }
};

function displayColorContrastRatio() {
    const colorList = document.querySelectorAll("input[type=color][data-group-id=contrast-ratio-color]");
    const outputEl = document.getElementById("output-result");

    if (colorList.length > 1 && outputEl) {
        const calcResult = ContrastRatio.calculate(colorList[0].value, colorList[1].value);

        outputEl.textContent = calcResult;
    }
}

window.addEventListener("load", function () {
    document.addEventListener("input", EventSwitch.onInput);

    displayColorContrastRatio();
});
