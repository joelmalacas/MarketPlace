//Variável Global para Obter dados do Client em JSON e passar a Objeto
const Getdados = JSON.parse(localStorage.getItem('Cliente'));

window.onload = function() {
    const Message = document.getElementById("Message"),
        Logout = document.getElementById("Logout");

    try {
        if (localStorage.getItem('produtos') === null) {
            adicionarProduto(0, "Apple Watch SE (2023) GPS+Cellular 44mm Alumínio Meia-Noite c/ Bracelete Desportiva", "IOS", "../MarketPlace/Media/Apple_Watch_SE.jpg", "369,00€", 0, "20", "PORQUÊ O APPLE WATCH SE — Tudo o que é essencial para se motivar e ter uma vida mais ativa, estar sempre em contacto e cuidar da sua saúde e segurança. A Pilha inteligente e as apps atualizadas do watchOS 10 permitem ver mais informação num instante. Cheio de funcionalidades como a Deteção de acidente(1) e métricas de treino melhoradas, o valor do Apple Watch SE está mais competitivo do que nunca.");
            adicionarProduto(1, "Tablet Xiaomi Redmi Pad SE 11 8GB/256GB Wi-Fi Gray", "Android", "../MarketPlace/Media/produto1.jpg", "299,99€", 0, "10", 'Ecrã imersivo de 11″ FHD+ 90Hz\nProcessador Snapdragon 680\nBateria de 8000mAh\nDesbloqueio Facial por IA');
            adicionarProduto(2, "Redmi Note 12 4G 6.67 8GB/256GB ", "Android", "../MarketPlace/Media/produto4.jpg", "199.99€", 0, "15", "Processador Octa-Core Snapdragon 685\nEcrã de 6.67 FHD+ AMOLED\nTaxa de atualização de 120 Hz\nBateria de 5000mAh\nCâmara Traseira Tripla, com 50MP (Main Camera)");
            adicionarProduto(3, "Portátil Lenovo Yoga Pro 7", "Office", "../MarketPlace/Media/produto5.jpg", "999,90€", 0, "10", "Crie conteúdos de qualidade profissional com este potente portátil de 14,5 (36,83 cm);\nImpressionante ecrã 2.5K com gráficos integrados AMD Radeon™ 780M;\nComece o dia rapidamente com o início de sessão sem contacto;\nVideochamadas nítidas e cristalinas com câmara Web Full HD;\nDesign ao mesmo tempo elegante e resistente, com robustez de nível militar.");
            adicionarProduto(4, "Apple iPhone 15 Pro Max 6.7 256GB Titânio Preto", "IOS", "../MarketPlace/Media/produto6.jpg", "1349,90€", "0", "14", "O primeiro iPhone com design em titânio de qualidade aeroespacial. O revolucio­nário processador A17 Pro. O novo botão Ação personalizável. O sistema de câmaras mais poderoso de sempre num iPhone. E a ligação USB‑C com USB 3 para transferências ultrarrápidas.");
            adicionarProduto(5, "Cadeira Gaming Alpha Gamer Alegra PU Leather Branca/Preta", "Gaming", "../MarketPlace/Media/produto7.jpg", "239,90€", 0, "7", "Estrutura interna em metal\nBase em alumínio\nAlmofadas com espuma de memória\nSuporta até 150 kg de peso\nAlmofada Cervical incluída\nApoio lombar ajustável");
            adicionarProduto(6, "Portátil Victus by HP Gaming Laptop 16-s0006np 16.1 Cromado Preto", "Gaming", "../MarketPlace/Media/produto8.jpg", "1299,90€", 0, "22", "Equipado com um processador AMD, o Portátil de Gaming Victus by HP de 16,1 polegadas oferece o essencial para as tuas necessidades de gaming. O teclado de gaming versátil e o ecrã de alta resolução e taxa de atualização rápida proporcionam-te uma experiência imersiva. Vai mais além com um sistema de arrefecimento melhorado. Este portátil foi fabricado com plástico reciclado pós-consumo e plástico que teria como destino os oceanos.");
            adicionarProduto(7, "Monitor Curvo AOC Gaming C27G2ZE VA 27 FHD 16:9 240Hz FreeSync", "Gaming", "../MarketPlace/Media/produto9.jpg", "189,90€", 0, "11", "0.5ms | 1920x1080 | 300 cd/m² | 3000:1 | 1xDisplayPort 1.2 | 2xHDMI 2.0 | Jack 3.5mm");
            produtos();
        } else {
            produtos();
        }

        //User Mode
        if (Getdados.status === "Online") {
            Message.innerHTML = "Olá " + Getdados.nome + " 👋";
            Logout.innerHTML = '<i class="fas fa-sign-out-alt"></i> Encerrar Sessão';
        } else {
            Message.innerHTML = "Login";
            Logout.innerHTML = "";
        }

    } catch (e) {
        Message.innerHTML = "Login";
        produtos();
    }

    VerificaTheme();
    actives();
}

function logout() {
    //Encerrar sessão (Mudar Status para OFFLINE e Mudar Página)

    Getdados.status = "OFFLINE";
    localStorage.setItem('Cliente', JSON.stringify(Getdados)); // Atualizar o localStorage com o status "Online"

    if (Getdados.status === "OFFLINE") {
        window.location.reload();
    }
}

function produtos() {
    // Obter produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []; // [] senão houver item "produtos" então Cria Vazio

    const mainContent = document.querySelector('.main-content');

    //Limpar a Main-Content
    mainContent.innerHTML = '';

    // Loop em cada produto

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("id", "Card" + produto.id);

        const cardImage = document.createElement('img');
        cardImage.src = produto.imagem;

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = produto.titulo;

        const cardPreco = document.createElement('h3');
        cardPreco.textContent = produto.preco;

        const cardStatus = document.createElement('p');
        if (produto.stock === 0) {
            cardStatus.textContent = "Esgotado";
            cardStatus.style.color = "red";
        } else {
            cardStatus.textContent = "Disponível";
            cardStatus.style.color = "green";
        }

        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        card.appendChild(cardPreco);
        card.appendChild(cardStatus);

        mainContent.appendChild(card);
    }

    CliqueProdutos();
}


