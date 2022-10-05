package com.example.Recruit.service;

import com.example.Recruit.model.MemberEntity;
import com.example.Recruit.persistence.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public MemberEntity create(final MemberEntity memberEntity){
        if(memberEntity == null || memberEntity.getUserId()==null){
            throw new RuntimeException("Invalid arguments");
        }
        final String userId = memberEntity.getUserId();
        if(memberRepository.existsByUserId(userId)){
            log.warn("UserId already exists {}",userId);
            throw new RuntimeException("UserId already exists");
        }
        return memberRepository.save(memberEntity);
    }

}
