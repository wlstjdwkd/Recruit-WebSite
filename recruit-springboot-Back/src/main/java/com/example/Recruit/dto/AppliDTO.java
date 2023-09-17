package com.example.Recruit.dto;

import com.example.Recruit.model.AppliEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppliDTO {
    private String id;
    private String userId;

    private String username;
    private String postId;
    private String reason;
    private boolean selectPerson;

    public AppliDTO(final AppliEntity entity){
        this.id=entity.getId();
        this.userId=entity.getUserId();
        this.username=entity.getUsername();
        this.postId=entity.getPostId();
        this.reason=entity.getReason();
        this.selectPerson=entity.getSelectPerson();

    }

    public static AppliEntity toEntity(final AppliDTO dto){
        return AppliEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .username(dto.getUsername())
                .postId(dto.getPostId())
                .reason(dto.getReason())
                .selectPerson(dto.isSelectPerson()).build();
    }
}
