document.addEventListener('DOMContentLoaded', function() {
    const linkTermos = document.getElementById('linkTermos');
    const modalTermos = document.getElementById('modalTermos');
    const closeModal = document.getElementById('closeModal');
    const nextBtn1 = document.getElementById('nextBtn1');
    const prevBtn2 = document.getElementById('prevBtn2');
    const nextBtn2 = document.getElementById('finalBtn2');
    const prevBtn3 = document.getElementById('prevBtn3');
    const personalDataForm = document.getElementById('personalDataForm');
    const questionnaireForm = document.getElementById('questionnaireForm');

    // URL do seu Aplicativo da Web do Google Apps Script
    const backendUrl = "https://script.google.com/macros/s/AKfycbz93Z65C3OkqGbgjT6RsnLRNScEhzJQlHcfYK3A32bZHgDGFWnH1hP_PNStQ6trJFnTYg/exec"; // **SUBSTITUA PELA SUA URL**

    if (linkTermos && modalTermos && closeModal) {
        linkTermos.addEventListener('click', function(e) {
            e.preventDefault();
            modalTermos.style.display = 'flex';
        });

        closeModal.addEventListener('click', function() {
            modalTermos.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modalTermos) {
                modalTermos.style.display = 'none';
            }
        });
    }

    function enviarDados(data) {
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Dados enviados com sucesso:', result);
            window.location.href = 'confirmacao.html';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Ocorreu um erro ao enviar os dados.');
        });
    }

    if (nextBtn1 && personalDataForm) {
        nextBtn1.addEventListener('click', function() {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const cpf = document.getElementById('cpf').value;
            const linkedin = document.getElementById('linkedin').value;
            const github = document.getElementById('github').value;
            const experiencia = document.getElementById('experiencia').value;
            const termos = document.getElementById('termos').checked;

            const dadosPessoais = { nome, email, telefone, cpf, linkedin, github, experiencia, termos };
            enviarDados(dadosPessoais); // Envia os dados ao backend
        });
    }

    if (prevBtn2) {
        prevBtn2.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    if (nextBtn2 && questionnaireForm) {
        nextBtn2.addEventListener('click', function() {
            const conhecimento_wordpress = document.getElementById('conhecimento_wordpress').value;
            const experiencia_plugins = document.getElementById('experiencia_plugins').value;
            const habilidades_front = document.getElementById('habilidades_front').value;

            const questionarioData = { conhecimento_wordpress, experiencia_plugins, habilidades_front };

            // Envia todos os dados juntos
            const todosDados = { ... (formData.dados_pessoais || {}), ...questionarioData };
            enviarDados(todosDados);

            const btn = nextBtn2;
            btn.innerHTML = '<span class="spinner"></span> PROCESSANDO...';
            setTimeout(function() {
                // A navegação para confirmacao.html agora é feita no sucesso do envio dos dados
            }, 1500);
        });
    }

    if (prevBtn3) {
        prevBtn3.addEventListener('click', function() {
            window.location.href = 'questionario.html';
        });
    }

    // Validação de CPF Fake (apenas formatação)
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) value = value.replace(/^(\d{3})/, '$1.');
            if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
            if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
            e.target.value = value.substring(0, 14);
        });
    }

    // Objeto para armazenar os dados da primeira página (para enviar tudo junto na segunda)
    const formData = {};
    if (nextBtn1 && personalDataForm) {
        nextBtn1.addEventListener('click', function() {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const cpf = document.getElementById('cpf').value;
            const linkedin = document.getElementById('linkedin').value;
            const github = document.getElementById('github').value;
            const experiencia = document.getElementById('experiencia').value;
            const termos = document.getElementById('termos').checked;

            formData['dados_pessoais'] = { nome, email, telefone, cpf, linkedin, github, experiencia, termos };
            console.log('Dados Pessoais Coletados (Frontend):', formData['dados_pessoais']);
            window.location.href = 'questionario.html';
        });
    }
});