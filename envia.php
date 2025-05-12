<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $mensagem = $_POST['mensagem'];

    $to = 'fzx.design@hotmail.com';
    $subject = 'Novo Contato do Formulário';
    $message = "Nome: $nome\nE-mail: $email\nTelefone: $telefone\nMensagem: $mensagem";
    $headers = 'From: ' . $email . "\r\n" .
               'Reply-To: ' . $email . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo 'sucesso'; // Retorna 'sucesso' em caso de envio bem-sucedido
    } else {
        echo 'erro'; // Retorna 'erro' em caso de falha
    }
} else {
    echo 'método inválido'; // Resposta para métodos inválidos
}
?>
