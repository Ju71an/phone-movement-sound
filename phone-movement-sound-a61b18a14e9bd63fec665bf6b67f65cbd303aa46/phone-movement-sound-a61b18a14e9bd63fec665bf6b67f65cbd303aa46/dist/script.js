"use strict";
// Crear un contexto de audio
const audioContext = new Tone.Context();
// Crear un oscilador
const oscillator = new Tone.Oscillator().toDestination();
// Crear un objeto que capture los datos del acelerómetro
const accelerometer = new Tone.Motion().start();
// Conectar los datos del acelerómetro al oscilador para cambiar la frecuencia y el volumen
accelerometer.connect((value) => {
    oscillator.frequency.value = value.x * 20;
    oscillator.volume.value = value.y * 2;
});
// Iniciar el oscilador
oscillator.start();
// Dibujar la representación visual del movimiento del teléfono
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
ctx.translate(width / 2, height / 2);
function draw(value) {
    ctx.clearRect(-width / 2, -height / 2, width, height);
    const x = value.x * (width / 2);
    const y = value.y * (height / 2);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    requestAnimationFrame(() => {
        draw(accelerometer.value);
    });
}
draw(accelerometer.value);