package com.example.filmaffinityapi.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.filmaffinityapi.entity.Pelicula;
import com.example.filmaffinityapi.repository.PeliculaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/peliculas")
public class PeliculaController {

    private final PeliculaRepository peliculaRepository;

    public PeliculaController(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    @GetMapping
    public Iterable<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }

    @GetMapping("/search")
    public List<Pelicula> searchByTitulo(@RequestParam String titulo) {
        return peliculaRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @GetMapping("/fecha")
    public List<Pelicula> searchByFecha(@RequestParam String fecha) {
        return peliculaRepository.findByFechaEstreno(fecha);
    }
}
