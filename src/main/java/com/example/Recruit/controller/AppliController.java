package com.example.Recruit.controller;

import com.example.Recruit.dto.AppliDTO;
import com.example.Recruit.dto.PostDTO;
import com.example.Recruit.dto.ResponseDTO;
import com.example.Recruit.model.AppliEntity;
import com.example.Recruit.service.AppliService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("appli")
public class AppliController {
    @Autowired
    private AppliService appliService;

    @PostMapping
    public ResponseEntity<?> createAppli(@AuthenticationPrincipal String userId, @RequestBody AppliDTO dto){
        try{
            AppliEntity entity = AppliDTO.toEntity(dto);
            entity.setId(null);
            entity.setUserId(userId);

            List<AppliEntity> entities = appliService.create(entity);
            List<AppliDTO> dtos = entities.stream().map(AppliDTO::new).collect(Collectors.toList());

            ResponseDTO<AppliDTO> response = ResponseDTO.<AppliDTO> builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<AppliDTO> response = ResponseDTO.<AppliDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
