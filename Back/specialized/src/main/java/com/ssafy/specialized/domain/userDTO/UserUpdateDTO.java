package com.ssafy.specialized.domain.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    // 회원 정보 수정 시 입력 정보
    private String userPhone;
    private String userName;
    private String corporateRegistrationNumber;
    private String userAddress;
}