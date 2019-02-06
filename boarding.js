//************
//S: Utilities

function compare(a, b){
	if(a.length != b.length){
		console.error("ERR: Comparing "+a+" and "+b+". The arrays are not the same length");
		process.exit();
	} else {
		for(var t = 0; t < a.length; t++){
			if(a[t] != b[t]){
				return false
			} else {
				return true
			}
		}
	}
}

//**************
//S: Preparation

function random_time(max = 30, min = 1) { //In seconds
	return (Math.floor(Math.random()*max)+min);
}

//XXX: No first class
function create_agents(ammount, max, min) { //U: Creates an n ammount of agents with random time for storing their things and sitting down (once they get to the seat)
	var agents= {};

	for(var a = 0; a < ammount; a++){
		agents[a]= random_time(max, min);
	}
	//console.log("Agents", agents);
	
	return agents;
}

//************************************************************************
//S: Front to back

function ftb_boarding(ammount, max, min){
	console.log("Run FTB boarding");
	
	var agents= create_agents(ammount, max, min);
	var time= 0;

	for (var a = 0; a < Object.keys(agents).length; a++){
		time+= agents[a];
	}
	var timem= time/60;
	
	//console.log("FTB: Boarding took "+time+" seconds, or "+timem+" minutes");
	
	return time
}

function test_bunch_ftb(){
	console.log("Start bunch FTB")
	
	var quant_runs= 1000; //Ammount of runs I want to do
	var each_time= [];
	var total_time= 0;
	
	for (var n = 0; n < quant_runs; n++){
		var this_time= ftb_boarding(300)
		total_time+= this_time;
		each_time.push(this_time);
	}
	var avrg_time= total_time/quant_runs;
	var average_timem= avrg_time/60;
	
	console.log("FTB: In "+quant_runs+" runs. The average (in secs) was: "+avrg_time+"; that are: "+average_timem+" minutes");
}

//test_bunch_ftb();

//**************************************************************************
//S: Back to front

function order_group(apg, gn){
	var group= [];
	
	do {
		var take= Math.floor(Math.random()*apg);
		var take2= take+gn*apg; //U: The first run takes agents[0] to agents[apg-1], the second it takes agents[apg] to agents[apg+(apg-1)]
		if(!group.includes(take2)){
			group.push(take2);
		}
	} while(group.length != apg);

	console.log("GRP number "+gn+" order: "+group);
	return group
}

function separate_group(agents, apg, gn){
	var group= {};
	for (var a = 0; a < apg; a++) {
		group[a]= agents[a+apg*gn];
		delete agents[a+apg*gn];
	}
	return group
}

function process_group(agents, apg, gn){
	//var order= order_group(apg, gn);
	var order= [0, 4, 1, 3, 2]; //XXX: Temp for testing
	var this_group= separate_group(agents, apg, gn);
	
	var already_checked= [];
	var group_time= 0;
	
	//XXX: ANDA MAL
	for (var i = (apg-1); i > 0; i--){
		var times_check= [];
		if (!already_checked.includes(order[i])) {
			for (var t = 0; t < (apg-1); t++){
				console.log("A "+order[t]+" "+order[i]);
				if(order[i] < order[t]){
					already_checked.push(order[t]);
					times_check.push(this_group[t]);
					console.log("B "+times_check+" "+already_checked);
				}
			}
			group_time+= Math.max(times_check);
		}
	}
	
	console.log("GRP TIME: "+group_time);
	return group_time
}

function test_process_group(){
	var agents= create_agents(5);
	console.log(agents);
	process_group(agents, 5, 0);
}

test_process_group();

function btf_boarding(ammount, groups, max, min){ //The plane is divided in groups
	console.log("Run BTF boarding");
	
	var agents= create_agents(ammount, max, min);
	var agents_ammount= Object.keys(agents).length;
	var apg= Math.floor(agents_ammount/groups); //Agents per group XXX: Some agents may be lost 
	var agents_lost= agents_ammount-apg*groups;
	console.log("Agents lost: "+agents_lost);
			
	var gn= 0; //Group number
	
	var time= 0;

	for (var g = 0; g < groups; g++){
		process_group(agents, apg, gn);
		gn++;
	}
	var timem= time/60;
	
	console.log("BTF: Boarding took "+time+" seconds, or "+timem+" minutes");
	
	return time
}

//btf_boarding(300, 5)