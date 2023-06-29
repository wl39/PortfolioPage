package com.lim.portfolio.objects;


import java.time.LocalDate;

public class Post {
    private Integer id;
    private String title;
    private String author;
    private LocalDate generatedDate;
    private LocalDate lastModifiedDate;
    private String descriptions;

    public Post() {
    }

    public Post(Integer id, String title, String author, String descriptions) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.descriptions = descriptions;
    }

    public Post(Integer id, String title, String author, LocalDate generatedDate, LocalDate lastModifiedDate, String descriptions) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.generatedDate = generatedDate;
        this.lastModifiedDate = lastModifiedDate;
        this.descriptions = descriptions;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getGeneratedDate() {
        return generatedDate;
    }

    public void setGeneratedDate(LocalDate generatedDate) {
        this.generatedDate = generatedDate;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }
}
