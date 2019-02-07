//**************************************************************************
//S: Back to front

function order_group(apg, gn){
	var group= [];
	
	do {
		var take= Math.floor(Math.random()*apg);
		var take2= take+gn*apg; //U: The first run it takes agents[0] to agents[apg-1], the second it takes agents[apg] to agents[apg+(apg-1)]
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
	var order= order_group(apg, gn);
	//var order= [0, 4, 1, 3, 2]; //XXX: Temp for testing
	var group= separate_group(agents, apg, gn);
	
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

function test_process_group(){
	console.log("TEST group processing");
	var agents= {0:20, 1:19, 2:8, 3:11, 4:5}
	console.log(agents);
	process_group(agents, 5, 0);
}

//test_process_group();

//XXX: Seria mejor mandarle apg en lugar de groups
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
		time+= process_group(agents, apg, gn);
		gn++;
	}
	var timem= time/60;
	
	console.log("BTF: Boarding took "+time+" seconds, or "+timem+" minutes");
	
	return time
}

btf_boarding(300, 60)
