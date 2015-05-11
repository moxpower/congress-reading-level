angular.module('polsApp', ['ui.router'])

// set angular bracket to not conflict with jinja2
.config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');

	// For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home/home.html",
      controller: "displayController"
    })
    .state('pols', {
      url: "/pols",
      templateUrl: "templates/polList/pols.html",
      controller: "displayController"
    })
    .state('about', {
      url: "/about",
      templateUrl: "templates/about.html",
    });
})

// factory to retrieve politican info from DB
.factory('pols',['$http', function($http) {
	return $http.get('/fetch_pols')
		.success(function(data) {
			return data;
		})
		.error(function(err) {
			return err;
		});
}])

// controller that displays politician data
.controller('displayController', ['$scope', 'pols', function($scope, pols) {
	$scope.pol_list = [];
	$scope.ordered_pols = [];

	pols.success(function(data) {
		$scope.pol_list = data['items'];  // all data is JSONified on back-end into 'items' property
		
		var raw_ordered = $scope.pol_list.sort(function(a,b){
			return a.index_composite - b.index_composite;
		});

		raw_ordered.forEach(function(pol) {
			if (pol.index_composite > 5) {
				$scope.ordered_pols.push(pol);
			}
		});

		// averages
		var avg_dems = 0, avg_reps = 0, avg_ind = 0, avg_senate = 0, avg_house = 0;
		var total_dems = 0, total_reps = 0, total_ind = 0, total_senate = 0, total_house = 0;

		$scope.ordered_pols = $scope.ordered_pols.map(function(pol){

			if (pol.party === "Democrat") {
				pol.party = "D";
				avg_dems += pol.index_composite;
				total_dems++;
			} else if (pol.party === "Republican") {
				pol.party = "R";
				avg_reps += pol.index_composite;
				total_reps++;
			} else if (pol.party === "Independent") {
				pol.party = "I";
				avg_ind += pol.index_composite;
				total_ind++;
			}

			if (pol.chamber === "sen") {
				avg_senate += pol.index_composite;
				total_senate++;
			} else if (pol.chamber === "rep") {
				avg_house += pol.index_composite;
				total_house++;
			}

			return pol;
		});

		$scope.top5 = $scope.ordered_pols.slice(Math.max($scope.ordered_pols.length - 5, 1)).reverse();
		$scope.bottom5 = $scope.ordered_pols.slice(0,5);

		$scope.avg_house = avg_house / total_house;
		$scope.avg_senate = avg_senate / total_senate;
		$scope.avg_reps = avg_reps / total_reps;
		$scope.avg_dems = avg_dems / total_dems;
		$scope.avg_ind = avg_ind / total_ind;
		$scope.avg_all = (avg_house + avg_senate) / (total_house + total_senate);

	});
}])

