//functions
function elemtenttoremove(e){
	if(e.target && e.target.nodeName == "LI") {
		var newItem = parseInt(e.target.dataset.number);
		var showItem = document.querySelectorAll('[data-number="' +newItem  + '"]');
		var elementItem = document.querySelectorAll('#list-wrapper [data-number="' + newItem  + '"]');
		var element = elementItem[0].parentElement.getElementsByTagName("li");
		var elementToToggle = elementItem[0].parentElement;

		showItem[1].classList.remove("hide", "active");
		e.target.remove();
		var bol = false;

		toggleTitle(e,element,elementToToggle,bol);
	}
}

function removeCircle(e){
	var lastItem = document.querySelector("#selectd-items").lastChild;

	if(lastItem){
		var newItem = parseInt(lastItem.dataset.number);
		var showItem = document.querySelectorAll('[data-number="' + newItem  + '"]');
		var elementItem = document.querySelectorAll('#list-wrapper [data-number="' + newItem  + '"]');
		var element = elementItem[0].parentElement.getElementsByTagName("li");
		var elementToToggle = elementItem[0].parentElement;

		showItem[1].classList.remove("hide", "active");
		lastItem.remove();
		var bol = false;

		toggleTitle(e,element,elementToToggle,bol);
		
	}	
}

function checkCircleamount(upperlistItem,clearCircles){
	console.log("hello");
		var upperlistItemChildren = upperlistItem.getElementsByTagName("li");
		var upperlistItemChildrenLength = upperlistItemChildren.length;
		console.log(upperlistItemChildren);

		///not counting dynamically created elements - so length is always zero
		if(upperlistItemChildren <= 0){	
			clearCircles.classList.add('hide');
		}else{
			clearCircles.classList.remove('hide');
		}
}

function removeHideAllElements(items,extra){
	for (var m = 0; m < items.length; ++m) {
		typedItems = [];
		if(extra == 'extraClass'){	
			items[m].classList.remove('hide', 'active');
		}else{
			items[m].classList.remove('hide');	
		}

		var e = '';
		var element = items[m].parentElement.getElementsByTagName("li");;
		var elementToToggle = element[0].parentElement;
		bol = 'active';

		toggleTitle(e,element,elementToToggle,bol);
	}
						
}

function showDropdown(){
	document.getElementById("dropdown-container").classList.add('show');
}

function hideActiveTitles(element){
	if (items[element].classList.contains('active')) {
		items[element].classList.add('hide');	
	}
}

function showAllTitles(listItem){
	var items = listItem.getElementsByTagName("ul");
	for (var i = 0; i <= items.length - 1; i++){
    	items[i].classList.remove('hide');
	}
}


function toggleTitle(e,element,elementToToggle,bol){
	var orignalLength = element.length;
	var orginal =  0;

	element[0].classList.remove("hide");
		
	if(bol == 'active' ){
		var toggleClass = 'active';
	}else{	
		var toggleClass = 'hide';
	}

	for (d = 0; d < orignalLength; ++d) {
		if((!element[d].classList.contains(toggleClass))){
			orginal =  (orginal + 1);
		}
	}

	if(orginal <= 1){
		elementToToggle.classList.add("hide");

		if(bol == true){
			element[0].classList.add("hide");
		}	
	}
	else{
		elementToToggle.classList.remove("hide");	
		if(bol == true){
			element[0].classList.remove("hide");
		}
	}

	if(bol == 'active'){
		element[0].classList.remove("active");
	}
}



//Variables
var typedItems = [];
var listItem = document.querySelector("#list-wrapper");
var items = listItem.getElementsByTagName("li");
var upperlistItem = document.querySelector("#selectd-items");
var clearSearch = document.querySelector("#clear-search");
var clearCircles = document.querySelector("#clear-circles");
var outsideInput = document.querySelector("#dropdown-container");


//Hide Drop Down
document.addEventListener("click", function(event) {
	//Any other click - I think because my circle are created dynamically computers is not reading them as inside the div
	if ((outsideInput !== event.target && !outsideInput.contains(event.target))  ) {  
    	outsideInput.classList.remove("show");
	}
	//When you click a circle to remove it - still want the dropdown to show
	if(event.path[1].id == "selectd-items"){
		outsideInput.classList.add("show");
	}	
});

