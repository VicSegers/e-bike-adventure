<?php
  function spamcheck($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    return filter_var($field, FILTER_VALIDATE_EMAIL);
  }

  if ($_POST['email'] && spamcheck($_REQUEST['email'])) {
    $email = $_REQUEST['email']; 
    $subject = $_REQUEST['subject'];
    $message = $_REQUEST['message'];

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers .= "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

    mail("info@e-bikeadventure.be", "[Via website] $subject", $message, $headers);
    echo readfile("../response/success.html")[0];
  } else {
    echo readfile("../response/error.html")[0];
  }
?>