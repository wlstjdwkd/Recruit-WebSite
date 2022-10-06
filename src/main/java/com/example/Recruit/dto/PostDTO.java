package com.example.Recruit.dto;

import com.example.Recruit.model.PostEntity;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private String id;
    private String userId;
    private String title;
    private String image;
    private String region;
    //모집 인원
    private Integer person;
    private String technic;
    //프로젝트 설명
    private String explan;

    @Builder.Default
    private Integer currentPerson = 0;

    public PostDTO(final PostEntity entity){
        this.id=entity.getId();
        this.userId=entity.getUserId();
        this.title= entity.getTitle();
        this.image=entity.getImage();
        this.region= entity.getRegion();
        this.person=entity.getPerson();
        this.technic=entity.getTechnic();
        this.explan=entity.getExplan();
        this.currentPerson=entity.getCurrentPerson();
    }

    public static PostEntity toEntity(final PostDTO dto){
        return PostEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .image(dto.getImage())
                .region(dto.getRegion())
                .person(dto.getPerson())
                .technic(dto.getTechnic())
                .explan(dto.getExplan())
                .currentPerson(dto.getCurrentPerson())
                .build();
    }
}
