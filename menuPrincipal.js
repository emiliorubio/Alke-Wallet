$(document).ready(function() {
    function cargarSaldo() {
        let saldo = parseFloat(localStorage.getItem('userBalance'));
        
        if (isNaN(saldo)) {
            saldo = 60000;
            localStorage.setItem('userBalance', saldo);
        }

        let saldoFormateado = saldo.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        });
        $('#balanceAmount').text(saldoFormateado);
    }

    cargarSaldo();
    function navegarConMensaje(destino, nombrePantalla) {
        $('#liveAlertPlaceholder').html(`
            <div class="alert alert-primary d-flex align-items-center" role="alert">
                <div class="spinner-border spinner-border-sm me-3" role="status"></div>
                <div>Redirigiendo a ${nombrePantalla}...</div>
            </div>
        `);

        setTimeout(function() {
            window.location.href = destino;
        }, 1500);
    }

    $('a[href="deposit.html"]').click(function(e) {
        e.preventDefault();
        navegarConMensaje('deposit.html', 'Depositar');
    });

    $('a[href="sendmoney.html"]').click(function(e) {
        e.preventDefault();
        navegarConMensaje('sendmoney.html', 'Enviar Dinero');
    });

    $('a[href="transactions.html"]').click(function(e) {
        e.preventDefault();
        navegarConMensaje('transactions.html', 'Últimos Movimientos');
    });
});
