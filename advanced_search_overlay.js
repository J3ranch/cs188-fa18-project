document.getElementsByClassName("cancel-button")[0].addEventListener("click", function(e) {
	window.parent.postMessage({
		'func': 0
		}, "*");
})

document.getElementsByClassName("search-button")[0].addEventListener("click", function(e) {
	console.log("hi");

	window.parent.postMessage({
		'func': 1,
		'params': createSearchObject()
		}, "*");
})

function createSearchObject() {
	var searchObj = getSearchTerms();

	if (document.getElementById("min-award").value !== "") {
		searchObj.min_award = parseInt(document.getElementById("min-award").value);
	}

	if (document.getElementById("max-essay").value !== "") {
		searchObj.max_essays = parseInt(document.getElementById("max-essay").value);
	}

	if (document.getElementById("grad-year").value !== "") {
		searchObj.grad_year = parseInt(document.getElementById("grad-year").value);
	}

	if (document.getElementById("class-year").value !== "") {
		searchObj.class_level = parseInt(document.getElementById("class-year").value);
	}

	if (document.getElementById("degree").value !== "") {
		searchObj.degree = parseInt(document.getElementById("degree").value);
	}

	if (document.getElementById("gpa-max").value !== "") {
		searchObj.max_gpa = parseFloat(document.getElementById("gpa-max").value);
	}

	console.log(document.getElementById("citizenship").value);

	if (document.getElementsByName("citizenship")[0].checked) {
		console.log("test");
		searchObj.citizenship = true;
	} else if (document.getElementsByName("citizenship")[1].checked) {
		searchObj.citizenship = false;
	}

	if (document.getElementById("major").value !== "") {
		searchObj.major = document.getElementById("major").value;
	}

	if (document.getElementById("ethnicity").value !== "") {
		searchObj.ethnicity = document.getElementById("ethnicity").value;
	}

	return searchObj;
}

function getSearchTerms() {
    var searchbar = document.getElementById("searchbar");
    var search;

    search = (searchbar.value.indexOf('"') != -1) ? searchbar.value.match(/"[^"]*"|\b[^"\s]*|/g) : searchbar.value.split(/[\s,]/);
    search = search.filter(Boolean);
    search.forEach(function(e, i) {if (/"[^"]*"/.test(e)) {search[i] = e.substring(1, e.length - 1);} });

    console.log(search);
    return {keywords: search};
}

function validateSearch(searchbar) {
    var obj = {};
    
    try {
        eval("obj = " + searchbar);
    } catch (error) {
        return false;
    }

    return (obj.hasOwnProperty("keywords")) && Array.isArray(obj.keywords);
}