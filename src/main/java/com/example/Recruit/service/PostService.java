package com.example.Recruit.service;

import com.example.Recruit.model.PostEntity;
import com.example.Recruit.persistence.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<PostEntity> create(final PostEntity entity){
        validate(entity);
        postRepository.save(entity);
        return postRepository.findByUserId(entity.getUserId());
    }

    public List<PostEntity> retrieveAll(){
        return postRepository.findAll();
    }

    public void validate(final PostEntity entity){
        if(entity == null){
            throw new RuntimeException("Entity cannot be null");
        }
        if(entity.getUserId()==null){
            throw new RuntimeException("Unknown user");
        }
    }
}
