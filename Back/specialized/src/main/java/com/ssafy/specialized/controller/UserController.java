package com.ssafy.specialized.controller;


import com.ssafy.specialized.domain.userDTO.*;
import com.ssafy.specialized.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("spring/accounts")
public class UserController {

    @Autowired
    private final UserService userService;

    // 회원가입
    // Postman 사용 시 @RequestBody 를 제거해야 form-data 로 확인 가능
    @PostMapping
    public ResponseEntity<LoginResponseDto> join(@Validated @RequestBody UserDTO userDto, HttpServletResponse response) throws Exception {
        userService.join(userDto);
        UserLoginDTO login = new UserLoginDTO();
        login.setUserId(userDto.getUserId());
        login.setUserPassword(userDto.getUserPassword());
        LoginResponseDto loginResponseDto = userService.login(login);
        response.addHeader("Set-Cookie", loginResponseDto.getRefreshToken().toString());
        loginResponseDto.setRefreshToken(null);
        return ResponseEntity.ok(loginResponseDto);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Validated @RequestBody UserLoginDTO login, HttpServletResponse response) throws Exception {
        LoginResponseDto loginResponseDto = userService.login(login);

        response.addHeader("Set-Cookie", loginResponseDto.getRefreshToken().toString());
        loginResponseDto.setRefreshToken(null);
        return ResponseEntity.ok(loginResponseDto);
    }

    // 로그아웃
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout(@RequestBody UserLogoutDTO logout, HttpServletResponse response, HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization");
//        log.info("token: "+token);
        userService.logout(logout);
        response.addHeader("Set-Cookie", "refresh_token:max-age=0");
    }

    // 회원 탈퇴
    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void delete(@Validated @RequestBody UserLogoutDTO logout) throws Exception {
        userService.delete(logout);
    }

    // 내 정보 조회
    @GetMapping("")
    public ResponseEntity<?> getMyUserInfo(HttpServletResponse response) throws Exception {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    // 아이디로 다른 회원 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<?> getInfo(@Validated @PathVariable("userId") String userId) throws Exception {
        return ResponseEntity.ok(userService.getInfo(userId));
    }

    // 내 정보 수정
    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public void updateInfo(@Validated @RequestBody UserUpdateDTO userUpdateDto) throws Exception {
        userService.update(userUpdateDto);
    }

    // 내 비밀번호 수정
    @PutMapping("password")
    @ResponseStatus(HttpStatus.OK)
    public void updatePassword(@Validated @RequestBody UpdatePasswordDTO updatePasswordDto) throws Exception {
        userService.updatePassword(updatePasswordDto);
    }

    // 비밀번호 체크
    @PostMapping("password")
    public boolean checkPassword(@Validated @RequestBody UpdatePasswordDTO updatePasswordDTO) throws Exception {
        return userService.checkPassword(updatePasswordDTO);
    }

    // 아이디 찾기
    @PostMapping("find/id")
    public ResponseEntity<?> findMyUserId(@Validated @RequestBody FindIdDTO findIdDTO) {
        return ResponseEntity.ok(userService.findMyUserId(findIdDTO.getUserName()));
    }

    // 비밀번호 찾기
    @PostMapping("find/password")
    public ResponseEntity<?> findMyPassword(@Validated @RequestBody FindPasswordDTO findPasswordDTO) throws Exception {
        userService.findMyPassword(findPasswordDTO);
        return ResponseEntity.ok("Password Changed");
    }

    // 토큰 만료시 재발급
    @PostMapping("reissue")
    public TokenDTO reissue(@Validated @RequestBody TokenDTO tokenDTO) throws Exception {
        return userService.reissue(tokenDTO);
    }
}