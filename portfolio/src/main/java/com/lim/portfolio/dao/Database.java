package com.lim.portfolio.dao;

import com.lim.portfolio.objects.Post;
import com.lim.portfolio.repositories.PostRepository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.SQLTransientConnectionException;

public class Database {
    private static final String MARIADB_URL = "jdbc:mariadb://localhost:3306/portfolio";
    private static final String MARIADB_USERNAME = "root";
    private static final String MARIADB_PASSWORD = "limw6852";

    Connection connection = null;

    PostRepository pr = new PostRepository();

    /**
     * Create connection between spring boot and MariaDB
     *
     * @return connection
     */
    public Connection createConnection() {
        try {
            return DriverManager.getConnection(MARIADB_URL, MARIADB_USERNAME, MARIADB_PASSWORD);
        } catch (SQLException e) {
            System.out.println("Create Connection Error!");

            e.printStackTrace();
        }

        return null;
    }

    public void closeConnection(Connection connection) {
        try {
            connection.close();
        } catch (SQLException e) {
            System.out.println("Connection close failed!");
            e.printStackTrace();
        }
    }

    public void accessDB() {
        connection = createConnection();
    }

    public Post[] getPosts() throws SQLException {
        Connection connection = createConnection();

        Post[] posts = pr.getPosts(connection);
        closeConnection(connection);

        return posts;
    }
}
