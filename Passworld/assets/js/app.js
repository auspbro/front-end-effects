$(document).ready(function() {
	
	// hide/show password
	$(".icon-wrapper").click(function() {
		$(".toggle-password").toggleClass(".ion-eye ion-more");
		var input = $($(".toggle-password").attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	// strength validation on keyup-event
	$("#password-field").on("keyup", function() {
		var val = $(this).val(),
			color = testPasswordStrength(val);

		styleStrengthLine(color, val);
	});

	// check password strength
	function testPasswordStrength(value) {
		var strongRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		),
			mediumRegex = new RegExp(
				"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
			);

		if (strongRegex.test(value)) {
			return "green";
		} else if (mediumRegex.test(value)) {
			return "orange";
		} else {
			return "red";
		}
	}

	function styleStrengthLine(color, value) {
		$(".line")
			.removeClass("bg-red bg-orange bg-green")
			.addClass("bg-transparent");
		
		if (value) {
			
			if (color === "red") {
				$(".line:nth-child(1)")
					.removeClass("bg-transparent")
					.addClass("bg-red");
			} else if (color === "orange") {
				$(".line:not(:last-of-type)")
					.removeClass("bg-transparent")
					.addClass("bg-orange");
			} else if (color === "green") {
				$(".line")
					.removeClass("bg-transparent")
					.addClass("bg-green");
			}
		}
	}

});
