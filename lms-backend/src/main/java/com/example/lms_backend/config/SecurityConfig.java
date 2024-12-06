package com.example.lms_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE")
//                .allowedHeaders("*") // Allow all headers
//                .allowCredentials(true);
//    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .cors().and()
//                .authorizeHttpRequests()
//                .requestMatchers("/auth/login", "/auth/register").permitAll()
//                .requestMatchers("/api/books/**").hasRole("User")
//                .anyRequest().authenticated()
//                .and()
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().and()
                .authorizeHttpRequests()
                .requestMatchers("/auth/login", "/auth/register").permitAll()
                .requestMatchers("/admin/admin-dashboard").hasRole("Admin")
                .requestMatchers("/admin/user-count").hasRole("Admin")
                .requestMatchers("/admin/overdue-books").hasRole("Admin")
                .requestMatchers("/admin/top-performing-books").hasRole("Admin")
                .requestMatchers("/admin/users/**").hasRole("Admin")
                .requestMatchers("/api/books/unique-count").hasRole("Admin")
                .requestMatchers("/api/books/count").hasRole("Admin")
                .requestMatchers("/api/books/add").hasRole("Admin")
                .requestMatchers("/api/books/update/**").hasRole("Admin")
                .requestMatchers("/api/books/delete/**").hasRole("Admin")
                .requestMatchers("/api/checked-out-books-count").hasRole("Admin")
                .requestMatchers("/api/borrowed-books-list").hasRole("Admin")
                .requestMatchers("/api/overdue-books-count").hasRole("Admin")
                .requestMatchers("/api/add-notification-record").hasRole("Admin")
                .requestMatchers("/api/add-reservation").hasRole("User")
                .requestMatchers("/api/add-borrowing-history").hasRole("User")
                .requestMatchers("/api/pay-penalty").hasRole("User")
                .requestMatchers("/api/borrow").hasRole("User")
                .requestMatchers("/api/books").hasAnyRole("Admin", "User")
                .requestMatchers("/api/books/search").hasAnyRole("Admin", "User")
                .requestMatchers("/api/books/**").hasAnyRole("Admin", "User")  
                .requestMatchers("/api/return").hasAnyRole("Admin", "User")
                .requestMatchers("/api/*/borrowing-history", "/api/{userId}/borrowing-history").hasAnyRole("Admin", "User")
                .requestMatchers("/api/*/total-borrowed-books").hasAnyRole("Admin", "User")
                .requestMatchers("/api/*/total-penalties").hasAnyRole("Admin", "User")

                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
