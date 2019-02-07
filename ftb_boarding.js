//*********
//S: Config
const CfgPathIn= __dirname+'/data/in/';
const CfgPathOut= __dirname+'/data/out/';

fs= require('fs');

var agents;
var run= 1;
var total_time= 0;
//************************************************************************
//S: Front to back

function ftb_boarding(){
	var time= 0;

	for (var a = 0; a < Object.keys(agents).length; a++){
		time+= agents[a];
	}
	var timem= time/60;
	
	//console.log("FTB: Boarding took "+time+" seconds, or "+timem+" minutes");
	
	return time
}

function bunch_ftb(){
	console.log("Start bunch FTB")
	
	var quant_runs= 1000; //Ammount of runs I want to do
	var each_time= [];
	
	for (var n = 0; n < quant_runs; n++){
		var this_time= ftb_boarding(300)
		total_time+= this_time;
		each_time.push(this_time);
	}
	var avrg_time= total_time/quant_runs;
	var average_timem= avrg_time/60;
	
	console.log("FTB: In "+quant_runs+" runs. The average (in secs) was: "+avrg_time+"; that are: "+average_timem+" minutes");
}

//bunch_ftb();

//****************************
//S: Writing and reading files

files= fs.readdirSync(CfgPathIn);

function extract_file(){	
	for(data_path of files){
  	agents_file= fs.readFileSync(CfgPathIn+data_path, 'utf8');
	}
}


if(!fs.existsSync(CfgPathOut)){
	fs.mkdir(CfgPathOut);
}
//A: Output directory exists

fs.writeFileSync(CfgPathOut+"ftb_"+run+".json", JSON.stringify(total_time));