// map component
.directive('polMap', function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'templates/home/map.html',
		// have to include the jQuery here otherwise it won't load in-sync with map DOM elements
		link: function(scope, element, attrs) {
			var data = [
				["AL","ALABAMA","11.2", "11.0","11.0","12.3","n/a"],
				["AK","ALASKA","11.4", "11.4","11.4","n/a","n/a"],
				["AZ","ARIZONA","11.5","11.1","12.3","n/a"],
				["AR","ARKANSAS","11.9","11.9","n/a","n/a"],
				["CA","CALIFORNIA","11.9","11.9","11.9","n/a"],
				["CO","COLORADO","11.4","11.5","11.4","n/a"],
				["CT","CONNECTICUT","12.0","n/a","12.0","n/a"],
				["DE","DELAWARE","11.3","n/a","11.3","n/a"],
				["FL","FLORIDA","11.6","11.4","11.9","n/a"],
				["GA","GEORGIA","11.2","11.1","11.8","n/a"],
				["HI","HAWAII","12.5","n/a","12.5","n/a"],
				["ID","IDAHO","11.8","11.8","n/a","n/a"],
				["IL","ILLINOIS","11.5","11.2","11.7","n/a"],
				["IN","INDIANA","12.0","11.5","13.2","n/a"],
				["IA","IOWA","12.1","12.0","12.7","n/a"],
				["KS","KANSAS","11.7","11.7","n/a","n/a"],
				["KY","KENTUCKY","11.1","11.1","10.9","n/a"],
				["LA","LOUISIANA","10.6","10.7","10.4","n/a"],
				["ME","MAINE","11.6","12.6","10.9","10.5"],
				["MD","MARYLAND","11.8","10.7","11.9","n/a"],
				["MA","MASSACHUSETTS","11.6","n/a","11.6","n/a"],
				["MI","MICHIGAN","11.6","11.3","12.0","n/a"],
				["MN","MINNESOTA","10.9","11.9","10.5","n/a"],
				["MS","MISSISSIPPI","12.2","12.1","12.4","n/a"],
				["MO","MISSOURI","11.3","11.5","10.9","n/a"],
				["MT","MONTANA","11.9","12.8","10.1","n/a"],
				["NE","NEBRASKA","12.6","12.6","12.6","n/a"],
				["NV","NEVADA","12.0","12.1","11.8","n/a"],
				["NH","NEW HAMPSHIRE","11.9","11.9","11.9","n/a"],
				["NJ","NEW JERSEY","12.4","12.6","12.2","n/a"],
				["NM","NEW MEXICO","11.3","9.0","12.0","n/a"],
				["NY","NEW YORK","12.2","12.5","12.1","n/a"],
				["NC","NORTH CAROLINA","11.2","11.0","11.8","n/a"],
				["ND","NORTH DAKOTA","10.9","11.2","10.3","n/a"],
				["OH","OHIO","11.3","11.3","11.1","n/a"],
				["OK","OKLAHOMA","10.6","10.6","n/a","n/a"],
				["OR","OREGON","11.3","10.5","11.5","n/a"],
				["PA","PENNSYLVANIA","12.0","11.8","12.5","n/a"],
				["RI","RHODE ISLAND","12.5","n/a","12.5","n/a"],
				["SC","SOUTH CAROLINA","10.7","10.5","12.5","n/a"],
				["SD","SOUTH DAKOTA","11.7","11.7","n/a","n/a"],
				["TN","TENNESSEE","10.6","10.6","11.1","n/a"],
				["TX","TEXAS","11.3","11.1","12.0","n/a"],
				["UT","UTAH","10.8","10.8","n/a","n/a"],
				["VT","VERMONT","11.2","n/a","11.8","10.0"],
				["VA","VIRGINIA","12.0","11.9","12.3","n/a"],
				["WA","WASHINGTON","11.9","11.9","11.9","n/a"],
				["WV","WEST VIRGINIA","11.5","11.5","11.5","n/a"],
				["WI","WISCONSIN","11.0","10.2","11.9","n/a"],
				["WY","WYOMING","11.4","11.4","n/a","n/a"],
				["DC","DISTRICT OF COLUMBIA","12.7","n/a","12.7","n/a"],
				["","undefined","undefined"],
			];

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


			var thissvg;
			var pos, thex, they;
			var isFirefox = typeof InstallTrigger !== 'undefined';

			
				$("#timeline").height($("#chart").height());
				$("#timeline").width($("#chart").width());


				if(isFirefox == true) {
					var mysvg = document.getElementById("svg");
					var mysvgw = mysvg.getAttributeNS(null,'width')
					mysvg.getAttributeNS('height', mysvgw*0.55);

					  $(".state").mouseover( function(evt){
					    	thissvg = evt.target;
							$(thissvg)
								.css("cursor","pointer")

						});
						
					  $(".state").mouseout( function(evt){
							thissvg = evt.target;
							$(thissvg)

						});

					 //  $(window).resize(function(){
					 //  		mysvgw = mysvg.getAttributeNS(null,'width')
						// 	mysvg.getAttributeNS('height', mysvgw*0.55);
						// })


				} else {
					$("#svg").height($("#svg").width()*0.55)
				    $(".state").mouseover( function(){
				    	thissvg = $(event.target).parent();
						$(thissvg)
							.css("cursor","pointer")

					});
					$(".state").mouseout( function(){
						thissvg = $(event.target).parent();
						$(thissvg)

					});

					// $(window).resize(function(){
					// 	$("#svg").height($("#svg").width()*0.55)
					// })
				}

				$(".state").mouseover(function(e){
					if (navigator.userAgent.indexOf("Firefox")!=-1){
						
					    pos = $("#timeline").offset()
					    thex = e.pageX - pos.left + 10;
					    they = e.pageY - pos.top + 10;
					    if (thex > $("#timeline").width() - 200) { thex = $("#timeline").width() - 200 };
					    if (they > $("#timeline").height() - 200) { they = $("#timeline").height() - 100 };
					} else {

					    pos = $("#timeline").offset()
					    thex = event.pageX - pos.left + 10;
					    they = event.pageY - pos.top + 10;
					    if (thex > $("#timeline").width() - 200) { thex = $("#timeline").width() - 200 };
					    if (they > $("#timeline").height() - 200) { they = $("#timeline").height() - 100 };
					}

					for (var i=0; i<data.length; i++) {
						if (this.id == data[i][0]) {
							$("#timeline").append('<div class="hoverbox" style="top:'+they+'px;\
								left:'+thex+'px;"><div class="statename">'+data[i][1]+'</div>\
								<div class="statepct">Congress (all): '+data[i][2]+'</div>\
								<div>Republicans: '+data[i][3]+'</div>\
								<div>Democrats: '+data[i][4]+'</div>\
								<div>Independents: '+data[i][5]+'</div>\
								</div>');
						}
					}
				});

				$(".state").mouseleave(function(){
					$(".hoverbox").remove();
				});
		}
	};
})

// component to display individual pol information
.directive('polList', function() {
	return {
		restrict: 'E',
		scope: { allPols: '=' },
		templateUrl: 'templates/polList/polList.html',
	};
});