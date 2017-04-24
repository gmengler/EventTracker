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
  var $h2 = $('<h2>');
  $h2.attr('id', 'h2');
  $h2.text('Personal Mileage Tracker');
  var $table = $('<table>');
  $table.attr('id', 'milestable');
  var $thead = $('<thead>');
  var $tbody = $('<tbody>');
  var $thtr = $('<tr>');
  var $th1 = $('<th>');
  var $th2 = $('<th>');
  var $th3 = $('<th>');
  var $th4 = $('<th>');
  var $th5 = $('<th>');
  var $totaltr = $('<tr>');
  var $totaltd1 = $('<td>');
  var $totaltd2 = $('<td>');
  var $totaltd3 = $('<td>');
  $totaltd3.addClass('milestd');
  var $totaltd4 = $('<td>');
  var $avgtr = $('<tr>');
  var $avgtd1 = $('<td>');
  var $avgtd2 = $('<td>');
  var $avgtd3 = $('<td>');
  $avgtd3.addClass('milestd');
  var $avgtd4 = $('<td>');
  var $createButton = $('<button>Create Trip!</button>');
  $createButton.attr('id', 'createbutton');
  $createButton.addClass('tablebutton');

  $th1.text('Date');
  $th2.text('Odom Start');
  $th3.text('Odom End');
  $th4.text('Total trip miles');
  $th5.text('Actions')

  $thtr.append($th1, $th2, $th3, $th4, $th5);
  $thead.append($thtr);
  $table.append($thead);

  var totalMiles = 0;
  var avgMiles = 0;
  var count = 0;

// DISPLAYS LIST
  data.forEach(function(v){
    var $tbtr = $('<tr>');
    $tbtr.addClass('bodytr')
    var $td1 = $('<td>');
    var $td2 = $('<td>');
    var $td3 = $('<td>');
    var $td4 = $('<td>');
    var $editButton = $('<button>Edit</button>');
    $editButton.attr('name', v.id);
    $editButton.attr('id', 'editbutton');
    $editButton.addClass('tablebutton');
    var $deleteButton = $('<button>Delete</button>');
    $deleteButton.attr('name', v.id);
    $deleteButton.addClass('tablebutton');
    $deleteButton.attr('id', 'delete');

    var tripTotal = 0;
    count++;

    tripTotal = v.endMiles - v.startMiles;
    totalMiles = totalMiles + tripTotal;

    $td1.text(v.date);
    $td2.text(v.startMiles);
    $td3.text(v.endMiles);
    $td4.text(tripTotal.toLocaleString());

    $tbtr.append($td1, $td2, $td3, $td4, $editButton, $deleteButton);
    $tbody.append($tbtr);

    $editButton.click(function(e){
      $table.hide();
      $('#h2').hide();
      editEntry(v.id, v);
    });

    $deleteButton.click(function(e) {
      e.preventDefault();
      if (window.confirm("Are you sure?")) {
        deleteEntry(v.id, $(this));
      }
    });

  });

  $createButton.click(function(){
    // $table.hide();
    // $('#h2').hide();
    createEntry();
  });

  avgMiles = totalMiles / count;

  $totaltd3.text('Total Miles');
  $totaltd4.text(totalMiles.toLocaleString());
  $totaltd4.addClass('total');
  $avgtd3.text('Average Miles');
  $avgtd4.text(avgMiles.toFixed(1));
  $avgtd4.addClass('total');
  $totaltr.append($totaltd1, $totaltd2, $totaltd3, $totaltd4, $createButton);
  $avgtr.append($avgtd1, $avgtd2, $avgtd3, $avgtd4);
  $tbody.append($totaltr, $avgtr);
  $table.append($tbody);
  $('body').append($h2, $table);
}

var editEntry = function(id, data) {
  var $form = $('<form name="edit">');
  $form.attr('id', 'edit')
  var $input1 = $('<input>');
  $input1.attr('value', data.date);
  $input1.attr("type", "date");
  $input1.attr('name', 'entryDate');
  var $input2 = $('<input>');
  $input2.attr('value', data.startMiles);
  $input2.attr('type', 'text');
  $input2.attr('name', 'startMiles');
  var $input3 = $('<input>');
  $input3.attr('value', data.endMiles);
  $input3.attr('type', 'text');
  $input3.attr('name', 'endMiles');
  var $button = $('<button>Submit</button>');

  $form.append($input1, $input2, $input3, $button);
  $('body').append($form);

  $button.click(function(e) {
    e.preventDefault();

    var miles = {
      date: $(edit.entryDate).val(),
      startMiles: $(edit.startMiles).val(),
      endMiles: $(edit.endMiles).val()
    };

    var req = $.ajax({
      type: "PUT",
      url: "rest/miles/" + id,
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(miles)
    });

    req.done(function(data, status) {
      console.log('GREAT SUCCESS EDIT');
      console.log('Edit returned: ' + data);
      (edit).remove();
      $('#h2').remove();
      $('#edit').remove();
      $('#milestable').remove();
      AjaxRequest();
    });

    req.fail(function(xhr, status, error) {
      console.log("EDIT FAILED");
    });

  });
}

var createEntry = function() {
  var $div = $('<div>');
  $div.attr('id', 'creatediv');
  var $form = $('<form name="create">');
  $form.attr('id', 'createform')
  var $input1 = $('<input>');
  $input1.attr('placeholder', 'Date');
  $input1.attr("type", "date");
  $input1.attr('name', 'date');
  var $input2 = $('<input>');
  $input2.attr('placeholder', 'Starting Odometer');
  $input2.attr('type', 'text');
  $input2.attr('name', 'startMiles');
  var $input3 = $('<input>');
  $input3.attr('placeholder', 'Ending Odometer');
  $input3.attr('type', 'text');
  $input3.attr('name', 'endMiles');
  var $button = $('<button>Submit</button>');
  $button.attr('id', 'submitcreate');

  $form.append($input1, $input2, $input3, $button);
  $div.append($form);
  $('body').append($div);

  $button.click(function(e) {
    e.preventDefault();

    var newEntry = {
      date: $(document.create.date).val(),
      startMiles: $(document.create.startMiles).val(),
      endMiles: $(document.create.endMiles).val(),
    };

    var req = $.ajax({
      type: "POST",
      url: "rest/miles/", //indicates creating a new entry
      dataType: "json",
      contentType: 'application/json', //setting the request headers content-type
      data: JSON.stringify(newEntry)
    });

    req.done(function(data, status) {
      console.log('GREAT SUCCESS CREATE');
      $(create).remove();
      $('#h2').remove();
      $('#milestable').remove();
      AjaxRequest();
    });

    req.fail(function(xhr, status, error) {
      console.log("CREATE ENTRY FAILED");
    });
  });
}

var deleteEntry = function(id, btn) {
  var req = $.ajax({
    type: "DELETE",
    url: "rest/miles/" + id
  });

  req.done(function(data, status) {
    console.log('GREAT SUCCESS DELETE');
    btn.parent().remove();
  });

  req.fail(function(xhr, status, error) {
    console.log("DELETE FAILED");
  });
}
