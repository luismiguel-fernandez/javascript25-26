const login_form = document.getElementById('login_form');
const login_button = login_form.querySelector('button');

//login_form.addEventListener('submit', function(event) {
//    event.preventDefault()

login_button.addEventListener('click', function(event) {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Enviar datos al servidor
    fetch('server/insertar_usuario.php', {
        method: 'post',
        body: new URLSearchParams({
            email: email,
            password_plano: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Si el usuario es válido, redirigir al usuario
            window.location.href = 'ej14_news.html';
        } else {
            // Si el usuario no es válido, mostrar un mensaje de error
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        // Si hay un error, mostrar un mensaje de error
        alert('Error al intentar iniciar sesión');
    })  
})