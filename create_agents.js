//*********
//S: Config
DEST= process.argv[2]; //A: Tome el primer parametro como nombre de archivo
TIMES= process.argv[2] || 1;

const CfgPathOut= __dirname+'/data/in/';

fs= require('fs'); //XXX: Ask Mauricio

r= 0;
agents= [];

//************************
//S: Setting up the agents

function random_time(max = 30, min = 1) { //In seconds
  return (Math.floor(Math.random()*max)+min);
}

function create_agents(){
	console.log("START creating "+TIMES+" agents");
	var rand= {};
	rand.ammount= 300;
	rand.max= 30;
	rand.max= 5;

	for(var t = 0; t < TIMES; t++){
		agents= [];
		r++;

		for(var a = 0; a < rand.ammount; a++){
			agents.push(random_time(rand.max, rand.min));
		}
		//console.log(agents);
		writeFile();
	}
	console.log("DONE created "+TIMES+" files");
}

create_agents();

//****************
//S: Writing files

function writeFile(){
	if(DEST == "-"){ //A: Qiere stdout
		console.log(JSON.stringify(agents, null, 1));
	} else {
		if(!fs.existsSync(CfgPathOut)){
			fs.mkdirSync(CfgPathOut, {recursive:true});
		}
		//A: The directory for the output exists

		fs.writeFileSync(CfgPathOut+"agents_"+r+".json", JSON.stringify(agents, null, 1));
		//A: Saves the agents
	}
}
