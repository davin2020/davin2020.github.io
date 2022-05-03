// Filter Projects by Selected Tech Stack Keyword/s
let techstack_checkboxes = document.querySelectorAll('#checkTechStack input');

console.log('..about to add event listeners to checkboxes : ');
for (let i=0; i<techstack_checkboxes.length; i++) {
	techstack_checkboxes[i].addEventListener('change', findTechStackProjects)
}

//get top level divs of all projects, so they can be displayed/hidden later
let all_projects = document.querySelectorAll('#myprojects div[data-tech]');
console.log('all_projects length : ' + all_projects.length);

//ticking the checkbox hides the projets that DONT contain that keyword ie shows projects that DO contain that keyword
function findTechStackProjects() {
	let techstacks = []; 
	let current_proj_techstack = "";
	var found_all_keywords = false;
	
	//get all the tech stacks that user wants to view and add them to a temp array
	for (let i=0; i<techstack_checkboxes.length; i++) {
		if (techstack_checkboxes[i].checked) {
				techstacks.push(techstack_checkboxes[i].value);
				//console.log('..checkbox value, ie what user wants to see : ' + techstack_checkboxes[i].value);
		}
	}

	//how many tech keywords to find
	//console.log('techstacks length, of keywords to find: ' + techstacks.length);
	
	//loop over all the available projects, to find the ones that match the selected/wanted-keyword
	for (let z=0; z < all_projects.length; z++) {
		//console.log('inside z for loop, all_projects index : ' + z);
		//how to just get the title of the current top-level project div? as `all_projects[z].h3` doesnt work ?
		current_proj_techstack = all_projects[z].getAttribute('data-tech');
		//console.log('current_proj_techstack: ' + current_proj_techstack);

		//show all the projects if no keywords are selected
		if (techstacks.length == 0) {
			all_projects[z].style.display = 'block';
		}

		found_all_keywords = true;

		for (let j=0; j<techstacks.length; j++) {
			if ( !current_proj_techstack.includes(techstacks[j]) ) {
				//need this boolean so that a given project that contains a wanted-keyword will still be displayed if it also contains an unwanted-keyword
				found_all_keywords = false;
			}
		}
		//once ALL occurances of keywords have been found, finally do the actual displaying/hiding of projects, otherwise projects will be hidden unless they contain ALL wanted-keywords
		all_projects[z].style.display = (found_all_keywords ? 'block' : 'none');
	}

}
