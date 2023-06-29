package com.lim.portfolio.repositories;

import com.lim.portfolio.objects.Post;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class PostRepository {
    public Post[] getPosts(Connection connection) throws SQLException {
        Statement statement = connection.createStatement();
        List<Post> posts = new ArrayList<>();

        ResultSet rs = statement.executeQuery("SELECT * FROM post");

        while(rs.next()) {
            posts.add(new Post(rs.getInt("ID"), rs.getString("Title"), rs.getString("Author"), rs.getString("Description")));
        }

        statement.close();

        return posts.toArray(new Post[0]);
    }
}
