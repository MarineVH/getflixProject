<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require("./db_connection.php");
require 'vendor/autoload.php'; 

use Firebase\JWT\JWT;

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if username and password are set
if (isset($data['username']) && isset($data['password'])) {
    $username = htmlspecialchars($data['username']);
    $password = htmlspecialchars($data['password']);

    // Fetch user data from the database
    $stmt = $conn->prepare('SELECT * FROM users WHERE username = :username');
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Password is correct, generate JWT token
            $secretKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDV2Y7eubOwiP5\n/CC8tJNhuIfGwyIFwCPI2kUhzr9oN9C16fNjU2klzJg8odUb5V58yD/DNSYAh+pW\nQATpcyi5qKskw1iuxysbz04kQAVoBufPE0XRnQSxYzDhnysYv3gWMq00qgUxehGo\n87o5Xgm3swko8QfbGzu0X0c4Q1k7l0zgrOwEm0mu21EY3tOZhubvASEcWhopc3D7\nW9Nt31VMC1W3O2qi4XkflhA/SJs5xm8Pkr/Md8waoBUiHTynGSao8iWcIG3qvNho\nDkQGTA7/waMjWBooDWV1QnuhEUKdyhvMvjgFPMggodUZYooMJSrVxLNf9X3ufrAb\nWHht/NdjAgMBAAECggEAWmRar+J+5KVMzZSgt4HeA2XHGrBYUY3oYTyzqeHIi9rs\nLwnb8RX7fZzPw5rliRuaHibx7oxtEejTBOdp/ncmHMeSrpfgtTv/1EYZNEgV2F39\nrcKO1+EPd2BdkcI8SJ7tXGRF5y1X6t3AR0zFW1+LIqDr97CVgIv5FE3UoJH1vE9G\n2ypCoT/BsnD6Wx+Dsl+325gLU6pKwtqt7HELcyqstqIBb9RG1xl6zhr99fPRVdzg\nmPhtjDGvBh0kdgF8dYAy7FNxi9i1xmQUbKdgD7dKPShoRswm8QYjSKpssWttxvyq\nYgKTLilGssgZCh39ZxCUOs8ye1iK73atUSgFnWRGUQKBgQD0wHsDchV2WFVGVVm0\nglVQs1sB2ovjaLWeP6f3mdWbQhEgh1vD782nuz6iNh3DqOHpd4pFB0o7R6yV4uew\n5W6pwWw6v+lZsT758MqDSMzydGLosV3Qid4B3SKybEqMwMgNXw4Slc+aLckkIGsB\nixQRDv1k5YT93MFBA0HBeJREEQKBgQDMUZoS2fFVDVJtrhEvB24Tj428Qg7Jl0Tj\ncStAXleEC3cnSh7dFsKLWjjP5Nh57XOVeCZGB/pAoKwi83BlV/+mdiSKwYVl2kga\nSMmkH3YA6FJr1AJM/Aydtg02MwyFBqRNZ45CtmTrsxTUbMMu7m0UoeGrxvT2GQc6\nEx45rObIMwKBgQC7lkMyUuAsQmupaoVEmpg1MCJSe2S4OWrqDTP5zAgx5SMnYVdu\nB4ACTLsmrH+HlQsBW8O4QGwen0Kh5rVZmZ+FsF/5b1m0iusPugQdN1ENizK70iVr\nTh/AIfMT+XfyBVfPF8m7aOMi8nC1pbseBbCtmmWQTXHu+KGN6KcfWAGbYQKBgQCQ\nAwBXQzigG0i7OBKylEkZDnj3dZQYsT+EFHNI5nZHAxHUJqFEclNjh489sW6H2j86\n3joT6HGSde1+oRnaxMDUIre0+Zw94zIpHJ7LyMUS9K2LhR6uBoYZ74S2bBrp9HmA\neXpDOW4+17XZ2GNmw/UsssFuo0hr4c4/N9R5EI6GEwKBgBLlC3BhIeTBHlQVPaf5\n2UPs1a1UYGSMIeHAH5L4vN0brtFL+YB6p6N+ukAcnAxhlpQxQAEaizGnRMCAB9m9\nQ2eJqr89+NebahJVybaj3x4Nj+s7WFnrPh+t3zXXIrwHHbc7GaaZftI9BIvUFxif\nSMnYm1mv1T6zBpy7s8TdUPqc'; // Replace with a strong, secret key
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600; // Token expiration time (1 hour)

            $tokenData = array(
                'iat' => $issuedAt, // Issued at
                'exp' => $expirationTime, // Expiration time
                'data' => array(
                    'username' => $user['username'],
                    'role' => $user['role'],
                ),
            );

            $token = JWT::encode($tokenData, $secretKey, 'HS256');

            $response = array(
                'message' => 'Connexion réussie',
                'token' => $token,
                'username' => $user['username'],
                'role' => $user['role'],
            );

            echo json_encode($response);
        } else {
            // Invalid password
            echo json_encode(array('error' => 'Invalid username or password'));
        }
    } else {
        // User not found
        echo json_encode(array('error' => 'User not found'));
    }
} else {
    // Invalid request
    echo json_encode(array('error' => 'Invalid request'));
}

?>
