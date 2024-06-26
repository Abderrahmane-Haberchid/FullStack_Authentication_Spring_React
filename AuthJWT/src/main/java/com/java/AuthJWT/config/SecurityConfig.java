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
                .addFilterBefore(new JwtFilter(provider), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth ->
                                auth.requestMatchers(HttpMethod.POST, "/api/v1/register").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/api/v1/login").permitAll()
                                        .requestMatchers(HttpMethod.DELETE, "/api/v1/book/delete/").hasAnyAuthority("ADMIN", "MASTER")
                                        .requestMatchers(HttpMethod.POST, "/api/v1/book/update/").hasAnyRole("ADMIN", "MASTER")
                                        .anyRequest().authenticated()

                )
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