function adicionarProduto(id, titulo, categoria, imagem, preco, desconto, stock, descricao) {

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    const produto = {
        id: id,
        titulo: titulo,
        categoria: categoria,
        imagem: imagem,
        preco: preco,
        desconto: desconto,
        stock: stock,
        descricao: descricao
    };

    // Adicionar novo produto ao array
    produtos.push(produto);

    // Guardar o array de produtos no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function pesquisa() {
    //Pesquisar produtos pelo título

    const termoPesquisa = document.getElementById('Pesquisar').value.trim().toLowerCase(),
        mainContent = document.querySelector('.main-content');

    //Limpar Conteúdo
    mainContent.innerHTML = '';

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let c = 0;

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];

        if (produto.titulo.toLowerCase().includes(termoPesquisa)) { // Ignorar Maisculuas/Minusculas
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute("id", "Card" + produto.id);

            const cardImage = document.createElement('img');
            cardImage.src = produto.imagem;
            card.appendChild(cardImage);

            const cardTitle = document.createElement('h2');
            cardTitle.textContent = produto.titulo;
            card.appendChild(cardTitle);

            const cardPrice = document.createElement('h3');
            cardPrice.textContent = "Preço: " + produto.preco;
            card.appendChild(cardPrice);

            const cardStatus = document.createElement('p');
            if (produto.stock === 0) {
                cardStatus.textContent = "Esgotado";
                cardStatus.style.color = "red";
            } else {
                cardStatus.textContent = "Disponível";
                cardStatus.style.color = "green";
            }
            card.appendChild(cardStatus);

            mainContent.appendChild(card);
            c++;
        }
    }

    if (c == 0) {
        //Caso produto não seja encontrado
        const titulo = document.createElement('h1');

        titulo.innerHTML = "Produto não foi encontrado";

        mainContent.appendChild(titulo);
    }

    CliqueProdutos();
}

