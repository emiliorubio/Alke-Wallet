$(document).ready(function() {
    $('#btnLogout').click(function() {
        $('#liveAlertPlaceholder').html(`
            <div class="alert alert-info" role="alert">
                Cerrando sesión...
            </div>
        `);
        
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    });
});

