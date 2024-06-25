package com.java.AuthJWT.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtAuthenticationProvider provider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeadder = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeadder != null){
            String[] authElement = authHeadder.split(" ");
              if (authElement.length == 2 && "Bearer".equals(authElement[0])){
                  try {
                      SecurityContextHolder.getContext().setAuthentication(provider.verifyToken(authElement[1]));
                  }
                  catch (Exception e){
                      SecurityContextHolder.clearContext();
                      throw e;
                  }

              }
        }

        filterChain.doFilter(request, response);


    }
}
