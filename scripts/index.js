const fetch = require('node-fetch');
const fs = require('fs');

// Petición HTTP, hacerse pasar por un navegador
async function getPagina(url) {
    const response = await fetch(url, {
        // Los headers son metadatos que acompañan la peticion, FA comprueba si la peticion es legitima
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
            'Referer': 'https://www.filmaffinity.com/es/main.html'
        }
    });
    return await response.text();
    // async y await pausan la funcion hasta que termina la peticion
}

function extraerTitulosDeTooltip(markup) {
    // El markup tiene formato: <div>Título 1</div><div>Título 2</div>...
    // Basicamente usa el regex para encontrar lo que hay entre <div> y </div> y lo mete al array
    const titulos = [];
    const regex = /<div>(.*?)<\/div>/g; // g indica buscar todas las ocurrencias no solo la primera
    let match;
    while ((match = regex.exec(markup)) !== null) {
        titulos.push(match[1]);
    }
    return titulos;
}

// Nucleo del scraper, 
async function init() {
    const html = await getPagina('https://www.filmaffinity.com/es/rdcat.php?id=upc_th_es');
    
    // Busca en el texto HTML una match con /var actualMonth... 
    const actualMonthJsonMatch = html.match(/var actualMonthJson\s*=\s*(\[.*?\]);/s);
    if (!actualMonthJsonMatch) {
        console.error('No se encontraron los datos en la página.');
        return;
    }
    // JSON.parse convierte el string JSON a objeto JS
    const actualMonthJson = JSON.parse(actualMonthJsonMatch[1]);
    const hoy = new Date().toISOString().split('T')[0];
    
    // Agrupar entradas por fecha
    const entradasPorFecha = {};
    for (const entrada of actualMonthJson) {
        if (entrada.date < hoy) continue;
        if (!entradasPorFecha[entrada.date]) entradasPorFecha[entrada.date] = [];
        entradasPorFecha[entrada.date].push(entrada);
    }
    
    const peliculas = [];
    
    for (const [fecha, entradas] of Object.entries(entradasPorFecha)) {
        entradas.sort((a, b) => {
            const countA = (a.markup.match(/<div>/g) || []).length;
            const countB = (b.markup.match(/<div>/g) || []).length;
            return countA - countB;
        });
        
        // Cada entrada añade UNA peli nueva, su classname tiene el movie_id de esa peli
        // y su tooltip tiene todos los títulos hasta esa peli (acumulativo, se van añadiendo de una en una)
        // El título nuevo de cada entrada va al final del div del tooltip
        for (const entrada of entradas) {
            const titulos = extraerTitulosDeTooltip(entrada.markup);
            const tituloNuevo = titulos[titulos.length - 1];
            
            // Extraemos movie_id, es decir "actual-cat_675046" -> 675046
            const movieIdMatch = entrada.classname.match(/actual-cat_(\d+)/);
            const movieId = movieIdMatch ? parseInt(movieIdMatch[1]) : null;
            
            peliculas.push({
                titulo: tituloNuevo,
                fecha_estreno: fecha,
                movie_id: movieId,
                enlace: movieId ? `https://www.filmaffinity.com/es/film${movieId}.html` : null
            });
        }
    }
    
    peliculas.sort((a, b) => a.fecha_estreno.localeCompare(b.fecha_estreno));
    
    console.log(JSON.stringify(peliculas, null, 2));
    console.log(`\nTotal películas encontradas: ${peliculas.length}`);
    
    fs.writeFileSync('peliculas.json', JSON.stringify(peliculas, null, 2));
    console.log('Datos guardados en peliculas.json');
}

init();