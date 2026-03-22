package com.example.filmaffinityapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "peliculas")
public class Pelicula {

    @Id
    private long id;

    @NotBlank(message = "Titulo is mandatory")
    private String titulo;

    @NotBlank(message = "Fecha de estreno is mandatory")
    private String fechaEstreno;

    @NotBlank(message = "Enlace is mandatory")
    private String enlace;

    public Pelicula() {
    }

    public Pelicula(long id, String titulo, String fechaEstreno, String enlace) {
        this.id = id;
        this.titulo = titulo;
        this.fechaEstreno = fechaEstreno;
        this.enlace = enlace;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getFechaEstreno() {
        return fechaEstreno;
    }

    public void setFechaEstreno(String fechaEstreno) {
        this.fechaEstreno = fechaEstreno;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    @Override
    public String toString() {
        return "Pelicula [id=" + id + ", titulo=" + titulo + ", fechaEstreno=" + fechaEstreno + ", enlace=" + enlace + "]";
    }
}