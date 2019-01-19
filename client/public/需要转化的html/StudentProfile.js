$(function StudentProfile() {
	$.ajax({
		url: '',
		type: 'GET',
		dataType: 'json',
		data: {param1: 'value1'},
		success: function student_profile(type, information, data, img) {
			image = "<img src=" + "'" + img + "'" + " class='photo'/>" ; 
			$("#studentprofile").append(image);

			for(var i = 0;i < information.length; i++) {
				var profile = "";
				profile = "<div class='feature'>" + "<h4>" + type[i] + "</h4>" + "<p>" + information[i] + "</p>" + "</div>"
				$("#studentprofile").append(profile);
			}
			//var studentid = information[0];
			//var name = information[1];
			// ... input rest attributes like above
			//$("#StudentID").html(studentid);
			//$("#Name").html(name);
			// ... input rest attributes like above
			var course_detail = ""
			for(var i = 0; i < data.length; i++) {
				var tr;
				tr = "<tr>" + "<a href = '#'>" + data.coursename + data. courseinformation + //.....
						+ "</a>" + "</tr>";
			}
			$("#CourseDetail").html(tr);
		},
	})
})

