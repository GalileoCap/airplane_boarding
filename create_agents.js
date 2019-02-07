//*********
//S: Config
const CfgPathOut= __dirname+'/data/in/';
fs= require('fs'); //XXX: Ask Mauricio

agents= {};

//************************
//S: Setting up the agents

function random_time(max = 30, min = 1) { //In seconds
  return (Math.floor(Math.random()*max)+min);
}

function create_agents(types){
	var n= 0;	

	for(var t = 0; t < types.length; t++){
		var i= types[t];
		//console.log(i);
		for(var a = n; a < i.ammount+n+1; a++){
			agents[a]= random_time(i.max, i.min);
		}
		n+= i.ammount-1;
	}
	console.log("Created agents");
	//console.log(agents);
}

function send_create(){
	var buisnesspeople= {};
	buisnesspeople.ammount= 20;
	buisnesspeople.max= 10;
	buisnesspeople.min= 5;
	
	var oldpeople= {};
	oldpeople.ammount= 10;
	oldpeople.max= 60;
	oldpeople.min= 20;

	create_agents([buisnesspeople, oldpeople]);
}

send_create();

//****************
//S: Writing files

if(!fs.existsSync(CfgPathOut)){
	fs.mkdirSync(CfgPathOut);
}
//A: The directory for the output exists

fs.writeFileSync(CfgPathOut+"agents.json", JSON.stringify(agents, null, 1));
//A: Saves the agents
