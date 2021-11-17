const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const arquivo = document.querySelector('#fileUpload');
const comprimir = document.querySelector('#comprimir');
const stats_icon = document.querySelector('#stats_icon');
const redimensionar_true = document.querySelector('#redimensionar_true');
const redimensionar_false = document.querySelector('#redimensionar_false');
const largura = document.querySelector('#largura');
const altura = document.querySelector('#altura');
const form = document.querySelector('#form');

output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

largura.disabled = true;
altura.disabled = true;

comprimir.addEventListener('click', function() {
    if (arquivo.files.length == 0) {
        if (stats_icon.className == 'fas fa-long-arrow-alt-left fa-lg') {
            alert('Insira um arquivo');
        } else {
            stats_icon.className = 'fas fa-long-arrow-alt-left fa-lg';
        }
    } else {
        if (redimensionar_true.checked) {
            if (largura.value == '') {
                alert('Insira a largura');
            } else if (altura.value == '') {
                alert('Insira a altura');
            } else {
                if (parseInt(largura.value) < 1) {
                    alert('A largura não pode ser menor que 1');
                } else if (parseInt(largura.value) > 9999) {
                    alert('A largura não pode ser maior que 9999');
                } else if (parseInt(altura.value) < 1) {
                    alert('A altura não pode ser menor que 1');
                } else if (parseInt(altura.value) > 9999) {
                    alert('A altura não pode ser maior que 9999');
                } else {
                    document.getElementById('form').submit();
                }
            } 
        } else {
            document.getElementById('form').submit();
        }
    }
})

arquivo.addEventListener('change', function() {
    if (arquivo.files.length == 0) {
        stats_icon.className = 'fas fa-exclamation-circle fa-lg';
    } else {
        stats_icon.className = 'far fa-check-circle fa-lg';
    }
})

redimensionar_false.addEventListener('change', function() {
    largura.disabled = true;
    altura.disabled = true;
    form.action = '/qualidade';
})

redimensionar_true.addEventListener('change', function() {
    largura.disabled = false;
    altura.disabled = false;
    form.action = '/qualidadedimencao';
})

