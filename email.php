<?php
	$errmsg = "";
	if (!isset($_POST['name']) ¦¦ empty($_POST['name']))
		$errmsg .= "<p>Please enter your name";
	if (!isset($_POST['email']) ¦¦ empty($_POST['email']))
		$errmsg .= "<p>Please enter your email address";
	if (!isset($_POST['message']) || empty($_POST['message']))
		$errmsg .= "<p>Please enter your message";
	if ($errmsg == "") {
 		echo $errmsg;
 		echo "<a href=\"javascript:history.back();\">Please go back and fill out the missing fields</a>";
 		exit;
	} else {
		$from = $_POST['email'];
		$name = $_POST['name'];
 		$to = "karate.club@csun.edu";
		$subject = "Interested in the karate club";
		$message = $_POST['message'];
		$headers .= "From: $name <$from>";
		$message = "Your order was successfully sent to www.example.com\n\n";
		$message .= "First Name: " . $_POST['firstname'] . "\n";
		$message .= "Last Name: " . $_POST['lastname'] . "\n";
		$message .= "Email: " . $_POST['email'] . "\n";
		$message .= "Product Requested: " . $_POST['product'] . "\n";
		$message .= "Quantity: " . $_POST['qty'] . "\n\n";
		$message .= "Thank you for using www.example.com\n\n";

		if (mail($to,$subject,$message,$headers)) {
			echo "<p>thank you for your order!";
		} else {
			echo "<p>email could not be sent";
		}
	}
?>