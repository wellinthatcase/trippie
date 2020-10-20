/**
 * Enum for log level options. 
 * 
 * @property Success - Will output a green color. 
 * @property Warning - Will output a yellow color. 
 * @property Exception - WIll output a red color. 
 */
export const enum LLevel {
    Success,
    Warning,
    Exception
};

/**
 * The standard config for the Logger class. 
 * 
 * @property alwaysResetter - Always reset the foreground after logging. 
 * @property defaultResetter - The default resetter to use. White by default.
 * @property defaultSuccessFg - The default foreground when the LLevel.Success option is used.  
 * @property defaultWarningFg - The default foreground when the LLevel.Warning option is used.  
 * @property defaultExceptiFg - The default foreground when the LLevel.Exception option is used.  
 */
export interface ILogger {
    alwaysResetter?: boolean; 
    defaultResetter?: string; 
    defaultSuccessFg?: string; 
    defaultWarningFg?: string;
    defaultExceptiFg?: string; 
};

/**
 * The main logger class. Holds all configuration and the `log` method. 
 * 
 * If the cfg is to be reassigned; no properties should be undefined. 
 * 
 * @property cfg - An ILogger config. 
 * @method log - Log a string to standard output with one of the optional LLevel selections. 
 */
export class Logger {
    public cfg: ILogger;
    
    constructor(cfg?: ILogger) {
        this.cfg = { 
            "alwaysResetter"  : cfg.alwaysResetter   || true, 
            "defaultResetter" : cfg.defaultResetter  || "\x1b[0m",
            "defaultSuccessFg": cfg.defaultSuccessFg || "\x1b[32m",
            "defaultWarningFg": cfg.defaultWarningFg || "\x1b[33m",
            "defaultExceptiFg": cfg.defaultExceptiFg || "\x1b[31m"
        } as ILogger; 
    };

    /**
     * Log a string to standard output with one of the optiona LLevel selections. 
     * 
     * @param text - The text to output. 
     * @param log_level - The LLevel selection to use. One of LLevel.Success, LLevel.Warning, LLevel.Exception
     */
    log(text: string, log_level?: LLevel | undefined): void {
        if (this.cfg.alwaysResetter) {
            var resetter: string = this.cfg.defaultResetter;
        } else {
            var resetter: string = "";
        };

        const timestamp: string = new Date()
            .toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

        const warning: string = this.cfg.defaultWarningFg;
        const success: string = this.cfg.defaultSuccessFg;
        const excepti: string = this.cfg.defaultExceptiFg;
        const content: string = `[${timestamp}]: ${text}${resetter}`; 

        switch (log_level) {
            case LLevel.Exception:
                console.log(`${excepti}${content}`);
            case LLevel.Warning: 
                console.log(`${warning}${content}`);
            case LLevel.Success || undefined: 
                console.log(`${success}${content}`);
        }; 
    };
};