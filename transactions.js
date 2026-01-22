$(document).ready(function() {
    const movimientosGuardados = JSON.parse(localStorage.getItem('misMovimientos')) || [];

    const ejemplos = [
        { tipo: 'compra', monto: 5000, detalle: 'Compra en línea Amazon' },
        { tipo: 'deposito', monto: 100000, detalle: 'Depósito por ventanilla' },
        { tipo: 'transferencia', monto: 75000, detalle: 'Transferencia de Juan Pérez' }
    ];

    const todosLosMovimientos = [...movimientosGuardados, ...ejemplos];

    function getTipoTransaccion(tipo) {
        const tipos = {
            'compra': '🛒 Compra en línea',
            'deposito': '💰 Depósito realizado',
            'transferencia': '💸 Transferencia realizada/recibida'
        };
        return tipos[tipo] || 'Otro movimiento';
    }

    function mostrarUltimosMovimientos(filtro) {
        const $lista = $('#listaTransacciones');
        $lista.empty();

        const movimientosFiltrados = filtro === 'todos' 
            ? todosLosMovimientos 
            : todosLosMovimientos.filter(m => m.tipo === filtro);

        if (movimientosFiltrados.length === 0) {
            $lista.append(`<li class="list-group-item text-center">No hay movimientos registrados.</li>`);    
            return;
        }
        
        movimientosFiltrados.forEach(mov => {
            const montoFormateado = mov.monto.toLocaleString('es-CL', { 
                style: 'currency', 
                currency: 'CLP', 
                minimumFractionDigits: 0 
            });

            $lista.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
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
        mostrarUltimosMovimientos($(this).val());
    });

    mostrarUltimosMovimientos('todos');
});
