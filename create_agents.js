//************************
//S: Setting up the agents

function random_time(max = 30, min = 1) { //In seconds
  return (Math.floor(Math.random()*max)+min);
}

function create_agents(types){
	var agents= {};
	var n= 0;	

	for(var t = 0; t < types.length; t++){
		var i= types[t];
		console.log(i);
		for(var a = n; a < i.ammount+n+1; a++){
			agents[a]= random_time(i.max, i.min);
		}
		n+= i.ammount-1;
	}
	console.log(agents);

	return agents;
}

function test_create(){
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

test_create()
