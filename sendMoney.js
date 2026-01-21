$(document).ready(function() {
    let contactos = [
        { nombre: "John Doe", rut: "12345678-9", alias: "john.doe", banco: "Banco Estado" },
        { nombre: "Jane Smith", rut: "98765432-1", alias: "jane.s", banco: "Santander" },
        { nombre: "Carolina A", rut: "987654321-0", alias: "Caro", banco: "Banco De Chile" },
    ];

    let saldo = parseFloat(localStorage.getItem('userBalance')) || 60000;
    $('#balanceDisplay').text(saldo.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }));
    $('#btnShowAddContact').click(() => $('#containerNuevoContacto').slideDown());
    $('#btnCancelAdd').click(() => $('#containerNuevoContacto').slideUp());
    $('#formNuevoContacto').submit(function(e) {
        e.preventDefault();
        const nuevo = {
            nombre: $('#nombreC').val(),
            rut: $('#rutC').val(),
            alias: $('#aliasC').val(),
            banco: $('#bancoC').val()
        };

        if (nuevo.rut.length < 8) {
            alert("RUT inválido");
            return;
        }

        contactos.push(nuevo);
        renderizarContactos(contactos);
        this.reset();
        $('#containerNuevoContacto').slideUp();
    });

    function renderizarContactos(lista) {
        $('#contactList').empty();
        lista.forEach((c, index) => {
            $('#contactList').append(`
                <li class="list-group-item list-group-item-action contact-item" data-index="${index}" style="cursor:pointer">
                    <strong>${c.nombre}</strong> | <small>Alias: ${c.alias} - ${c.banco}</small>
                </li>
            `);
        });
    }

    $('#searchContact').on('keyup', function() {
        let busqueda = $(this).val().toLowerCase();
        let filtrados = contactos.filter(c => 
            c.nombre.toLowerCase().includes(busqueda) || 
            c.alias.toLowerCase().includes(busqueda)
        );
        renderizarContactos(filtrados);
    });

    $(document).on('click', '.contact-item', function() {
        $('.contact-item').removeClass('active bg-primary text-white');
        $(this).addClass('active bg-primary text-white');
        
        let idx = $(this).data('index');
        $('#selectedContactName').text(contactos[idx].nombre);
        $('#containerEnvio').fadeIn();
    });

    $('#btnRealizarEnvio').click(function() {
        let monto = parseFloat($('#montoEnvio').val());
        
        if (monto > saldo || monto <= 0) {
            alert("Saldo insuficiente o monto inválido");
            return;
        }

        saldo -= monto;
        localStorage.setItem('userBalance', saldo);
        
        $('#confirmacionEnvio').html(`
            <div class="alert alert-success mt-3">
                ✅ Envío realizado con éxito a ${$('#selectedContactName').text()}.
            </div>
        `);

        setTimeout(() => window.location.href = 'menuPrincipal.html', 2500);
    });

    renderizarContactos(contactos);
});
