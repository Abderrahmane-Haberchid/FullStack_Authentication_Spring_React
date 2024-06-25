package com.java.AuthJWT.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.java.AuthJWT.dto.UserDto;
import com.java.AuthJWT.models.Role;
import com.java.AuthJWT.models.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
@Component
public class JwtAuthenticationProvider {

    String secretKey = "9aedd865cfd1cf31535cff2522d989c32a07835fb1ca5631ef7fd1daedbcac45effc36db32ccb0c977494a0b507aff1be114a2573ae790cc9a68a1cab41d84ff";
    Algorithm algorithm = Algorithm.HMAC256(secretKey);
    public String generateToken(UserDto userDto){


        Date now = new Date();
        Date expire = new Date(now.getTime() * 36000L);

        return JWT.create()
                .withSubject(userDto.username())
                .withIssuedAt(now)
                .withExpiresAt(expire)
                .withClaim("name:", userDto.name())
                .withClaim("role", String.valueOf(userDto.role()))
                .sign(algorithm);

    }

    public Authentication verifyToken(String token){

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decodedJWT = verifier.verify(token);

        UserDto userDto = UserDto.builder()
                .username(decodedJWT.getSubject())
                .name(decodedJWT.getClaim("name").asString())
                .role(Role.valueOf(decodedJWT.getClaim("role").asString()))
                .build();
        return new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
    }
}
