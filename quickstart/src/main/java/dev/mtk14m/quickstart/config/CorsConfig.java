package dev.mtk14m.quickstart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")  // Adresse de ton frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Méthodes HTTP autorisées
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}

