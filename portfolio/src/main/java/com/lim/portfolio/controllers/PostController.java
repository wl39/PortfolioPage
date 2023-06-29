package com.lim.portfolio.controllers;

import com.lim.portfolio.dao.Database;
import com.lim.portfolio.objects.Post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
public class PostController {
    Database database = new Database();

    @RequestMapping(value="/api/v1/posts/get", method = RequestMethod.GET)
    public ResponseEntity<Object> getPosts(@RequestParam Map<String, String> params) {
        Post[] courts;
        try {
            courts = database.getPosts();
            return new ResponseEntity<>(courts, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("SQL syntax error", HttpStatus.BAD_REQUEST);
        }
    }
}
