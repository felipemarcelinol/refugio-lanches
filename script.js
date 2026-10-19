
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    let produtoEncontrado = carrinho.find(function(produto) {
        return produto.nome === nome;
    });

    if (produtoEncontrado) {
        produtoEncontrado.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let total = document.getElementById("valor-total");

    lista.innerHTML = "";

    let valorTotal = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Seu carrinho está vazio.</li>";
    }

    carrinho.forEach(function(produto, indice) {
        let item = document.createElement("li");

        let nome = document.createElement("span");
        nome.textContent = produto.nome + " x" + produto.quantidade;

        let preco = document.createElement("span");
        preco.textContent = (produto.preco * produto.quantidade)
            .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        let remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.className = "remover";

        remover.onclick = function() {
            removerProduto(indice);
        };

        let informacoes = document.createElement("div");
        informacoes.appendChild(preco);
        informacoes.appendChild(remover);

        item.appendChild(nome);
        item.appendChild(informacoes);

        lista.appendChild(item);

        valorTotal += produto.preco * produto.quantidade;
    });

    total.textContent = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function removerProduto(indice) {
    if (carrinho[indice].quantidade > 1) {
        carrinho[indice].quantidade--;
    } else {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}


atualizarCarrinho();