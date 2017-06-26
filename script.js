$(document).ready(() => {
	
	$('#new-post').click((event) => {
		var customer = JSON.stringify({
			name: $('#name').val().trim(),
			age: $('#age').val().trim()
		});
		$.ajax({
	        url: 'http://localhost:3050/customers',
	        type: "POST",
            contentType: 'application/json',
	        data: customer,
	     }).done((data) => {
	     	console.log(customer.name+" "+customer.age); 
         }).fail(() => {});
	});

	$('#all-get').click((event) => {
		$.ajax({
	        url: 'http://localhost:3050/customers',
	        type: "GET"
	     }).done((data) => {
	     	console.log(data);
	     	$("#result-table tr").remove(); 
	     	for (var i = 0; i < data.length; i++) {
	     		var tr = $('<tr />').appendTo("#result-table");
		     	$('<td />').text('name: '+data[i].name).appendTo(tr);
		     	$('<td />').text("age: "+data[i].age).appendTo(tr);
	     	}
         }).fail(() => {});
	});

	$('#search-btn').click((event) => {
		var text = $('#search-field').val().trim();
		if (!isNaN(text)) {
			console.log("ahoj")
			$.ajax({
		        url: 'http://localhost:3050/customers/id/'+text,
		        type: "GET"
		     }).done((data) => {
		     	console.log(data);
		     	$("#result-table tr").remove();
		     	for (var i = 0; i < data.length; i++) {
		     		var tr = $('<tr />').appendTo("#result-table");
			     	$('<td />').text('name: '+data[i].name).appendTo(tr);
			     	$('<td />').text("age: "+data[i].age).appendTo(tr);
		     	}
	         }).fail(() => {});
		 } else {
		 	$.ajax({
		        url: 'http://localhost:3050/customers/name/'+text,
		        type: "GET"
		     }).done((data) => {
		     	console.log(data);
		     	$("#result-table tr").remove();
		     	for (var i = 0; i < data.length; i++) {
		     		var tr = $('<tr />').appendTo("#result-table");
			     	$('<td />').text('name: '+data[i].name).appendTo(tr);
			     	$('<td />').text("age: "+data[i].age).appendTo(tr);
		     	}
	         }).fail(() => {});
		 }
		
	});


});