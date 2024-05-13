function login() {
    let username = document.getElementById('utilizador').value;
    let password = document.getElementById('password').value;

    if (username !== '' && password !== '') {
        if (localStorage.getItem('Cliente')) {
            // Recuperar os dados do localStorage e converter de volta para objeto
            let Getdados = JSON.parse(localStorage.getItem('Cliente'));

            console.log(Getdados);

            //Login para Modo Administrador
            if (username === 'admin@gmail.com' && password === 'admin') {
                window.location.href = '../MarketPlace/Admin';
                alert("Bem-Vindo Admin");
            } else if (username === Getdados.email && password === Getdados.password) { // Comparar os dados inseridos com os dados do localStorage
                // Redirecionar para a página do dashboard e definir status como "Online"
                Getdados.status = 'Online';
                localStorage.setItem('Cliente', JSON.stringify(Getdados)); // Atualizar o localStorage com o status "Online"

                // Verificar se o status foi atualizado corretamente
                if (Getdados.status === 'Online') {
                    window.location.href = '../MarketPlace/index.html';
                    alert("Bem-Vindo/a " + Getdados.nome);
                } else {
                    console.log(Getdados);
                }
            } else {
                alert("Endereço E-mail ou palavra-passe inválidos.");
            }
        } else {
            alert("Dados da Conta não foram encontrados");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }

    if (localStorage.getItem('Cliente') === null) { //Verificar se o localStorage do Cliente existe
        window.location.href = "../MarketPlace/CriarConta.html";
        alert("Não existe cliente registado\nCrie uma conta");
    }
}