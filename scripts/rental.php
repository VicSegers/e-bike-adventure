<?php
  function spamcheck($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    return filter_var($field, FILTER_VALIDATE_EMAIL);
  }

  if ($_POST['email'] && spamcheck($_REQUEST['email'])) {
    $firstName = $_REQUEST['firstName'];
    $surname = $_REQUEST['surname'];
    $adres = $_REQUEST['adres'];
    $postalCode = $_REQUEST['postalCode'];
    $location = $_REQUEST['location'];
    $phoneNumber = $_REQUEST['phoneNumber'];
    $email = $_REQUEST['email']; 
    $date = $_REQUEST['date'];
    $departTime = $_REQUEST['departTime'];
    $amountBikes = $_REQUEST['amountBikes'];
    $coupon = $_REQUEST['coupon'];
    $remaks = $_REQUEST['remarks'];

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers .= "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

    $message = 
    "Voornaam: $firstName\r\n
    Achternaam: $surname\r\n
    Adres: $adres\r\n
    Postcode: $postalCode\r\n
    Plaats: $location\r\n
    Telefoonnummer: $phoneNumber\r\n
    E-mailadres: $email\r\n
    Datum: $date\r\n
    Vertrekuur: $departTime\r\n
    Aantal fietsen: $amountBikes\r\n
    Cadeaubonnummer: $coupon\r\n
    Opmerkingen of vragen: $remarks";

    // mail("info@e-bikeadventure.be", "Subject: [Via website] $subject", $message, "From: $email" );
    mail("vic.segers10@gmail.com", "[Via website] $subject", $message, $headers);
    echo readfile("../response/success.html")[0];
  } else {
    echo readfile("../response/error.html")[0];
  }
?>