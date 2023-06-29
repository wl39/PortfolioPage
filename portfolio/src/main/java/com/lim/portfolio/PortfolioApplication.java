package com.lim.portfolio;

import com.lim.portfolio.dao.Database;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {

	public static void main(String[] args) {
		// specify database
		Database application = new Database();

		// check db is open
		application.accessDB();

		SpringApplication.run(PortfolioApplication.class, args);
	}

}
