package com.java.AuthJWT.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationProvider provider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(new JwtFilter(provider), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth ->
                                auth.requestMatchers("/api/v1/register").permitAll()
                                        .requestMatchers( "/api/v1/login").permitAll()
                                        .requestMatchers( "/api/v1/book/delete/**").hasAnyAuthority("ADMIN")
                                        .requestMatchers( "/api/v1/book/update/**").hasAnyAuthority("ADMIN")
                                       // .requestMatchers("/api/v1/addBookToStock").hasAnyAuthority("ADMIN")
                                        .anyRequest().authenticated()

                )
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
