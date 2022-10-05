package com.example.Recruit.controller;

import com.example.Recruit.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("post")
public class PostController {
    @Autowired
    private PostService postService;
}