function actives() {
    const mainContent = document.querySelector('.main-content');
    //Media Cliques
    const Facebook = document.querySelector('.social-icons .Facebook'),
        Instagram = document.querySelector('.social-icons .Instagram'),
        Youtube = document.querySelector('.social-icons .youtube'),
        Linkedin = document.querySelector('.social-icons .linkedin'),
        Phone = document.querySelector('.social-icons .phone');

    Facebook.addEventListener('click', function() {
        window.open("https://facebook.com", "_blank");
    });

    Instagram.addEventListener('click', function() {
        window.open("https://instagram.com/", "_blank");
    });

    Youtube.addEventListener('click', function() {
        window.open("https://youtube.com/", "_blank");
    });

    Linkedin.addEventListener('click', function() {
        window.open("https://linkedin.com/", "_blank");
    });

    Phone.addEventListener('click', function() {
        window.location.href = "tel:+351912977256";
    });

    //Selecionar o <a> como active
    const Perfil = document.getElementById("Perfil"),
        Promo = document.getElementById("Promo"),
        Produto = document.getElementById("Produto"),
        Carrinho = document.getElementById("Carrinho"),
        Pedido = document.getElementById("Pedido"),
        Sobre = document.getElementById("Sobre"),
        Logout = document.getElementById("Logout"),
        Message = document.getElementById("Message"),
        Pesquisar = document.getElementById("Pesquisar"),
        PesquisaBTN = document.getElementById("PesquisaBTN"),
        Theme = document.getElementById("Theme"),
        Gaming = document.getElementById("Gaming"),
        Office = document.getElementById("Office"),
        Android = document.getElementById("Android"),
        IOS = document.getElementById("IOS");

    //EVENTOS 
    Perfil.addEventListener('click', function() {
        EventoPerfil();
        //REMOVER CLASS ACTIVE
        Promo.classList.remove("active");
        Produto.classList.remove("active");
        Carrinho.classList.remove("active");
        Pedido.classList.remove("active");
        Sobre.classList.remove("active");
        //ADD CLASS ACTIVE
        Perfil.classList.add("active");
    });

    Promo.addEventListener('click', function() {
        //REMOVER CLASS ACTIVE
        promocoes();
        Perfil.classList.remove("active");
        Produto.classList.remove("active");
        Carrinho.classList.remove("active");
        Pedido.classList.remove("active");
        Sobre.classList.remove("active");
        //ADD CLASS ACTIVE
        Promo.classList.add("active");
    });

    Produto.addEventListener('click', function() {
        const submenu = Produto.querySelector(".submenu");
        const chevronIcon = Produto.querySelector(".fas.fa-chevron-down");

        submenu.classList.toggle("active"); // Alterna a classe para mostrar o submenu

        chevronIcon.classList.toggle("fa-chevron-up"); //Alterna a seta para UP ou DOWN

        if (submenu.classList.contains("active")) {
            Theme.style.marginTop = "10%";
        } else {
            Theme.style.marginTop = "32vh";
        }

        //REMOVER CLASS ACTIVE
        Perfil.classList.remove("active");
        Promo.classList.remove("active");
        Carrinho.classList.remove("active");
        Pedido.classList.remove("active");
        Sobre.classList.remove("active");
        //ADD CLASS ACTIVE
        Produto.classList.add("active");
    });

    Carrinho.addEventListener('click', function() {
        //REMOVER CLASS ACTIVE
        ShopCarrinho();
        Perfil.classList.remove("active");
        Promo.classList.remove("active");
        Produto.classList.remove("active");
        Pedido.classList.remove("active");
        Sobre.classList.remove("active");
        //ADD CLASS ACTIVE
        Carrinho.classList.add("active");
    });

    Pedido.addEventListener('click', function() {
        //REMOVER CLASS ACTIVE
        Pedidos();
        Perfil.classList.remove("active");
        Promo.classList.remove("active");
        Produto.classList.remove("active");
        Carrinho.classList.remove("active");
        Sobre.classList.remove("active");
        //ADD CLASS ACTIVE
        Pedido.classList.add("active");
    });

    Sobre.addEventListener('click', function() {
        About();
        //REMOVER CLASS ACTIVE
        Perfil.classList.remove("active");
        Promo.classList.remove("active");
        Produto.classList.remove("active");
        Carrinho.classList.remove("active");
        Pedido.classList.remove("active");
        //ADD CLASS ACTIVE
        Sobre.classList.add("active");
    });

    Message.addEventListener('click', function() {
        //Fazer Login
        if (Message.innerHTML === "Login") {
            window.location.href = "../MarketPlace/login.html";
        } else {
            EventoPerfil();
        }
    });

    Logout.addEventListener('click', function() {
        logout();
    });

    Pesquisar.addEventListener('input', function() {
        pesquisa();
        CliqueProdutos();
    });

    PesquisaBTN.addEventListener('click', function() {
        //Evento Pesquisar
        pesquisa();
        CliqueProdutos();
    });

    Theme.addEventListener('click', function() {
        ToogleDL();
        VerificaTheme();
    });

    Gaming.addEventListener('click', function() {

        mainContent.innerHTML = '';

        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];

            if (produto.categoria.includes("Gaming")) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute("id", "Card" + produto.id);

                const cardImage = document.createElement('img');
                cardImage.src = produto.imagem;
                card.appendChild(cardImage);

                const cardTitle = document.createElement('h2');
                cardTitle.textContent = produto.titulo;
                card.appendChild(cardTitle);

                const cardPrice = document.createElement('h3');
                cardPrice.textContent = "Preço: " + produto.preco;
                card.appendChild(cardPrice);

                const cardStatus = document.createElement('p');
                if (produto.stock === 0) {
                    cardStatus.textContent = "Esgotado";
                    cardStatus.style.color = "red";
                } else {
                    cardStatus.textContent = "Disponível";
                    cardStatus.style.color = "green";
                }
                card.appendChild(cardStatus);

                mainContent.appendChild(card);
            }
        }
        CliqueProdutos();
    });

    Office.addEventListener('click', function() {
        mainContent.innerHTML = '';

        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];

            if (produto.categoria.includes("Office")) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute("id", "Card" + produto.id);

                const cardImage = document.createElement('img');
                cardImage.src = produto.imagem;
                card.appendChild(cardImage);

                const cardTitle = document.createElement('h2');
                cardTitle.textContent = produto.titulo;
                card.appendChild(cardTitle);

                const cardPrice = document.createElement('h3');
                cardPrice.textContent = "Preço: " + produto.preco;
                card.appendChild(cardPrice);

                const cardStatus = document.createElement('p');
                if (produto.stock === 0) {
                    cardStatus.textContent = "Esgotado";
                    cardStatus.style.color = "red";
                } else {
                    cardStatus.textContent = "Disponível";
                    cardStatus.style.color = "green";
                }
                card.appendChild(cardStatus);

                mainContent.appendChild(card);
            }
        }
        CliqueProdutos();
    });

    Android.addEventListener('click', function() {
        mainContent.innerHTML = '';

        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];

            if (produto.categoria.includes("Android")) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute("id", "Card" + produto.id);

                const cardImage = document.createElement('img');
                cardImage.src = produto.imagem;
                card.appendChild(cardImage);

                const cardTitle = document.createElement('h2');
                cardTitle.textContent = produto.titulo;
                card.appendChild(cardTitle);

                const cardPrice = document.createElement('h3');
                cardPrice.textContent = "Preço: " + produto.preco;
                card.appendChild(cardPrice);

                const cardStatus = document.createElement('p');
                if (produto.stock === 0) {
                    cardStatus.textContent = "Esgotado";
                    cardStatus.style.color = "red";
                } else {
                    cardStatus.textContent = "Disponível";
                    cardStatus.style.color = "green";
                }
                card.appendChild(cardStatus);

                mainContent.appendChild(card);
            }
        }
        CliqueProdutos();
    });

    IOS.addEventListener("click", function() {
        mainContent.innerHTML = '';

        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];

            if (produto.categoria.includes("IOS")) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute("id", "Card" + produto.id);

                const cardImage = document.createElement('img');
                cardImage.src = produto.imagem;
                card.appendChild(cardImage);

                const cardTitle = document.createElement('h2');
                cardTitle.textContent = produto.titulo;
                card.appendChild(cardTitle);

                const cardPrice = document.createElement('h3');
                cardPrice.textContent = "Preço: " + produto.preco;
                card.appendChild(cardPrice);

                const cardStatus = document.createElement('p');
                if (produto.stock === 0) {
                    cardStatus.textContent = "Esgotado";
                    cardStatus.style.color = "red";
                } else {
                    cardStatus.textContent = "Disponível";
                    cardStatus.style.color = "green";
                }

                card.appendChild(cardStatus);

                mainContent.appendChild(card);
            }
        }

        CliqueProdutos();

    });
}

