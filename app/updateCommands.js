import MainUpdateCommands from '../main/updateCommands.js'
import CharactersUpdateCommands from '../characters/updateCommands.js'

const main = async () => {
    console.log("Updating Discord Interactions\n")
    console.log("================= Main Bot CMD Update =================")
    await MainUpdateCommands();
    console.log("============== Characters Bot CMD Update ==============")
    await CharactersUpdateCommands();
    console.log("=======================================================")
    console.log("Done updating commands\n\n")
}

main()