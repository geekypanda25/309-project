package net.roll19.main;

import net.roll19.main.storage.StorageProperties;
import net.roll19.main.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

/**
 * @author kiriny
 */
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Roll19Application {
    public static void main(String[] args) {
        SpringApplication.run(Roll19Application.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            storageService.deleteAll();
            storageService.init();
        };
    }
}
