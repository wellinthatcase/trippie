# trippie
Yet another Discord bot. 

# Contribution or Localhost
Trippie was written with NodeJS 14.14.0, so you may want to stay near this version. 

Besides just running `dist/Start.js`, all you really need to do is set up a cfg: 
    1. Create a folder named `cfg` inside of the `src` folder. 
    2. Create a file named `cfg.json` inside of this folder. 
    3. Add these keys: 
        - token
            - The token of the bot. 
        - botId
            - The integer Discord snowflake ID of the bot. 
        - ownerId
            - Same as above, but the ID of the bot owner.
        - logFile
            - A path to a file in which to output logs to. 
        - postgreUrlUser
            - The username of your PostgreSQL database.
        - postgreUrlPass
            - The password to this database. 
        - postgreUrlName
            - The domain of this database. 

Be sure you've installed the most recent version of TypeScript, then just run `tsc`. It'll transpile and set up deps. 