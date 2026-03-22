package com.example.filmaffinityapi;

import com.example.filmaffinityapi.entity.Pelicula;
import com.example.filmaffinityapi.repository.PeliculaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;

@Component
public class DataLoader implements CommandLineRunner {

    private final PeliculaRepository peliculaRepository;

    public DataLoader(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (peliculaRepository.count() > 0) {
            System.out.println("Database already populated, skipping data load.");
            return;
        }

        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("peliculas.json");
        InputStream inputStream = resource.getInputStream();
        JsonNode rootNode = mapper.readTree(inputStream);

        for (JsonNode node : rootNode) {
            Pelicula pelicula = new Pelicula(
                node.get("movie_id").asLong(),
                node.get("titulo").asText(),
                node.get("fecha_estreno").asText(),
                node.get("enlace").asText()
            );
            peliculaRepository.save(pelicula);
        }

        System.out.println("Loaded " + peliculaRepository.count() + " peliculas into the database.");
    }
}