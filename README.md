# The BrokenGM Discord Bot!
# MAKE SURE TO READ THE LEGAL DISCLAIMER AT THE BUTTOM OF THIS README BEFORE USING THIS CODE

## Description
Currently this bot only has one functionality, and thats to transcribe your conversations into a text channel! This has numerous applications, including accessibility and record keeping. Before using this application be aware of conversation recording laws in your country/state and of the laws of all participants countries. 

## Steps to setup
1. Create a .env file
2. In the .env file create two variables that look like this: 
    DISCORD_TOKEN='your discord bot api token, this can be created and/or found [here](https://discord.com/developers/applications)
    COMMAND_PREFIX='the prefix you want for commands, like !{command} for example'
    PYTHON_COMMAND='the console command to run python 3 on your machine (defined in your path)'
3. run npm i to install all dependencies, make sure to have node installed to get access to the npm and node commands
4. run npm start and your bot is now ready!
5. Make sure to invite the bot to your server, which can be done in [The Discord Developer Portal](https://discord.com/developers/applications)

## Bot Commands
1. {Prefix}join - this will have the bot join your current channel, where it will listen and transcribe all users in the channel to the text channel you typed the join command from.
2. {Prefix}leave - this will have the bot leave whatever channel it currently is in.
3. {Prefix}howoldami - this will send a message in chat with the age of the discord account of the user who initiated the command

## Legal Disclaimer
By downloading and using this app you agree that any legal liability for your use oof the app, or others who your instance of the app is set upon you and not the developers of this application.