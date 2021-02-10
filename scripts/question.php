<?php
function spamcheck($field) {
  $field = filter_var($field, FILTER_SANITIZE_EMAIL);
  return filter_var($field, FILTER_VALIDATE_EMAIL);
}

if ($_POST['email'] && spamcheck($_REQUEST['email'])) {
  $email = $_REQUEST['email']; 
  $subject = $_REQUEST['subject'];
  $message = $_REQUEST['message'];

  // mail("info@e-bikeadventure.be", "Subject: [Via website] $subject", $message, "From: $email" );
  mail("vic.segers10@gmail.com", "Subject: [Via website] $subject", $message, "From: $email");
  echo readfile("../response/success.html")[0];
} else {
  echo readfile("../response/error.html")[0];
}
?>