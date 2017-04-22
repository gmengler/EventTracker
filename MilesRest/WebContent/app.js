$(document).ready(function() {
  console.log('LOADED');
  AjaxRequest();
});

var AjaxRequest = function() {
  var req = $.ajax({
    type: "GET",
    url: "rest/miles",
    dataType: "json"
  });

  req.done(function(data, status) {
    console.log('GREAT SUCCESS DOM');
    console.log(data);
    buildMilesTable(data);
  });

  req.fail(function(xhr, status, error) {
    console.log("FAILED");
  });
}

var buildMilesTable = function(data) {
  var $table = $('<table>');
  $table.attr('id', 'milestable');
  var $thead = $('<thead>');
  var $tbody = $('<tbody>');
  var $thtr = $('<tr>');
  var $th1 = $('<th>');
  var $th2 = $('<th>');
  var $th3 = $('<th>');
  var $th4 = $('<th>');
  var $totaltr = $('<tr>');
  var $totaltd1 = $('<td>');
  var $totaltd2 = $('<td>');
  var $totaltd3 = $('<td>');
  var $totaltd4 = $('<td>');
  var $avgtr = $('<tr>');
  var $avgtd1 = $('<td>');
  var $avgtd2 = $('<td>');
  var $avgtd3 = $('<td>');
  var $avgtd4 = $('<td>');

  $th1.text('Date');
  $th2.text('Odom Start');
  $th3.text('Odom End');
  $th4.text('Total trip miles');

  $thtr.append($th1, $th2, $th3, $th4);
  $thead.append($thtr);
  $table.append($thead);

  var totalMiles = 0;
  var avgMiles = 0;
  var count = 0;

// DISPLAYS LIST
  data.forEach(function(v){
    var $tbtr = $('<tr>');
    var $td1 = $('<td>');
    var $td2 = $('<td>');
    var $td3 = $('<td>');
    var $td4 = $('<td>');
    var $editButton = $('<button>Edit</button>');
    $editButton.attr('name', v.id);
    var $deleteButton = $('<button>Delete</button>');
    $deleteButton.attr('name', v.id);

    var tripTotal = 0;
    count++;

    tripTotal = v.endMiles - v.startMiles;
    totalMiles = totalMiles + tripTotal;

    $td1.text(v.date);
    $td2.text(v.startMiles);
    $td3.text(v.endMiles);
    $td4.text(tripTotal);

    $tbtr.append($td1, $td2, $td3, $td4, $editButton, $deleteButton);
    $tbody.append($tbtr);
    console.log(totalMiles / count);
    console.log(count);
    console.log(avgMiles);
  });

  avgMiles = totalMiles / count;
  var rounded = avgMiles.toFixed(2);

  $totaltd3.text('Total Miles');
  $totaltd4.text(totalMiles);
  $avgtd3.text('Average Miles');
  $avgtd4.text(rounded);
  $totaltr.append($totaltd1, $totaltd2, $totaltd3, $totaltd4);
  $avgtr.append($avgtd1, $avgtd2, $avgtd3, $avgtd4);
  $tbody.append($totaltr, $avgtr);
  $table.append($tbody);
  $('body').append($table);
}
