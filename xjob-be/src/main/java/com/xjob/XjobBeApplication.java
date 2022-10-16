package com.xjob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
public class XjobBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(XjobBeApplication.class, args);
	}

}
