<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs to prevent injection
    $name = htmlspecialchars(trim($_POST['name']));
    $dob = htmlspecialchars(trim($_POST['dob']));
    $address = htmlspecialchars(trim($_POST['address']));
    $city = htmlspecialchars(trim($_POST['city']));
    $state = htmlspecialchars(trim($_POST['state']));
    $zip = htmlspecialchars(trim($_POST['zip']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $resume_option = $_POST['resume-option']; // 'typed' or 'file'
    $typed_resume = isset($_POST['typed-resume']) ? htmlspecialchars(trim($_POST['typed-resume'])) : '';
    $resume_file = isset($_FILES['resume']) ? $_FILES['resume'] : null;

    // Construct the email message
    $message = "
    Job Application Details:\n
    Full Name: $name\n
    Date of Birth: $dob\n
    Address: $address\n
    City: $city\n
    State: $state\n
    Zip: $zip\n
    Email: $email\n
    Phone: $phone\n
    Resume Option: $resume_option\n";

    // If typed resume was provided
    if ($resume_option == 'typed' && !empty($typed_resume)) {
        $message .= "Typed Resume:\n$typed_resume\n";
    }

    // If file upload was provided
    if ($resume_option == 'file' && $resume_file) {
        $file_name = $resume_file['name'];
        $file_tmp = $resume_file['tmp_name'];
        $file_path = 'uploads/' . $file_name;

        // Move the uploaded file to the "uploads" directory
        move_uploaded_file($file_tmp, $file_path);

        $message .= "File Resume: $file_name\n";
    }

    // Email details
    $to = "hr@hearthandhome.com"; // Replace with the actual email address
    $subject = "Job Application - $name";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for your application! We will review it and get back to you soon.";
    } else {
        echo "There was an error submitting your application. Please try again later.";
    }
}
?>