function EventoPerfil() {
    // Criar elementos
    const mainContent = document.querySelector('.main-content');

    mainContent.innerHTML = '';

    if (Getdados.status === "Online") {
        const profileContainer = document.createElement('div');
        profileContainer.classList.add('profile-container');

        const titulo = document.createElement('h1');
        titulo.id = 'Titulo';
        titulo.innerHTML = 'Meu Perfil';
        titulo.style.textAlign = "center";

        const form = document.createElement('form');
        form.id = 'profile-form';

        const formGroup1 = document.createElement('div');
        formGroup1.classList.add('form-group');
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Nome:';
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'name');
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('required', '');

        const formGroup2 = document.createElement('div');
        formGroup2.classList.add('form-group');
        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = 'Email:';
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('name', 'email');
        emailInput.setAttribute('required', '');

        const formGroup3 = document.createElement('div');
        formGroup3.classList.add('form-group');
        const passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.textContent = 'Palavra-Passe:';
        const passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        passwordInput.setAttribute('name', 'password');
        passwordInput.setAttribute('required', '');

        const formGroup4 = document.createElement('div');
        formGroup4.classList.add('form-group');
        const moradalabel = document.createElement('label');
        moradalabel.setAttribute('for', 'morada');
        moradalabel.textContent = 'Morada:';
        const moradaInput = document.createElement('input');
        moradaInput.setAttribute('type', 'text');
        moradaInput.setAttribute('id', 'morada');
        moradaInput.setAttribute('name', 'morada');

        const formGroup5 = document.createElement('div');
        formGroup5.classList.add('form-group');
        const codpostalabel = document.createElement('label');
        codpostalabel.setAttribute('for', 'Codigo Postal');
        codpostalabel.textContent = 'Código Postal:';
        const codpostalInput = document.createElement('input');
        codpostalInput.setAttribute('type', 'text');
        codpostalInput.setAttribute('id', 'codpostal');
        codpostalInput.setAttribute('name', 'codpostal');

        const formGroup6 = document.createElement('div');
        formGroup6.classList.add('form-group');
        const localidadelabel = document.createElement('label');
        localidadelabel.setAttribute('for', 'Localidade');
        localidadelabel.textContent = 'Localidade:';
        const localidadeInput = document.createElement('input');
        localidadeInput.setAttribute('type', 'text');
        localidadeInput.setAttribute('id', 'localidade');
        localidadeInput.setAttribute('name', 'localidade');

        const formGroup7 = document.createElement('div');
        formGroup7.classList.add('form-group');
        const niflabel = document.createElement('label');
        niflabel.setAttribute('for', 'NIF');
        niflabel.textContent = 'NIF:';
        const nifInput = document.createElement('input');
        nifInput.setAttribute('type', 'number');
        nifInput.setAttribute('id', 'NIF');
        nifInput.setAttribute('name', 'NIF');

        const formGroup8 = document.createElement('div');
        formGroup8.classList.add('form-group');
        const contactolabel = document.createElement('label');
        contactolabel.setAttribute('for', 'Contacto');
        contactolabel.textContent = 'Contacto:';
        const contactoInput = document.createElement('input');
        contactoInput.setAttribute('type', 'tel');
        contactoInput.setAttribute('id', 'contacto');
        contactoInput.setAttribute('name', 'contacto');


        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn-guardar');
        button.setAttribute('id', 'BtnGuardar');
        button.textContent = 'Guardar Alterações';

        // Estrutura
        formGroup1.appendChild(nameLabel);
        formGroup1.appendChild(nameInput);
        formGroup2.appendChild(emailLabel);
        formGroup2.appendChild(emailInput);
        formGroup3.appendChild(passwordLabel);
        formGroup3.appendChild(passwordInput);
        formGroup4.appendChild(moradalabel);
        formGroup4.appendChild(moradaInput);
        formGroup5.appendChild(codpostalabel);
        formGroup5.appendChild(codpostalInput);
        formGroup6.appendChild(localidadelabel);
        formGroup6.appendChild(localidadeInput);
        formGroup7.appendChild(niflabel);
        formGroup7.appendChild(nifInput);
        formGroup8.appendChild(contactolabel);
        formGroup8.appendChild(contactoInput);

        form.appendChild(formGroup1);
        form.appendChild(formGroup2);
        form.appendChild(formGroup3);
        form.appendChild(formGroup4);
        form.appendChild(formGroup5);
        form.appendChild(formGroup6);
        form.appendChild(formGroup7);
        form.appendChild(formGroup8);
        form.appendChild(button);

        profileContainer.appendChild(titulo);
        profileContainer.appendChild(form);

        mainContent.appendChild(profileContainer);


        //Carregar Dados do Perfil para os campos
        const Nome = document.getElementById('name'),
            Email = document.getElementById('email'),
            Passe = document.getElementById('password'),
            Morada = document.getElementById('morada'),
            CodPostal = document.getElementById('codpostal'),
            Localidade = document.getElementById('localidade'),
            NIF = document.getElementById('NIF'),
            Contacto = document.getElementById('contacto');

        Nome.value = Getdados.nome;
        Email.value = Getdados.email;
        Passe.value = Getdados.password;
        Morada.value = Getdados.morada;
        CodPostal.value = Getdados.codPostal;
        Localidade.value = Getdados.localidade;
        NIF.value = Getdados.nif;
        Contacto.value = Getdados.contacto;

        button.addEventListener('click', function() { //Após Criado o elemento Button Guardar, o mesmo Chama a função para guardar dados
            GuardarAltPerfil();
        });

    } else {
        const titulo = document.createElement('h1');
        titulo.style.textAlign = "center";
        titulo.innerHTML = "Faça Login para ver o seu perfil";

        mainContent.appendChild(titulo);
    }

}


