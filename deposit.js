$(document).ready(function() {
    const formatoCLP = (valor) => {
        return valor.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        });
    };

    function actualizarSaldoPantalla() {
        let saldoActual = parseFloat(localStorage.getItem('userBalance')) || 0;
        $('#currentBalanceDisplay').text(`Saldo actual: ${formatoCLP(saldoActual)}`);
    }

    actualizarSaldoPantalla();

    $('form').submit(function(event) {
        event.preventDefault();

        let monto = parseFloat($('#depositAmount').val());

        if (isNaN(monto) || monto <= 0) {
            $('#liveAlertPlaceholder').html(`
                <div class="alert alert-danger" role="alert">Ingrese un monto válido.</div>
            `);
            return;
        }

        let saldoPrevio = parseFloat(localStorage.getItem('userBalance')) || 0;
        let nuevoSaldo = saldoPrevio + monto;
        localStorage.setItem('userBalance', nuevoSaldo);

        const nuevoMovimiento = {
            tipo: 'deposito',
            monto: monto,
            detalle: 'Depósito de efectivo realizado',
            fecha: new Date().toISOString()
        };

        let historial = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
        historial.unshift(nuevoMovimiento);
        localStorage.setItem('transactionHistory', JSON.stringify(historial));

        if ($('#leyendaMonto').length === 0) {
            $('form').after('<div id="leyendaMonto" class="mt-3 h5 text-success"></div>');
        }
        $('#leyendaMonto').text(`Has depositado: ${formatoCLP(monto)}`);
        $('#liveAlertPlaceholder').html(`
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <div class="spinner-border spinner-border-sm me-3" role="status"></div>
                <div>¡Éxito! Redirigiendo al menú principal...</div>
            </div>
        `);
        setTimeout(function() {
            window.location.href = 'menuPrincipal.html';
        }, 2000);
    });
});
