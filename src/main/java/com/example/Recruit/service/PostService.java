package com.example.Recruit.service;

import com.example.Recruit.persistence.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
}
