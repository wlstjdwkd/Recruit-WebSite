package com.example.Recruit.dto;

import com.example.Recruit.model.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private Long id;
    private Long userId;
    private String title;
    private String image;
    private String region;
    //모집 인원
    private Integer person;
    private String technic;
    //프로젝트 설명
    private String explan;
    private Integer currentPersion;

    public PostDTO(final PostEntity entity){
        this.id=entity.getId();
        this.userId=entity.getUserId();
        this.title= entity.getTitle();
        this.image=entity.getImage();
        this.region= entity.getRegion();
        this.person=entity.getPerson();
        this.technic=entity.getTechnic();
        this.explan=entity.getExplan();
        this.currentPersion=entity.getCurrentPersion();
    }

    public static PostEntity toEntity(final PostDTO dto){
        return PostEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .image(dto.getImage())
                .region(dto.getRegion())
                .technic(dto.getTechnic())
                .explan(dto.getExplan())
                .currentPersion(dto.getCurrentPersion())
                .build();
    }
}
