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
    const timestamp: string = new Date()
        .toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

    const content: string = `[${timestamp}]: ${text}${resetter}`; 
    switch (log_level) {
        case LogLevel.Exception:
            console.log(`${red}${content}`);
        case LogLevel.Warning: 
            console.log(`${yellow}${content}`);
        case LogLevel.Success || undefined: 
            console.log(`${green}${content}`);
    }; 
}; 