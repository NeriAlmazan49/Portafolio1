document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const quizForm = document.getElementById('quizForm');
    const resultsDiv = document.getElementById('results');
    const scoreText = document.getElementById('scoreText');
    const generatePdfBtn = document.getElementById('generatePdf');
    
    let score = 0;
    let correctAnswers = [];
    let userAnswers = [];
    
    submitBtn.addEventListener('click', function() {
        // Verificar que todas las preguntas estén respondidas
        const allAnswered = Array.from(document.querySelectorAll('input[type="radio"]:checked')).length === 10;
        
        if (!allAnswered) {
            alert('Por favor responde todas las preguntas antes de continuar.');
            return;
        }
        
        // Calcular puntuación
        score = 0;
        correctAnswers = [];
        userAnswers = [];
        
        for (let i = 1; i <= 10; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            const isCorrect = selectedOption.value === "1";
            
            userAnswers.push({
                question: document.querySelector(`.question:nth-child(${i}) h3`).textContent,
                answer: selectedOption.nextElementSibling.textContent,
                isCorrect: isCorrect
            });
            
            if (isCorrect) {
                score++;
                correctAnswers.push(i);
            }
        }
        
        // Mostrar resultados
        const percentage = (score / 10) * 100;
        let message = '';
        
        if (percentage >= 80) {
            message = `¡Excelente! Obtuviste ${score}/10 (${percentage}%). Eres un verdadero culé.`;
        } else if (percentage >= 60) {
            message = `Buen trabajo! Obtuviste ${score}/10 (${percentage}%). Sabes bastante sobre el Barça.`;
        } else if (percentage >= 40) {
            message = `Obtuviste ${score}/10 (${percentage}%). Conoces lo básico del FC Barcelona.`;
        } else {
            message = `Obtuviste ${score}/10 (${percentage}%). Deberías informarte más sobre el Barça.`;
        }
        
        scoreText.textContent = message;
        resultsDiv.classList.remove('hidden');
        
        // Generar gráfico
        generateChart();
        
        // Desplazarse a los resultados
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
    
    function generateChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        
        // Datos para el gráfico
        const labels = [];
        const data = [];
        
        for (let i = 1; i <= 10; i++) {
            labels.push(`Pregunta ${i}`);
            data.push(correctAnswers.includes(i) ? 1 : 0);
        }
        
        // Crear gráfico
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Respuestas correctas',
                    data: data,
                    backgroundColor: data.map(item => item ? '#FFD700' : '#ED1C24'),
                    borderColor: data.map(item => item ? '#FFC000' : '#C8102E'),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const question = userAnswers[index].question;
                                const answer = userAnswers[index].answer;
                                const isCorrect = userAnswers[index].isCorrect;
                                
                                return [
                                    question,
                                    `Tu respuesta: ${answer}`,
                                    isCorrect ? '✅ Correcto' : '❌ Incorrecto'
                                ];
                            }
                        }
                    }
                }
            }
        });
    }
    
    generatePdfBtn.addEventListener('click', function() {
        // Usar jsPDF para generar el PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(20);
        doc.setTextColor(0, 77, 152); // Azul Barça
        doc.text('Resultados del Quiz: FC Barcelona', 105, 20, { align: 'center' });
        
        // Puntuación
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(scoreText.textContent, 105, 35, { align: 'center' });
        
        // Tabla de respuestas
        doc.autoTable({
            startY: 45,
            head: [['Pregunta', 'Tu respuesta', 'Correcta']],
            body: userAnswers.map(item => [
                item.question.replace(/^\d+\.\s/, ''), // Eliminar número de pregunta
                item.answer,
                item.isCorrect ? 'Sí' : 'No'
            ]),
            headStyles: {
                fillColor: [165, 0, 68], // Rojo Barça
                textColor: 255
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 60 },
                2: { cellWidth: 30 }
            },
            margin: { horizontal: 10 }
        });
        
        // Gráfico (como imagen)
        const chartCanvas = document.getElementById('resultsChart');
        const chartImage = chartCanvas.toDataURL('image/png');
        
        doc.addImage(chartImage, 'PNG', 30, doc.autoTable.previous.finalY + 20, 150, 80);
        
        // Pie de página
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Generado el ' + new Date().toLocaleDateString(), 105, 285, { align: 'center' });
        
        // Guardar PDF
        doc.save('resultados_quiz_barcelona.pdf');
    });
});