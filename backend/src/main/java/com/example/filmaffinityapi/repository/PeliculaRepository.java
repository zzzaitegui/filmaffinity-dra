package com.example.filmaffinityapi.repository;

import java.util.List;
import com.example.filmaffinityapi.entity.Pelicula;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PeliculaRepository extends CrudRepository<Pelicula, Long> {

    List<Pelicula> findByTituloContainingIgnoreCase(String titulo);

    List<Pelicula> findByFechaEstreno(String fechaEstreno);
}