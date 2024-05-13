function CriarConta() {

    // Criar Local Storage com JSON
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    if (username.length >= 3 && email.length > 8 && password.length >= 5) {
        const dados = {
            nome: username,
            password: password,
            email: email,
            morada: '',
            localidade: '',
            codPostal: '',
            nif: '',
            contacto: '',
            theme: 'dark',
            status: 'Offline'
        };

        const DadosJson = JSON.stringify(dados);

        localStorage.setItem('Cliente', DadosJson);

        console.table(DadosJson);

        window.location.href = '../MarketPlace/login.html';
        alert("Conta criada com sucesso!!!");
    } else {
        alert("Não cumpriu os requisitos para criar a conta");
        username.value = "";
        password.value = "";
        email.value = "";
    }
}