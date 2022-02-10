const ContrastRatio = {
    /**
     * @param {String} hexValueA
     * @param {String} hexValueB
     * 
     * @description
     * https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
     */
    calculate(hexValueA, hexValueB) {
        try {
            const regex = new RegExp(/^#?[0-9a-f]{6}$/i);

            if (!regex.test(hexValueA) || !regex.test(hexValueB)) {
                throw new Error("Invalid hex value provided");
            }

            const resultA = this._getLuminance(hexValueA);
            const resultB = this._getLuminance(hexValueB);

            const lighter = Math.max(resultA, resultB);
            const darker = Math.min(resultA, resultB);

            return Math.round((lighter + 0.05) / (darker + 0.05) * 100) / 100;

        } catch (error) {
            console.log(error);

            return 0;
        }
    },
    /**
     * @param {String} hexValueA
     * @param {String} hexValueB
     * @param {String | Number | undefined} fontSize
     * @param {Boolean | undefined} isBold
     * 
     * @description
     * https://www.w3.org/TR/WCAG/#contrast-minimum
     */
    passesW3AA(hexValueA, hexValueB, fontSize, isBold) {
        const requiredRatio = ((isBold && fontSize > 13) || fontSize > 17)
            ? 3.1
            : 4.5;

        return this.calculate(hexValueA, hexValueB) >= requiredRatio;
    },
    /**
     * @param {String} hexValueA
     * @param {String} hexValueB
     * @param {String | Number | undefined} fontSize
     * @param {Boolean | undefined} isBold
     * 
     * @description
     * https://www.w3.org/TR/WCAG/#contrast-minimum
     */
    passesW3AAA(hexValueA, hexValueB, fontSize, isBold) {
        const requiredRatio = ((isBold && fontSize > 13) || fontSize > 17)
            ? 4.5
            : 7.1;

        return this.calculate(hexValueA, hexValueB) >= requiredRatio;
    },
    _getLuminance(hexValue) {
        const rgbValues = this._hexToRgb(hexValue);
        const rgbResults = [];

        rgbValues.forEach(function (value) {
            const sRGB = value / 255;
            const result = (sRGB <= 0.03928)
                ? sRGB / 12.92
                : Math.pow((sRGB + 0.055) / 1.055, 2.4);

            rgbResults.push(result);
        });

        return (0.2126 * rgbResults[0]) + (0.7152 * rgbResults[1]) + (0.0722 * rgbResults[2]);
    },
    _hexToRgb(hexValue) {
        const regex = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        const result = regex.exec(hexValue);

        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ];
    }
};
