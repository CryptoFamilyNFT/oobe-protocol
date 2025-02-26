/**
 * @name typewriterEffect
 * @description Simula un effetto macchina da scrivere con glitch e un cursore lampeggiante
 * @param {string} text - Il testo da mostrare con l'effetto macchina da scrivere
 * @param {number} speed - La velocità di digitazione in millisecondi
 * @param {number} glitchChance - La probabilità di un glitch (0-1)
 */
export function typewriterEffect(text: string, speed: number = 100, glitchChance: number = 0.1): void {
    const glitchChars = ['@', '#', '$', '%', '&', '*', '!', '?'];
    let index = 0;
    let output = '';
    const cursor = '\x1b[5m|\x1b[0m'; // Cursore lampeggiante

    const interval = setInterval(() => {
        if (index < text.length) {
            if (Math.random() < glitchChance) {
                const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                output += glitchChar;
            } else {
                output += text[index];
                index++;
            }
            process.stdout.write(`\r${output}${cursor}`);
        } else {
            clearInterval(interval);
            process.stdout.write(`\r${output}\n`);
        }
    }, speed);
}