function About() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';

    const paragrafo = document.createElement('p');
    const Titulo = document.createElement('h3');

    Titulo.innerHTML = "Sobre E-MARKET";

    const textoSobre = [
        'Apesar de suas vantagens, os Marketplaces também apresentam desafios e considerações importantes para tanto consumidores quanto vendedores. Por exemplo, a concorrência acirrada entre os vendedores pode levar a uma guerra de preços e a uma redução das margens de lucro. Além disso, questões relacionadas à segurança dos dados, autenticidade dos produtos e qualidade do serviço também são preocupações comuns.',
        'Para os vendedores, é essencial desenvolver uma estratégia sólida para se destacar em um ambiente altamente competitivo e garantir a satisfação do cliente. Isso pode envolver investimentos em marketing, atendimento ao cliente e qualidade do produto.',
        'Para os consumidores, é importante fazer uma pesquisa detalhada antes de fazer uma compra em um Marketplace, verificar a reputação do vendedor, ler avaliações e avaliações de produtos e estar ciente das políticas de garantia e devolução.',
        'Os Marketplaces continuam a desempenhar um papel significativo no cenário do comércio eletrônico, oferecendo benefícios tanto para os consumidores quanto para os vendedores. Com o avanço da tecnologia e a evolução das preferências do consumidor, é provável que os Marketplaces continuem a se expandir e a se adaptar para atender às necessidades em constante mudança do mercado.',
        'Apesar de suas vantagens, os Marketplaces também apresentam desafios e considerações importantes para tanto consumidores quanto vendedores. Por exemplo, a concorrência acirrada entre os vendedores pode levar a uma guerra de preços e a uma redução das margens de lucro. Além disso, questões relacionadas à segurança dos dados, autenticidade dos produtos e qualidade do serviço também são preocupações comuns.',
        'Para os vendedores, é essencial desenvolver uma estratégia sólida para se destacar em um ambiente altamente competitivo e garantir a satisfação do cliente. Isso pode envolver investimentos em marketing, atendimento ao cliente e qualidade do produto.',
        'Os Marketplaces continuam a desempenhar um papel significativo no cenário do comércio eletrônico, oferecendo benefícios tanto para os consumidores quanto para os vendedores. Com o avanço da tecnologia e a evolução das preferências do consumidor, é provável que os Marketplaces continuem a se expandir e a se adaptar para atender às necessidades em constante mudança do mercado.'
    ];

    mainContent.appendChild(Titulo);

    for (let i = 0; i < textoSobre.length; i++) {
        const novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = textoSobre[i];
        paragrafo.appendChild(novoParagrafo);
    }

    mainContent.appendChild(paragrafo);
}

function VerificaTheme() {
    const Sidebar = document.getElementById('sidebar');
    const Theme = document.getElementById("Theme"),
        menuLinks = document.querySelectorAll('.menu li a');

    try {
        if (Getdados.theme === 'dark') {
            Theme.innerHTML = 'Modo Escuro ☾';
            Sidebar.style.backgroundColor = "#333";
            Sidebar.style.color = "white";

            for (let i = 0; i < menuLinks.length; i++) {
                const link = menuLinks[i]; // Obtém o link atual dentro do ciclo
                link.style.color = 'white';
            }

        } else if (Getdados.theme === 'light') {
            Theme.innerHTML = 'Modo Claro ✺';
            Sidebar.style.backgroundColor = "white";
            Sidebar.style.color = "black";

            for (let i = 0; i < menuLinks.length; i++) {
                const link = menuLinks[i]; // Obtém o link atual dentro do ciclo
                link.style.color = 'black';
            }
        }
    } catch (e) {
        Theme.innerHTML = 'Modo Escuro ☾';
        Sidebar.style.backgroundColor = "#333";
        Sidebar.style.color = "white";

    }
}

function ToogleDL() {
    // Função ToogleDL() para alternar entre os modos Dark e Light
    const Sidebar = document.getElementById('sidebar'), // Obtém o elemento sidebar
        menuLinks = document.querySelectorAll('.menu li a'),
        Message = document.getElementById("Message");

    try {
        if (Getdados.status === 'Online') {
            if (Getdados.theme === 'dark') {
                Sidebar.style.backgroundColor = "white";
                Sidebar.style.color = "black";
                Getdados.theme = "light";
                localStorage.setItem('Cliente', JSON.stringify(Getdados));
                VerificaTheme();
            } else {
                Sidebar.style.backgroundColor = "#333";
                Sidebar.style.color = "white";
                Getdados.theme = "dark";
                localStorage.setItem('Cliente', JSON.stringify(Getdados));
                console.log("Theme: dark");
                VerificaTheme();
            }
        } else {
            alert("Faça login para alterar o tema");
        }
    } catch (e) {
        if (Message.innerHTML = "Login") {
            alert("Crie conta para alterar o tema");
        }
        Sidebar.style.backgroundColor = "#333";
        Sidebar.style.color = "white";
        Getdados.theme = "dark";
        console.log("Theme: dark");
    }
}

