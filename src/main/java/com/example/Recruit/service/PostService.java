package com.example.Recruit.service;

import com.example.Recruit.model.PostEntity;
import com.example.Recruit.persistence.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<PostEntity> create(final PostEntity entity) throws Exception{

        validate(entity);

        postRepository.save(entity);
        return postRepository.findByUserId(entity.getUserId());
    }

    public List<PostEntity> retrieveAll(){
        return postRepository.findAll();
    }

    public Optional<PostEntity> retrievePost(final String id){
        return postRepository.findById(id);
    }

    public List<PostEntity> retrieveSelect(final String id){
        return postRepository.findByUserId(id);
    }

    public Optional<PostEntity> update (final PostEntity entity){
        if(postRepository.existsById(entity.getId())){
            postRepository.save(entity);
        }
        else{
            throw new RuntimeException("Unknown id");
        }
        return postRepository.findById(entity.getId());
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
