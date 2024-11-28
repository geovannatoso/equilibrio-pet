const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

async function listarEnderecos() {
    let token = localStorage.getItem('token');
    

    try {
        const respostaApi = await fetch(urlEndereco, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },

        });
        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao obter endereços: ${erroMessage}`);
        }

        const respostaData = await respostaApi.json();
        console.log("Dados da resposta:", respostaData); 

        // Acesse a propriedade `data` que contém os endereços
        exibirEnderecos(respostaData.data || []); 

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao carregar os endereços.");
    }
}


function exibirEnderecos(enderecos) {
    const listaEnderecos = document.getElementById('containerEnderecos');
    listaEnderecos.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    if (!Array.isArray(enderecos) || enderecos.length === 0) {
        const item = document.createElement('li');
        item.textContent = "Nenhum endereço cadastrado.";
        listaEnderecos.appendChild(item);
        return;
    }

    enderecos.forEach(endereco => {
        const item = document.createElement('li');
        //item.textContent = `${endereco.title} - ${endereco.formatted_address}`;
        item.textContent = `${endereco.title} - ${endereco.address}, ${endereco.number} - ${endereco.cep}` ;


        // Cria o botão de exclusão
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirEndereco(endereco.id); 

        // Cria o botão de alteração
        const botaoAlterar = document.createElement('button');
        botaoAlterar.textContent = 'Alterar';
        botaoAlterar.onclick = () => alterarEndereco(endereco.id); 
        
        item.appendChild(botaoExcluir);
        item.appendChild(botaoAlterar); 
        listaEnderecos.appendChild(item); 
    });
}

async function excluirEndereco(id) {
    let token = localStorage.getItem('token');

    try {
        const respostaApi = await fetch(`${urlEndereco}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao excluir endereço: ${erroMessage}`);
        }

        alert("Endereço excluído com sucesso!");
        
        listarEnderecos(); 
    } catch (error) {
        console.error("Erro na exclusão:", error);
        alert("Ocorreu um erro ao excluir o endereço.");
    }
}

async function alterarEndereco(id) {
    let token = localStorage.getItem('token');
    
    try {
        const respostaApi = await fetch(`${urlEndereco}/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao obter endereço: ${erroMessage}`);
        }

        const endereco = await respostaApi.json();
        
        localStorage.setItem('enderecoParaEditar', JSON.stringify(endereco)); 
        location.href = "../HTML/editarEnd.html";

        
    } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        alert("Ocorreu um erro ao carregar o endereço.");
    }
}

document.addEventListener('DOMContentLoaded', listarEnderecos);

async function logout() {

    const token = JSON.parse(localStorage.getItem('user')).access_token;

    const response = await fetch("https://go-wash-api.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });

    if (response.ok) {
        alert("Logout realizado com sucesso.");
        localStorage.removeItem('user');
        window.location.href = "../index.html";
    } else {
        const errorData = await response.json();
        console.error("Erro ao fazer logout:", errorData);
        alert(`Erro ao fazer logout: ${errorData.message}`);
    }
}
