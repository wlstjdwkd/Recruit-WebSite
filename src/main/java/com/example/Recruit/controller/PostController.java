package com.example.Recruit.controller;

import com.example.Recruit.dto.PostDTO;
import com.example.Recruit.dto.ResponseDTO;
import com.example.Recruit.model.PostEntity;
import com.example.Recruit.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@AuthenticationPrincipal String userId, @RequestBody PostDTO dto){
        try{
            //dto를 이용해 테이블에 저장하기 위한 entity 생성
            PostEntity entity = PostDTO.toEntity(dto);
            entity.setId(null);
            //entity userId를 임시로 지정
            entity.setUserId(userId);

            //service.create를 통해 repository에 entity 저장
            //이때 넘어오는 값이 없을 수도 있으므로 List가 아닌 Optional로 한다.
            List<PostEntity> entities = postService.create(entity);
            System.out.println("createPost + "+ entity);
            //entities를 dtos로 스트림 변환
            List<PostDTO> dtos = entities.stream().map(PostDTO::new).collect(Collectors.toList());

            ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO> builder().data(dtos).build();

            //HTTP 200
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveAll(){
        List<PostEntity> entities =postService.retrieveAll();
        System.out.println("전체 목록 조회 + "+ entities);
        List<PostDTO> dtos = entities.stream().map(PostDTO::new).collect(Collectors.toList());
        ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO>builder().data(dtos).build();

        //HTTP 200
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/postView")
    public ResponseEntity<?> retrievePost(@RequestBody PostDTO postDTO){
        System.out.println("postId = "+ postDTO);
        Optional<PostEntity> entities = postService.retrievePost(postDTO.getId());
        System.out.println("entities: "+entities);
        List<PostDTO> dtos = entities.stream().map(PostDTO::new).collect(Collectors.toList());
        System.out.println("dtos: "+dtos);
        ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    //지원 확정
    @PutMapping
    public ResponseEntity<?> updateSelect(@RequestBody PostDTO dto){
        try{
            PostEntity entity = PostDTO.toEntity(dto);
            Optional<PostEntity> entities = postService.update(entity);
            List<PostDTO> dtos = entities.stream().map(PostDTO::new).collect(Collectors.toList());
            ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);

        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<PostDTO> response = ResponseDTO.<PostDTO> builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
