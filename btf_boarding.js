//*********
//S: Config
DEST= process.argv[4]; //A: Second parameter is the file name
GROUPS= process.argv[3] || 1;

const CfgPathIn= __dirname+'/data/in/';
const CfgPathOut= __dirname+'/data/out/';

fs= require('fs');

files= fs.readdirSync(CfgPathIn);

TIMES= process.argv[2] || files.length;

var agents;
var agents_ammount;
var apg;
var agents_lost
var gn;
var total_time= 0;
var time_out;

//**************************************************************************
//S: Back to front

function order_group(){
	var group= [];
	
	do {
		var take= Math.floor(Math.random()*apg);
		var take2= take+gn*apg; //U: The first run it takes agents[0] through agents[apg-1], the second it takes agents[apg] through agents[apg+(apg-1)]
		if(!group.includes(take2)){
			group.push(take2);
		}
	} while(group.length != apg);

	console.log("GRP number "+gn+" order: "+group);
	return group
}

function separate_group(){
	var group= [];
	for (var a = 0; a < apg; a++) {
		group.push(agents[a+apg*gn]);
		agents.splice(a+apg*gn, 1);
	}
	return group
}

function process_group(){
	console.log("Processing group "+gn);
	var order= order_group();
	var group= separate_group();
	
	var already_checked= [];
	var group_time= 0;
	
	//XXX: Embellecer esta funcion (para corregir lo de "group[order[t]]" qe es re feo)
	for (var i = (apg-1); i >= 0; i--){ //A: From the last place to the first one
		var times_check= [];
		if (!already_checked.includes(order[i])) {
			console.log("Checking: "+order[i]);
			for (var t = 0; t < apg; t++){
				if (!already_checked.includes(order[t])){
					console.log("vs "+order[t]);
					if (order[i] <= order[t]){
						console.log("added "+order[t]);
						times_check.push(group[order[t]]);
						already_checked.push(order[t]);
					}
				}
			}
		console.log("times "+times_check);
		group_time+= Math.max(...times_check);
		}
	}
	if(isNaN(group_time)){
		console.error("ERR group_time is NaN");
		process.exit();
	} else {
		console.log("GRP TIME: "+group_time);
		return group_time
	}
}

//XXX: Seria mejor mandarle apg en lugar de groups
function btf_boarding(){ //The plane is divided in groups
	for(var n = 0; n < TIMES; n++){
		agents= extract_file(n);
		agents_ammount= Object.keys(agents).length;
		apg= Math.floor(agents_ammount/GROUPS); //Agents per group XXX: Some agents may be lost 
		agents_lost= agents_ammount-apg*GROUPS;
		console.log("Agents lost: "+agents_lost);
				
		gn= 0; //Group number
		
		var this_time= 0;

		for (var g = 0; g < GROUPS; g++){
			this_time+= process_group();
			gn++;
		}

		total_time+= this_time;
	}
	var avrg_time= total_time/TIMES;
	var avrg_timem= total_time/60;

  console.log("FTB: In "+TIMES+" runs. The average (in secs) was: "+avrg_time+"; that are: "+avrg_timem+" minutes");
}

btf_boarding()

//****************************
//S: Writing and reading files

function extract_file(idx){
  var data_path= files[idx];
  file= fs.readFileSync(CfgPathIn+data_path, 'utf8');
  return JSON.parse(file);
}

if(DEST == "-"){ //A: Wants STDOUT
  console.log(JSON.stringify(time_out, null, 1));
} else {
  if(!fs.existsSync(CfgPathOut)){
    fs.mkdirSync(CfgPathOut, {recursive:true});
  }
  //A: Output directory exists

  fs.writeFileSync(CfgPathOut+"ftb.json", JSON.stringify(time_out));
}