function CliqueProdutos() {
    //Listar detalhes produtos no contentor 
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const mainContent = document.querySelector('.main-content');

    for (let i = 0; i < produtos.length; i++) {

        const produto = produtos[i];

        const CliqueProduto = document.getElementById("Card" + produto.id);

        if (CliqueProduto) { // Adicionar evento de clique ao card se for encontrado
            CliqueProduto.addEventListener("click", function() {
                mainContent.innerHTML = '';
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Cria e adiciona a imagem do produto
                const productImage = document.createElement('div');
                productImage.classList.add('product-image');
                const img = document.createElement('img');
                img.src = produto.imagem;
                img.alt = "Imagem do Produto";
                productImage.appendChild(img);
                productCard.appendChild(productImage);

                // Cria e adiciona os detalhes do produto
                const productDetails = document.createElement('div');
                productDetails.classList.add('product-details');

                const title = document.createElement('h3');
                title.classList.add('product-title');
                title.textContent = produto.titulo;
                productDetails.appendChild(title);

                const price = document.createElement('h3');
                price.classList.add('product-price');
                price.textContent = produto.preco;
                productDetails.appendChild(price);

                const categoria = document.createElement('h3');
                categoria.classList.add('product-category');
                categoria.textContent = "Categoria:" + produto.categoria;
                productDetails.appendChild(categoria);

                const cardStatus = document.createElement('p');
                if (produto.stock === 0) {
                    cardStatus.textContent = "Esgotado";
                    cardStatus.style.color = "red";
                } else {
                    cardStatus.textContent = "Disponível";
                    cardStatus.style.color = "green";
                }

                const descricao = document.createElement('p');
                descricao.classList.add('product-descricao');
                descricao.textContent = "Descrição: " + produto.descricao;
                productDetails.appendChild(descricao);

                const addToCartButton = document.createElement('button');
                addToCartButton.classList.add('add-to-cart-button');
                addToCartButton.setAttribute('id', 'addToCartButton');
                addToCartButton.textContent = 'ADICIONAR 🛒';

                productDetails.appendChild(cardStatus);
                productDetails.appendChild(addToCartButton);

                productCard.appendChild(productDetails);

                mainContent.appendChild(productCard);

                if (localStorage.getItem('Carrinho')) { // Verifica se existe o LocalStorage Carrinho
                    if (localStorage.getItem('Carrinho').includes(produto.titulo)) {
                        addToCartButton.textContent = "Remover 🛒";
                        addToCartButton.style.backgroundColor = "orange";
                    }
                }

                //Ler Evento Botão Adicionar ao Carrinho
                addToCartButton.addEventListener('click', function() {
                    const Carrinho = JSON.parse(localStorage.getItem('Carrinho')) || []; // Verificar se há itens no carrinho ou inicializar um array vazio

                    const ProdutoCarrinho = {
                        Id: produto.id,
                        Produto: produto.titulo,
                        Imagem: produto.imagem,
                        Categoria: produto.categoria,
                        Quantidade: 1,
                        Stock: produto.stock,
                        Preco: produto.preco
                    };

                    //Verificar a status para poder adicionar ao carrinho
                    if (Getdados.status === "OFFLINE") {
                        alert("Inicie sessão para adicionar ao carrinho");
                    } else if (cardStatus.textContent === "Esgotado") {
                        alert("Não é possível adicionar o produto ao carrinho\nO produto selecionado está esgotado");
                    } else {
                        if (addToCartButton.textContent === "Remover 🛒") {
                            const index = Carrinho.findIndex(item => item.Produto === produto.titulo);
                            //Função Call Back dentro do FindIndex com o parametro item e que compara o Item de cada produto com
                            // o titulo de cada produto

                            //Remover do Carrinho
                            Carrinho.splice(index, 1); // Remover do Array do artigo selecionado

                            const DadosCarrinho = JSON.stringify(Carrinho); // Colocar em JSON do Carrinho com o array removido

                            localStorage.setItem('Carrinho', DadosCarrinho); // Atualizar o localStorage com os dados do carrinho

                            alert("Produto removido do Carrinho");

                            addToCartButton.textContent = "ADICIONAR 🛒";
                            addToCartButton.style.backgroundColor = "#007bff";

                        } else {

                            Carrinho.push(ProdutoCarrinho); // Adicionar o produto ao array do carrinho

                            const DadosCarrinho = JSON.stringify(Carrinho);

                            localStorage.setItem('Carrinho', DadosCarrinho); // Atualizar o localStorage com os dados do carrinho

                            alert("Produto adicionado ao Carrinho");

                            addToCartButton.textContent = "Remover 🛒";
                            addToCartButton.style.backgroundColor = "orange";

                            var resposta = confirm("Deseja ir para o carrinho?") // Criar Opção para o utilizador para ir carrinho 
                            if (resposta == true) {
                                ShopCarrinho();
                            }
                        }
                    }
                });
            });
        }
    }
}

function GuardarAltPerfil() {
    //Guardar as Alterações e colocar no localStorge do Cliente 
    const NewUser = document.getElementById('name').value,
        NewEmail = document.getElementById('email').value,
        Newpassword = document.getElementById('password').value,
        Newmorada = document.getElementById('morada').value,
        NewcodPostal = document.getElementById('codpostal').value,
        Newlocalidade = document.getElementById('localidade').value,
        NewNIF = document.getElementById('NIF').value,
        NewContacto = document.getElementById('contacto').value;

    Getdados.nome = NewUser;
    Getdados.email = NewEmail;
    Getdados.password = Newpassword;
    Getdados.morada = Newmorada;
    Getdados.codPostal = NewcodPostal;
    Getdados.localidade = Newlocalidade;
    Getdados.nif = NewNIF;
    Getdados.contacto = NewContacto;

    localStorage.setItem('Cliente', JSON.stringify(Getdados));

    alert("Alterações efetuadas com sucesso!!!");
}

