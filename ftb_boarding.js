//*********
//S: Config
DEST= process.argv[3]; //A: Second parameter is the file name

const CfgPathIn= __dirname+'/data/in/';
const CfgPathOut= __dirname+'/data/out/';

fs= require('fs');

files= fs.readdirSync(CfgPathIn);

TIMES= process.argv[2] || files.length;
var agents;
var total_time= 0;
var time_out;

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

	var each_time= [];
	
	for (var n = 0; n < TIMES; n++){
		agents= extract_file(n);
		var this_time= ftb_boarding()
		total_time+= this_time;
		each_time.push(this_time);
	}
	var avrg_time= total_time/TIMES;
	var avrg_timem= avrg_time/60;
	
	console.log("FTB: In "+TIMES+" runs. The average (in secs) was: "+avrg_time+"; that are: "+avrg_timem+" minutes");
}

bunch_ftb();

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
