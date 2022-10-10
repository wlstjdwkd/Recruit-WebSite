package com.example.Recruit.controller;

import com.example.Recruit.dto.MemberDTO;
import com.example.Recruit.dto.ResponseDTO;
import com.example.Recruit.model.MemberEntity;
import com.example.Recruit.security.TokenProvider;
import com.example.Recruit.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO){
        System.out.println("back signup "+memberDTO);
        try{
            MemberEntity member = MemberEntity.builder()
                    .userId(memberDTO.getUserId())
                    .email(memberDTO.getEmail())
                    .username(memberDTO.getUsername())
                    .password(memberDTO.getPassword())
                    .phone(memberDTO.getPhone())
                    .intro(memberDTO.getIntro())
                    .technic(memberDTO.getTechnic())
                    .build();

            MemberEntity registeredMember = memberService.create(member);
            MemberDTO responseMemberDTO = memberDTO.builder()
                    .userId(registeredMember.getUserId())
                    .id(registeredMember.getId())
                    .email(registeredMember.getEmail())
                    .username(registeredMember.getUsername())
                    .phone(registeredMember.getPhone())
                    .intro(registeredMember.getIntro())
                    .technic(registeredMember.getTechnic())
                    .build();
            return ResponseEntity.ok().body(responseMemberDTO);
        }catch (Exception e){
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDTO memberDTO){
        MemberEntity member = memberService.getByCredentials(memberDTO.getUserId(), memberDTO.getPassword());
        if(member!=null){
            final String token = tokenProvider.create(member);
            final MemberDTO responseMemberDTO = MemberDTO.builder()
                    .userId(member.getUserId())
                    .id(member.getId())
                    .username(member.getUsername())
                    .token(token)
                    .build();
            return ResponseEntity.ok().body(responseMemberDTO);
        } else{
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("Login failed")
                    .build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //내정보 조회
    @GetMapping
    public ResponseEntity<?> retrieveMember(@AuthenticationPrincipal String userId){
        Optional<MemberEntity> entities = memberService.retrieve(userId);
        List<MemberDTO> dtos = entities.stream().map(MemberDTO::new).collect(Collectors.toList());
        ResponseDTO<MemberDTO> response = ResponseDTO.<MemberDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }
}