function ShopCarrinho() {
    //Página Gestão Carrinho
    const mainContent = document.querySelector('.main-content');

    const Carrinho = JSON.parse(localStorage.getItem('Carrinho')) || [];

    mainContent.innerHTML = '';

    if (Carrinho.length == 0) { // Se o array não existir
        const Titulo = document.createElement('h1');
        Titulo.innerHTML = 'Não existe produtos no carrinho 🛒';
        Titulo.style.textAlign = 'center';
        mainContent.appendChild(Titulo);
    }

    if (Carrinho === null) { // Se o array existir mas tiver a 0
        const Titulo = document.createElement('h1');
        Titulo.innerHTML = 'Não existe produtos no carrinho 🛒';
        Titulo.style.textAlign = 'center';
        mainContent.appendChild(Titulo);
    }

    if (Getdados.status === "OFFLINE") {
        const Titulo = document.createElement('h1');
        Titulo.innerHTML = 'Inicie Sessão para adicionar produtos e ver carrinho 🛒';
        Titulo.style.textAlign = 'center';
        mainContent.appendChild(Titulo);
    } else {
        for (let i = 0; i < Carrinho.length; i++) {
            const Carrinho_produto = Carrinho[i];

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-carrinho');

            //Criar elemento Imagem
            const imageDiv = document.createElement('img');
            imageDiv.src = Carrinho_produto.Imagem;
            imageDiv.classList.add('carrinho-card-image');

            // Criar elemento de título
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('carrinho-title');
            titleDiv.textContent = Carrinho_produto.Produto;

            // Criar elemento de preço
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('carrinho-price');
            priceDiv.textContent = Carrinho_produto.Preco;

            // Criar elemento de quantidade
            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('carrinho-quantity');

            // Botão remover quantidade
            const removeQuantityBtn = document.createElement('button');
            removeQuantityBtn.classList.add('btn', 'carrinho-btn-remove');
            removeQuantityBtn.textContent = '-';
            removeQuantityBtn.onclick = function() {
                //Remover Quantidade (-1)
                quantityInput.value--;

                if (quantityInput.value == 0) {
                    alert('Quantidade mínima é: 1');
                    quantityInput.value = 1;
                } else {
                    Carrinho_produto.Quantidade = quantityInput.value;
                    localStorage.setItem('Carrinho', JSON.stringify(Carrinho));
                    ShopCarrinho();
                }
            };

            // Input quantidade
            const quantityInput = document.createElement('input');
            quantityInput.setAttribute('type', 'number');
            quantityInput.setAttribute('readonly', '');
            quantityInput.value = Carrinho_produto.Quantidade;

            // Botão adição quantidade
            const addQuantityBtn = document.createElement('button');
            addQuantityBtn.classList.add('carrinho-btn');
            addQuantityBtn.textContent = '+';
            addQuantityBtn.onclick = function() {
                //Adicionar Quantidade (+1)
                quantityInput.value++;
                if (quantityInput.value > parseInt(Carrinho_produto.Stock)) { // Verifica se o pedido é maior que o stock
                    quantityInput.value--;
                    alert("Não é possível pedir: " + quantityInput.value + " só temos em stock: " + Carrinho_produto.Stock);
                } else {
                    Carrinho_produto.Quantidade = quantityInput.value;

                    localStorage.setItem('Carrinho', JSON.stringify(Carrinho));
                    ShopCarrinho();
                }
            };

            // Botão remover produto
            const removeProductBtn = document.createElement('button');
            removeProductBtn.classList.add('btn-remove');
            removeProductBtn.innerHTML = 'Remover <i class="fas fa-solid fa-trash"></i>';
            removeProductBtn.onclick = function() {
                //Remover produto do array
                // Encontra o índice do produto no array Carrinho
                const index = Carrinho.findIndex(item => item.Produto === Carrinho_produto.Produto);

                // remove o produto do array Carrinho
                Carrinho.splice(index, 1);

                // Atualiza o armazenamento local com o carrinho atualizado
                localStorage.setItem('Carrinho', JSON.stringify(Carrinho));

                // Remove o elemento CARD do Carrinho
                cardDiv.remove();
                ShopCarrinho(); // Chama a própria função para atualizar os valores

                // Condição se não houver produtos
                if (Carrinho.length == 0 || Carrinho === null) { // Se o array existir mas estiver a 0 ou não existir
                    const Titulo = document.createElement('h1');
                    Titulo.innerHTML = 'Não existe produtos no carrinho 🛒';
                    Titulo.style.textAlign = 'center';
                    mainContent.appendChild(Titulo);
                }
            };

            //Estrutura
            cardDiv.appendChild(imageDiv);
            cardDiv.appendChild(titleDiv);
            cardDiv.appendChild(priceDiv);
            quantityDiv.appendChild(addQuantityBtn);
            quantityDiv.appendChild(quantityInput);
            quantityDiv.appendChild(removeQuantityBtn);

            cardDiv.appendChild(quantityDiv);
            cardDiv.appendChild(removeProductBtn);

            mainContent.appendChild(cardDiv);
        }

        if (Carrinho !== 0 || Carrinho !== null) { // Se o Carrinho localStorage existir cria o card Total
            TotalCarrinho();
        }
    }

}

