package com.example.Recruit.service;

import com.example.Recruit.model.MemberEntity;
import com.example.Recruit.model.PostEntity;
import com.example.Recruit.persistence.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public MemberEntity create(final MemberEntity memberEntity){
        System.out.println("memberEntity: "+ memberEntity);

        if(memberEntity == null || memberEntity.getUserId()==null){
            System.out.println("error1");
            throw new RuntimeException("Invalid arguments");
        }
        final String userId = memberEntity.getUserId();
        if(memberRepository.existsByUserId(userId)){
            System.out.println("error2");
            log.warn("UserId already exists {}",userId);
            throw new RuntimeException("UserId already exists");
        }
        return memberRepository.save(memberEntity);
    }


    public MemberEntity getByCredentials(final String userId, final String password){
        return memberRepository.findByUserIdAndPassword(userId, password);
    }

    public Optional<MemberEntity> retrieve(final String userId){
        return memberRepository.findById(userId);
    }

//    public void validate(final PostEntity entity){
//        if(entity==null){
//            throw new RuntimeException("Entity cannot be null");
//        }
//    }


}
