$(document).ready(function() {
    const movimientos = [
        { tipo: 'compra', monto: 5000, detalle: 'Compra en línea Amazon' },
        { tipo: 'deposito', monto: 100000, detalle: 'Depósito por ventanilla' },
        { tipo: 'transferencia', monto: 75000, detalle: 'Transferencia de Juan Pérez' },
        { tipo: 'compra', monto: 12000, detalle: 'Suscripción Netflix' },
        { tipo: 'deposito', monto: 50000, detalle: 'Carga de saldo' }
    ];

    function getTipoTransaccion(tipo) {
        const tipos = {
            'compra': '🛒 Compra en línea',
            'deposito': '💰 Depósito realizado',
            'transferencia': '💸 Transferencia recibida'
        };
        return tipos[tipo] || 'Otro movimiento';
    }

    function mostrarUltimosMovimientos(filtro) {
        const $lista = $('#listaTransacciones');
        $lista.empty();

        const movimientosFiltrados = filtro === 'todos' 
            ? movimientos 
            : movimientos.filter(m => m.tipo === filtro);

        movimientosFiltrados.forEach(mov => {
            const montoFormateado = mov.monto.toLocaleString('es-CL', { 
                style: 'currency', 
                currency: 'CLP', 
                minimumFractionDigits: 0 
            });

            $lista.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn">
                    <div>
                        <strong>${getTipoTransaccion(mov.tipo)}</strong><br>
                        <small class="text-muted">${mov.detalle}</small>
                    </div>
                    <span class="badge ${mov.tipo === 'deposito' ? 'bg-success' : 'bg-primary'} rounded-pill">
                        ${montoFormateado}
                    </span>
                </li>
            `);
        });
    }

    $('#filtroTipo').on('change', function() {
        const seleccion = $(this).val();
        mostrarUltimosMovimientos(seleccion);
    });

    mostrarUltimosMovimientos('todos');
});
