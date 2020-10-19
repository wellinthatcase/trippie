const red: string = "\x1b[31m";
const green: string = "\x1b[32m";
const yellow: string = "\x1b[33m";
const resetter: string = "\x1b[0m";

export const enum LogLevel {
    Success,
    Warning,
    Exception
};

/**
 * Log to the standard output with one of the optional colors. 
 * 
 * @param text - The text to output. 
 * @param log_level - The LogLevel enum selection. Success is green, Warning yellow, and Exception red. 
 */
export function log(text: string, log_level?: LogLevel | undefined): void {
    const text_with_resetter: string = `${text}${resetter}`; 

    switch (log_level) {
        case LogLevel.Exception:
            console.log(`${red}${text_with_resetter}`);
            break;
        case LogLevel.Warning: 
            console.log(`${yellow}${text_with_resetter}`);
            break;
        case LogLevel.Success || undefined: 
            console.log(`${green}${text_with_resetter}`);
    }; 
}; 