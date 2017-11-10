# This is a schematic plan of my naming pattern that I so eagerly established

-- const variable (primaral)
	
	--> expilicit, camelCase, and valueType, 
	
	i.e., domObjBtn = document.querySelectorAll('button');
		  domObjBtn_control = document.getElementById('button#control');
		  domObjBtn_controls = document.getElementById('button.control');
			
		  





# sortting algorithm

partition the original array into several sets

find one of the array item (as a median) and compare the rest of the value with it 

once sorted, compare the total value (summation of each partition and sort those)


/// now say    part 2  > part 3 > part 1 > part 10 > part N ......

compare value index by index:

	part 2[0] --> par 3[0] --> par 1[0] --> part N[0]


sort them in order and put them to the correlated array rank

	if part 2[0] === min && par 10 === min arr, 
		part 10[0] = part 2[0]


compare min num of the higher rank to the max num of the (one rank lower) rank

	part 10[0] ---> part 2[1]
	if part 10[0] > part 2[1],

	push all index[0] items into a new array 


	if part 10[0] < part 2[1], 
		temp = part 10[0];
		part 10[0] = part 2[1];
		part 2[1] = temp;

		compare // part 1[0] --> (new)part 10[0]
			if part 1[0] > (new)part 10[0];
			break;

			else repeat previous steps; 

		
		>> same thing with (new) part 2[1] ---> part 3[1] and so on

	do until min of higher rank > max of lower rank


# and push all result in order of index into a new array


