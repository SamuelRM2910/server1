/* const express = require('express');
const path = require('path');

const app = express(); //crear una instancia de la aplicacion express

const PORT = 3000;

//configurar express para que procese los datos del formulario en formato url
app.use(express.urlencoded({ extended : true}));//middleware que permite a express entender datos enviados-

//definir la ruta para servir el archivo html
app.get('/',(req, res) => {
    //envia el archivo formulario .html al cliente
    res.sendFile(path.join(__dirname, 'formulario.html'))//
});

//define la ruta para procesar el envio del formulario
app.post('/registro', (req, res) => {
    //accede a los datos enviados en el formulario 
    const datosFormulario = req.body;
    const [nombre, edad, correo, curso ] = datosFormulario;
    console.log("datos recibidos exitosamente ", datosFormulario);
    res.send(`<h1>registro completado</h1>
            <p>nombre: ${nombre}</p>
            <p>Edad: ${Edad}</p>
            <p>email: ${email}</p>`);
    
});

app.listen(PORT, () => {
    console.log(`servidor funcionando en http://localhost:${PORT}`);
}); */

const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === 'GET') {
        fs.readFile('formulario.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error 500: Interno del Servidor");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const nombre = params.get('nombre');
            const edad = params.get('edad');
            const email = params.get('email');
            const cursos = params.get('cursos');
            
            console.log(`
            === Datos Recibidos ===
            Nombre: ${nombre}
            Edad: ${edad}
            Correo Electrónico: ${email}
            Curso: ${cursos}
            `);
    
            // Respuesta al cliente
            const respuesta = `
            ✅ ¡Formulario enviado correctamente!
            
            📋 Datos Recibidos:
            - Nombre: ${nombre}
            - Edad: ${edad}
            - Correo Electrónico: ${email}
            - Curso: ${cursos}
            `;

            console.log(`Nombre: ${nombre}`);
            console.log(`Edad: ${edad}`);
            console.log(`Correo Electrónico: ${email}`);
            console.log(`Curso: ${cursos}`);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(respuesta);  // Agregar .end para enviar la respuesta
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Error 404: Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});