document.getElementById('formCinta').addEventListener('submit', function(event) {
    event.preventDefault();
    hitungCinta();
});

document.getElementById('clearBtn').addEventListener('click', function() {
    clearData();
});

window.onload = function() {
    if (localStorage.getItem('namaKamu')) {
        document.getElementById('namaKamu').value = localStorage.getItem('namaKamu');
    }
    if (localStorage.getItem('namaPasangan')) {
        document.getElementById('namaPasangan').value = localStorage.getItem('namaPasangan');
    }
    if (localStorage.getItem('hasilCinta')) {
        document.getElementById('hasilCinta').innerHTML = localStorage.getItem('hasilCinta');
        document.getElementById('hasilCinta').style.display = 'block';
    }
};

function hitungCinta() {
    let namaKamu = capitalize(document.getElementById("namaKamu").value.trim());
    let namaPasangan = capitalize(document.getElementById("namaPasangan").value.trim());

    if (namaKamu === "" || namaPasangan === "") {
        alert("Masukkan nama kamu dan pasangan terlebih dahulu.");
    } else {
        let gabungNama = namaKamu + namaPasangan;
        let skorCinta = hashStringKeSkor(gabungNama);

        let hasilCinta = document.getElementById("hasilCinta");

        fetch('feedback.json')
            .then(response => response.json())
            .then(data => {
                let feedbackData = data.ranges;
                let pesanHasil = getPesanCinta(skorCinta, namaKamu, namaPasangan, feedbackData);

                hasilCinta.innerHTML = pesanHasil;
                hasilCinta.style.display = 'block';

                // Simpan data ke localStorage
                localStorage.setItem('namaKamu', namaKamu);
                localStorage.setItem('namaPasangan', namaPasangan);
                localStorage.setItem('hasilCinta', pesanHasil);

                // Scroll ke hasilCinta
                hasilCinta.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => {
                console.error('Error fetching feedback data:', error);
                // Handle error fetching data
            });
    }
}

function hashStringKeSkor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    let skorCinta = Math.abs(hash) % 100 + 1;
    return skorCinta;
}

function getPesanCinta(skor, namaKamu, namaPasangan, feedbackData) {
    let resultHtml = '';
    let alertClass = '';

    if (skor >= 90) {
        resultHtml = getRandomFeedback(feedbackData["90-100"]);
        alertClass = 'alert-success';
    } else if (skor >= 70) {
        resultHtml = getRandomFeedback(feedbackData["70-89"]);
        alertClass = 'alert-primary';
    } else if (skor >= 50) {
        resultHtml = getRandomFeedback(feedbackData["50-69"]);
        alertClass = 'alert-info';
    } else if (skor >= 30) {
        resultHtml = getRandomFeedback(feedbackData["30-49"]);
        alertClass = 'alert-warning';
    } else {
        resultHtml = getRandomFeedback(feedbackData["1-29"]);
        alertClass = 'alert-danger';
    }

    return `
        <div class="alert ${alertClass}" role="alert">
            <h4 class="alert-heading">Halo, ${namaKamu} dan ${namaPasangan}! 💐</h4>
            <p>Skor cinta kalian adalah <strong>${skor}%</strong>. ${resultHtml}</p>
            <hr>
            <p class="mb-0">Love Calc.</p>
        </div>`;
}

function getRandomFeedback(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function clearData() {
    document.getElementById('namaKamu').value = '';
    document.getElementById('namaPasangan').value = '';
    document.getElementById('hasilCinta').innerHTML = '';
    document.getElementById('hasilCinta').style.display = 'none';
    
    localStorage.removeItem('namaKamu');
    localStorage.removeItem('namaPasangan');
    localStorage.removeItem('hasilCinta');
}
