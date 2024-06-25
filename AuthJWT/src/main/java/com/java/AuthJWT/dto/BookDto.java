package com.java.AuthJWT.dto;

import lombok.Builder;

import java.util.Date;

@Builder
public record BookDto(String name, Date datePublication, String author, double price) {
}