function TotalCarrinho() {
    const mainContent = document.querySelector('.main-content');
    const Carrinho_Total = JSON.parse(localStorage.getItem('Carrinho'));

    const TotalCardDiv = document.createElement('div');
    TotalCardDiv.classList.add('TotalCard-carrinho');
    const TotalValorProdutos = document.createElement('h3');
    TotalValorProdutos.setAttribute('type', 'value');

    let Total = 0;

    for (let i = 0; i < Carrinho_Total.length; i++) {
        const CarrinhoTotal = Carrinho_Total[i];
        const TotalProduto = document.createElement('p');
        TotalProduto.innerHTML = "<strong> Produto: </strong>" + CarrinhoTotal.Produto + "<br><strong> Preço: </strong>" + CarrinhoTotal.Preco + "<br><br>";
        //Cria o elemento TotalProduto usando o elemento <p> e coloco o Produto e o Preço em Negrito e á frente o nome e o preço de cada produto

        TotalCardDiv.appendChild(TotalProduto);

        let precoConvert = CarrinhoTotal.Preco; // Converter o preço de virgula para ponto e o simbolo do € para null
        precoConvert = precoConvert.replace(",", ".");
        precoConvert = precoConvert.replace("€", "");

        Total += parseFloat((precoConvert * CarrinhoTotal.Quantidade) + 5.00); // Faz a conta dos preços com os portes incluidos
    }

    console.log(Total);
    TotalValorProdutos.textContent = "Valor total: " + Total + " €";

    const Portes = document.createElement('p');
    Portes.innerHTML = "<strong>Portes:</strong> 5.00 €  (Cada produto)";

    const FinalizarProductBtn = document.createElement('button');
    FinalizarProductBtn.classList.add('btn-finalizar-product');
    FinalizarProductBtn.textContent = 'Finalizar 🛒';
    FinalizarProductBtn.onclick = function() {
        //Evento Finalizar Compra
        const Produtos = JSON.parse(localStorage.getItem('produtos'));

        for (let i = 0; i < Carrinho_Total.length; i++) {
            const carrinho = Carrinho_Total[i];

            // Encontrar o produto correspondente no array Produtos 
            const Index = Produtos.findIndex(produto => produto.id === carrinho.Id);
            if (Index !== -1) {
                const produto = Produtos[Index]; //Variavel Produto é atribuido ao produto que está no index do array [produtos]
                const ConvertStock = Number(produto.stock);
                const ConvertQuantidade = Number(carrinho.Quantidade);
                produto.stock = ConvertStock - ConvertQuantidade;

                // Atualizar o produto no array Produtos
                Produtos[Index] = produto;
            }
        }

        localStorage.setItem('produtos', JSON.stringify(Produtos));


        const carrinhoData = localStorage.getItem('Carrinho');
        localStorage.setItem('Pedidos', carrinhoData); // Colocar os Dados do Carrinho para o LocalStorage Pedidos

        alert("Compra foi efetuada com sucesso!!!\nCom o Valor Total de: " + Total + "€");
        localStorage.removeItem('Carrinho'); //Limpa o localStorage Carrinho

        Pedidos();
    };

    TotalCardDiv.appendChild(Portes);
    TotalCardDiv.appendChild(TotalValorProdutos);
    TotalCardDiv.appendChild(FinalizarProductBtn);
    mainContent.appendChild(TotalCardDiv);
}

function Pedidos() {
    //Função para ver os pedidos, que só são possíveis de ver após a compra ser concluída
    const mainContent = document.querySelector('.main-content');
    const StoragePedido = JSON.parse(localStorage.getItem('Pedidos'));

    mainContent.innerHTML = '';

    if (Getdados.status === 'OFFLINE') {
        const Titulo = document.createElement('h1');
        Titulo.textContent = 'Inicie Sessão para ver os pedidos';

        mainContent.appendChild(Titulo);
    } else {
        if (StoragePedido == 0 || StoragePedido == null) {
            const Titulo = document.createElement('h1');
            Titulo.textContent = 'Não foram encontrados produtos nos pedidos';

            mainContent.appendChild(Titulo);
        } else {
            //Cards Pedidos
            for (let i = 0; i < StoragePedido.length; i++) {
                const pedido = StoragePedido[i];

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card-carrinho');

                //Criar elemento Imagem
                const imageDiv = document.createElement('img');
                imageDiv.src = pedido.Imagem;
                imageDiv.classList.add('carrinho-card-image');

                // Criar elemento de título
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('carrinho-title');
                titleDiv.textContent = pedido.Produto;

                // Criar elemento de preço
                const priceDiv = document.createElement('div');
                priceDiv.classList.add('carrinho-price');
                priceDiv.textContent = "Preço: " + pedido.Preco;

                const Quantidade = document.createElement('div');
                Quantidade.classList.add('carrinho-quantity');
                Quantidade.textContent = "Quantidade: " + pedido.Quantidade;

                //Criar elemento com Nome,Morada, CodPostal e status da Ecomenda
                const nomeEcomenda = document.createElement('p');
                nomeEcomenda.innerHTML = "<strong>Nome: </strong>" + Getdados.nome;

                const moradaEcomenda = document.createElement('p');
                moradaEcomenda.innerHTML = "<strong>Morada: </strong>" + Getdados.morada;

                const codPostalEcomenda = document.createElement('p');
                codPostalEcomenda.innerHTML = "<strong>Código Postal: </strong>" + Getdados.codPostal;

                const StatusEcomenda = document.createElement('p');
                StatusEcomenda.innerHTML = "<strong>Estado: </strong> Expedição";

                //Estrutura
                cardDiv.appendChild(imageDiv);
                cardDiv.appendChild(titleDiv);
                cardDiv.appendChild(priceDiv);
                cardDiv.appendChild(Quantidade);
                cardDiv.appendChild(nomeEcomenda);
                cardDiv.appendChild(moradaEcomenda);
                cardDiv.appendChild(codPostalEcomenda);
                cardDiv.appendChild(StatusEcomenda);

                mainContent.appendChild(cardDiv);
            }
        }
    }
}

function promocoes() {
    //Colocar os produtos que estão em promoção
    const mainContent = document.querySelector('.main-content');

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    let contaPromocoes = 0;

    mainContent.innerHTML = '';

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        if (produto.desconto > 0) {
            const produto = produtos[i];

            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute("id", "Card" + produto.id);

            const cardImage = document.createElement('img');
            cardImage.src = produto.imagem;

            const cardTitle = document.createElement('h2');

            cardTitle.textContent = produto.titulo;

            const cardPreco = document.createElement('h3');
            cardPreco.textContent = produto.preco;

            const cardStatus = document.createElement('p');
            if (produto.stock === 0) {
                cardStatus.textContent = "Esgotado";
                cardStatus.style.color = "red";
            } else {
                cardStatus.textContent = "Disponível";
                cardStatus.style.color = "green";
            }

            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardPreco);
            card.appendChild(cardStatus);

            mainContent.appendChild(card);

            CliqueProdutos();

            contaPromocoes++;
        }
    }

    if (contaPromocoes == 0) {
        const titulo = document.createElement('h1');
        titulo.textContent = 'Não existe produtos em promoção';
        mainContent.appendChild(titulo);
    }
}