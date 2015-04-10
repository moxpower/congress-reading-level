var data = [
	["AL","ALABAMA","11.2"],
	["AK","ALASKA","11.4"],
	["AZ","ARIZONA","11.5"],
	["AR","ARKANSAS","11.9"],
	["CA","CALIFORNIA","11.9"],
	["CO","COLORADO","11.4"],
	["CT","CONNECTICUT","12"],
	["DE","DELAWARE","11.3"],
	["FL","FLORIDA","11.6"],
	["GA","GEORGIA","11.2"],
	["HI","HAWAII","12.5"],
	["ID","IDAHO","11.8"],
	["IL","ILLINOIS","11.5"],
	["IN","INDIANA","12"],
	["IA","IOWA","12.1"],
	["KS","KANSAS","11.7"],
	["KY","KENTUCKY","11.1"],
	["LA","LOUISIANA","10.6"],
	["ME","MAINE","11.6"],
	["MD","MARYLAND","11.8"],
	["MA","MASSACHUSETTS","11.6"],
	["MI","MICHIGAN","11.6"],
	["MN","MINNESOTA","10.9"],
	["MS","MISSISSIPPI","12.2"],
	["MO","MISSOURI","11.3"],
	["MT","MONTANA","11.9"],
	["NE","NEBRASKA","12.6"],
	["NV","NEVADA","12"],
	["NH","NEW HAMPSHIRE","11.9"],
	["NJ","NEW JERSEY","12.4"],
	["NM","NEW MEXICO","11.3"],
	["NY","NEW YORK","12.2"],
	["NC","NORTH CAROLINA","11.2"],
	["ND","NORTH DAKOTA","10.9"],
	["OH","OHIO","11.3"],
	["OK","OKLAHOMA","10.6"],
	["OR","OREGON","11.3"],
	["PA","PENNSYLVANIA","12"],
	["RI","RHODE ISLAND","12.5"],
	["SC","SOUTH CAROLINA","10.7"],
	["SD","SOUTH DAKOTA","11.7"],
	["TN","TENNESSEE","10.6"],
	["TX","TEXAS","11.3"],
	["UT","UTAH","10.8"],
	["VT","VERMONT","11.2"],
	["VA","VIRGINIA","12"],
	["WA","WASHINGTON","11.9"],
	["WV","WEST VIRGINIA","11.5"],
	["WI","WISCONSIN","11"],
	["WY","WYOMING","11.4"],
	["DC","DISTRICT OF COLUMBIA","12.7"],
	["","undefined","undefined"],
];

$(document).ready(function(){
	for (var i in data) {
		$("#"+data[i][0]).css("fill","rgb(255, 206, 123)");
		if (data[i][2] >= 10.6 && 11.02 > data[i][2]) {
			$("#"+data[i][0]).css("fill","rgb(181, 217, 127)");
		}
		if (data[i][2] >= 11.02 && 11.44 > data[i][2]) {
			$("#"+data[i][0]).css("fill","rgb(148, 189, 85)");
		}
		if (data[i][2] >= 11.44 && 11.86 > data[i][2]) {
			$("#"+data[i][0]).css("fill","rgb(119, 161, 54)");
		}
		if (data[i][2] >= 11.86 && 12.28 > data[i][2]) {
			$("#"+data[i][0]).css("fill","rgb(96, 138, 31)");
		}
		if (data[i][2] >= 12.28) {
			$("#"+data[i][0]).css("fill","rgb(71, 110, 11)");
		}
	}
});