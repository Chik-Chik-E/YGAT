package com.ssafy.specialized.domain.dto.user;

import lombok.Data;

@Data
public class UpdatePasswordDTO {
    // 비밀번호 변경시 비밀번호 확인 및 변경할 비밀번호 정보
    private final String checkPassword;
    private final String toBePassword;
}
