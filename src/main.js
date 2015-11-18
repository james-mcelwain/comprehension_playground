"use strict";
import {mapSubmit}from "./jQFuncs/mapForm.js";
import {comprehensionSubmit} from "./jQFuncs/comprehensionForm.js"

import {listFactory} from "./listFactory";
import {inputValidator} from "./inputValidator";

$(document).ready(function() {
	// shared dependencies
	var listMaker = listFactory();
	var validate = inputValidator();
	var list = {c: []}; // obj for getters/setters on list

	// init jQuery submit events
	comprehensionSubmit(listMaker, validate, list);
	mapSubmit(validate, list);

})
