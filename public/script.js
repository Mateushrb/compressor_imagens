const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const arquivo = document.querySelector('#fileUpload');
const comprimir = document.querySelector('#comprimir');
const stats_icon = document.querySelector('#stats_icon');

output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

comprimir.addEventListener('click', function() {
    if (arquivo.files.length == 0) {
        if (stats_icon.className == 'fas fa-long-arrow-alt-left fa-lg') {
            alert('Insira um arquivo');
        }
        stats_icon.className = 'fas fa-long-arrow-alt-left fa-lg';
    } else {
        document.getElementById('form').submit();
    }
})

arquivo.addEventListener('change', function() {
    if (arquivo.files.length == 0) {
        stats_icon.className = 'fas fa-exclamation-circle fa-lg';
    } else {
        stats_icon.className = 'far fa-check-circle fa-lg';
    }
})
