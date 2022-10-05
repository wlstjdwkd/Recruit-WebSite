package com.example.Recruit.dto;

import com.example.Recruit.model.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {
    private String token;
    private String id;
    private String email;
    private String username;
    private String userId;
    private String technic;
    private String intro;
    private String phone;
    private String password;

    public MemberDTO(final MemberEntity entity){
        this.id=entity.getId();
        this.userId=entity.getUserId();
        this.password=entity.getPassword();
        this.email=entity.getEmail();
        this.username=entity.getUsername();
        this.phone=entity.getPhone();
        this.technic=entity.getTechnic();
        this.intro=entity.getIntro();
    }

    public static MemberEntity toEntity(final MemberDTO dto){
        return MemberEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .username(dto.getUsername())
                .phone(dto.getPhone())
                .technic(dto.getTechnic())
                .intro(dto.getIntro())
                .build();
    }
}
