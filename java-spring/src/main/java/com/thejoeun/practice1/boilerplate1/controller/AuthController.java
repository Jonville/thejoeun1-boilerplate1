package com.thejoeun.practice1.boilerplate1.controller;

import com.thejoeun.practice1.boilerplate1.model.dto.JwtTokenDto;
import com.thejoeun.practice1.boilerplate1.model.dto.MemberRequestDto;
import com.thejoeun.practice1.boilerplate1.model.dto.MemberResponseDto;
import com.thejoeun.practice1.boilerplate1.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // 클라이언트의 주소를 여기에 입력
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
        MemberResponseDto memberResponseDto = null;
        try {
            memberResponseDto = authService.signup(requestDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpServletResponse.SC_CONFLICT).body(requestDto.toMemberResponseDto(requestDto));
        }

        return ResponseEntity.ok(memberResponseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}
