document.addEventListener('DOMContentLoaded', function() {
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-pregunta');
        const answer = item.querySelector('.faq-respuesta');
        
  
        answer.style.display = 'none';
        
        question.addEventListener('click', function() {
        
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-respuesta').style.display = 'none';
                }
            });
            
        
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });

   
    const contactForm = document.querySelector('.formulario-contacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
          
            if (!nombre || !email || !asunto || !mensaje) {
                showAlert('Por favor complete todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Por favor ingrese un correo electrónico válido', 'error');
                return;
            }
            
         
            saveContactRequest({
                nombre: nombre,
                email: email,
                asunto: asunto,
                mensaje: mensaje,
                fecha: new Date().toLocaleString()
            });
            
           
            showAlert('Mensaje enviado correctamente. Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
        });
    }

    
    function saveContactRequest(request) {
        let requests = JSON.parse(localStorage.getItem('contactRequests')) || [];
        requests.push(request);
        localStorage.setItem('contactRequests', JSON.stringify(requests));
    }
    
  
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    
    function showAlert(message, type) {
        
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        
        
        alert.style.position = 'fixed';
        alert.style.bottom = '20px';
        alert.style.right = '20px';
        alert.style.padding = '15px 25px';
        alert.style.borderRadius = '5px';
        alert.style.color = 'white';
        alert.style.zIndex = '1000';
        alert.style.animation = 'fadeIn 0.3s ease-out';
        alert.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
        
        document.body.appendChild(alert);
        
        
        setTimeout(() => {
            alert.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
});

// Añadir estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);