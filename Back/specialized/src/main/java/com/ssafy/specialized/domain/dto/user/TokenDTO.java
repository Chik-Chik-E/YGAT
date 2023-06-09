package com.ssafy.specialized.domain.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class TokenDTO {
    // 토큰 타입, 액세스 토큰, 리프레시 토큰, 리프레시 토큰 만료 시간
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long refreshTokenExpirationTime;
}