//Create circle
if(listItem){
	listItem.addEventListener("click",function(e) {
		if(e.target && e.target.nodeName == "LI") {
			var className = e.target.className;
				if(className !== 'title'){	
					e.target.classList.add("hide", "active");
				
					var newSelectedItem = e.target.innerHTML;
					var newItem = parseInt(e.target.dataset.number);
					var newElement = "<li data-number='" + newItem + "'>" + newSelectedItem + "</li>";
					document.getElementById('selectd-items').innerHTML += newElement;
			}	
		}

		var element = e.target.parentElement.getElementsByTagName("li");
		var elementToToggle = e.target.parentElement;
		var bol = false;
		toggleTitle(e,element,elementToToggle,bol);
		checkCircleamount(clearCircles,upperlistItem);
	});
}

//Circle on click
if(upperlistItem){
	upperlistItem.addEventListener("click",function(e) {	
		elemtenttoremove(e);
	});
}

//Remove all circles
clearCircles.addEventListener("click",function(e) {
	var childElements = upperlistItem.getElementsByTagName("li");
	upperlistItem.innerHTML = '';
	removeHideAllElements(items,'extraClass');
	showAllTitles(listItem);
	clearCircles.classList.add('hide');
});



//Clear search button
clearSearch.addEventListener("click",function(e) {	
	document.getElementById('search-input').value = '';
	showAllTitles(listItem);
	removeHideAllElements(items, 'none');

	for (b = 0; b < items.length; ++b) {	
		var element = items[b].parentElement.getElementsByTagName("li");
		var elementToToggle = element[0].parentElement;
		var e = '';
		var bol = 'active';
			
		toggleTitle(e,element,elementToToggle,bol);
	}	
});

//Keyup
document.addEventListener('keydown', function(e) {
	//removing circles
	var n = document.getElementById("search-input").value.length;
	
	if (e.code == 'Backspace') {
		if(n > 0){
			if(document.getElementById("search-input") === document.activeElement) {
				//keyup - function
			}else{
				removeCircle(e);
			}
		}else{
			removeCircle(e);

		}
	}			
});


//keydown
document.addEventListener('keyup', function(event) {
	//backspace on search
	var elementLength = document.getElementById("selectd-items");
	var letter = event.key.toUpperCase();	
	var n = document.getElementById("search-input").value.length;

	checkCircleamount(clearCircles,upperlistItem);
	if (event.code == 'Backspace') {
		if(n > 0){
			if(document.getElementById("search-input") === document.activeElement) {
				typedItems.pop();
				
				for (b = 0; b < items.length; ++b) {
						var className = items[b].className;
						var namesAsArray = items[b].innerText.toUpperCase().split('');	

						a = 0;
						while(n > a){
							items[b].classList.add('hide');

							if(namesAsArray.includes(typedItems[a])){
								items[b].classList.remove('hide');

							}	
							a++;
						}

					var element = items[b].parentElement.getElementsByTagName("li");
					var elementToToggle = element[0].parentElement;
					var e = '';
					var bol = true;
					
					toggleTitle(e,element,elementToToggle,bol);
					hideActiveTitles(b);
				}			
			}	
		}
		else{
			//input has nothing input then show everything
			removeHideAllElements(items, 'checkTitles');

		}	
	}

	//typing into input
	//If any of the names have one or more of the typed letters, show them, else hide them from the dropdown
	if(document.getElementById("search-input") === document.activeElement) {	
		if(event.code == "Key"+ letter){
			typedItems.push(letter);

			for (c = 0; c < items.length; ++c) {
				var namesAsArray = items[c].innerText.toUpperCase().split('');
				var individualClassName = items[c].className;

				if(!namesAsArray.includes(letter)){	
					if(individualClassName !== 'title'){
						items[c].classList.add('hide');	
					}

					var element = items[c].parentElement.getElementsByTagName("li");
					var elementToToggle = items[c].parentElement;
					var e = individualClassName;
					var bol = false;

					toggleTitle(e,element,elementToToggle,bol);

				}
				// add else if you want it to search through which letter are in any of the  
				// else{
				// 	items[c].classList.remove('hide');	
				// }
				
				hideActiveTitles(c);
			}		
			
		}
	}
});	



