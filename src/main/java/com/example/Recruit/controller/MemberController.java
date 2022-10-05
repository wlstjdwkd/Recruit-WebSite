package com.example.Recruit.controller;

import com.example.Recruit.dto.MemberDTO;
import com.example.Recruit.dto.ResponseDTO;
import com.example.Recruit.model.MemberEntity;
import com.example.Recruit.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO){
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
}
