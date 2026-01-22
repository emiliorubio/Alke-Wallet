$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        var username = $('#usuario').val(); 
        var password = $('#password').val();
        var $contenedor = $('#mensajeAlerta');

        if (username === 'admin' && password === '1234') {
            
            $contenedor.html(`
                <div class="alert alert-success" role="alert">
                    ¡Bienvenido! Redirigiendo a tu menú principal en 3 segundos...
                </div>
            `);

            setTimeout(function() {
                window.location.href = 'menuPrincipal.html';
            }, 3000);

        } else {
            $contenedor.html(`
                <div class="alert alert-danger" role="alert">
                    Usuario o contraseña inválido. Inténtalo de nuevo.
                </div>
            `);
        }
    });
});
