const botconfig = require("./botconfig.json");
const discord = require("discord.js");
const bot = new discord.Client({disableEveryone : true});
const fetch = require("node-fetch");
const colors = require("./colors.json");

function textOutput (arg1, arg2) {
    var finalString = "";
    var res = arg1.substr(arg1.length - arg2[1].length + 1, arg1.length);


    finalString = finalString.concat(arg2[1][0].toUpperCase());
    finalString = finalString.concat(res.toLowerCase());


    return finalString;
}

/*function sendMessage () {

    var guildList = bot.guilds;
    console.log(guildList.array);
    try {
        guildList.forEach(guild => guild.defaultChannel.send("messageToSend"));
    } catch (err) {
        console.log("Could not send message to ");
        console.log(err);
    }

}
sendMessage();*/







bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("COVID-19 | -help");
    
})


bot.on("message", async msg=>  {
    if(msg.author.bot || msg.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    
    //let args = msgArray.slice[0];
    // cmd


    if (cmd == `${prefix}help`) {
        Embed = new discord.MessageEmbed()

        .setAuthor("COVID Bot Commands: ", bot.user.displayAvatarURL())
        .setColor(colors.red)

        .addField("-global", "Displays Global COVID-19 stats.")
        .addField("-countryinfo {country}", "Use  to see country by country COVID info.")
        .addField("-statesinfo {state}", "Use to see state by state COVID info.")




        .setFooter("COVID-19 Bot | 1.1.2")

        msg.channel.send({embed: Embed});

    }
    

    if(cmd === `${prefix}corona`) {

        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        console.log(data);
        



    }
    if(cmd === `${prefix}totalcases`) {
        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        var total = data.results[0];
        var total2 = total.total_cases;
        

        msg.channel.send("There are " + total2 + " cases in the world.");
    


    }


    if (cmd === `${prefix}global`) {
        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();


        var totalCases = data.results[0];
        var totalCases2 = totalCases.total_cases;

        var deaths = data.results[0];
        var deaths2 = deaths.total_deaths;

        var newCases = data.results[0];
        var newCases2 = newCases.total_new_cases_today;

        var recovered = data.results[0];
        var recovered2 = recovered.total_recovered;

        var newDeaths = data.results[0];
        var newDeaths2 = newDeaths.total_new_deaths_today;

        var totalCountries = data.results[0];
        var totalCountries2= totalCountries.total_affected_countries;

        var recoveries = data.results[0];
        var recoveries2 = recoveries.total_unresolved;
        
        


        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Global COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("Total Cases:", newCases2, true)
            .addField("Total Deaths:", newDeaths2, true)
            .addField("Total Recovered: ", recoveries2, true)
            .addField("Total Countries:", totalCountries2, true)
            .addField("New Deaths Today: ", recovered2, true)



            .setFooter("COVID-19 Bot | 1.1.2")




        msg.channel.send({embed: Embed});


        





    }




    if (cmd.includes(`${prefix}countryinfo`)) {

    
        var arg = msg.content.slice(prefix.length).split(' ');
        
        
        var finalString = "";
        var res = msg.content.substr(msg.content.length - arg[1].length + 1, msg.content.length);

        
        finalString = finalString.concat(arg[1][0].toUpperCase());
        
        finalString = finalString.concat(res.toLowerCase());
        if (arg[1].toUpperCase() != "US" && arg[1].toLowerCase() != "united states" && arg[1].toLowerCase() != "america") {


            var website = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=" + textOutput(msg.content, arg);

        } else {
            website = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=US";
        }
        
        //console.log(finalString + " hello goobi");
        

        /*console.log(arg);
        console.log(website);*/
        
        

        const response = await fetch(website);
        const data = await response.json();
        
        var confirmedCases = data.confirmed;
        var confrimedDeaths = data.deaths;
        var recoveries = data.recovered;
        //var confirmedCases2 = confirmedCases.confirmed;
        

        if (confirmedCases == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid country!")
           



            .setFooter("COVID-19 Bot | 1.1.2")




            msg.channel.send({embed: Embed});
            return
            
        }



        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( arg[1] + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("Positive Cases:", confirmedCases, true)
            .addField("Confirmed Deaths:", confrimedDeaths, true)
            .addField("Confirmed Recoveries:", recoveries, true)

           



            .setFooter("COVID-19 Bot | 1.1.2")




        msg.channel.send({embed: Embed});



        

    }

    if(cmd == `${prefix}stats`) {



        msg.channel.send("COVIDBOT is in " + bot.guilds.cache.size + " servers, serving " + bot.users.cache.size + " users!");
        


    }

    if (cmd == `${prefix}statesinfo`) {

        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        console.log(arg2[1]);
        var argRep = arg2[1].toLowerCase()
        console.log(argRep);
        if ("new" == argRep)  {
            console.log("goobi");

            
            newStr = arg2[1]  + "%20" + arg2[2];

            console.log(newStr);

        } else if (arg2[1].toLowerCase().includes("new")) {
            var lowerCase = arg2[1].toLowerCase();
            var newSplit = lowerCase.split("new");
            newStr = "new" + "%20" + newSplit[1];

        }


         else {

            newStr = arg2[1];

        }
        
        
        console.log(newStr);
        var website2 = "https://corona.lmao.ninja/v2/states/" + newStr + "?yesterday=";
        const response = await fetch(website2);
        const data2 = await response.json();

        var casesState = data2.cases;
        var deahtsState = data2.deaths;
        var tests = data2.tests;
        var todayyCases = data2.todayCases;
        var todayyDeaths = data2.todayDeaths;


        if (casesState == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid state!")
           



            .setFooter("COVID-19 Bot | 1.1.2")




            msg.channel.send({embed: Embed});
            return
            
        }


        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( arg2[1] + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("Positive Cases:", casesState, true)
            .addField("Confirmed Deaths:", deahtsState, true)
            .addField("Tests:", tests, true)
            //.addField("New Cases:", todayyCases, true)
            //.addField("New Deaths:", todayyDeaths, true)


           



            .setFooter("COVID-19 Bot | 1.1.2")




        msg.channel.send({embed: Embed});

    }

    






    
    
    



    
})




bot.login(process.env.token);
//bot.login(botconfig.token);